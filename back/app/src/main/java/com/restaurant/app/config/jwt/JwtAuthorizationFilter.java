package com.restaurant.app.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.restaurant.app.config.auth.PrincipalDetails;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private UserRepository userRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager,UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String accessHeader = request.getHeader("Authorization");
//        System.out.println("jwtHeader : " + jwtHeader);

        if(accessHeader == null || !accessHeader.startsWith("Bearer")) {
            chain.doFilter(request,response);
            return;
        }

        String accessToken = request.getHeader("Authorization").replace("Bearer ","");

        try{

        String userEmail = JWT.require(Algorithm.HMAC512("gun_secret")).build().verify(accessToken).getClaim("email").asString();
        System.out.println(userEmail);

        if (userEmail!=null) {

                User userEntity = userRepository.findUserByEmail(userEmail);

                PrincipalDetails principalDetails = new PrincipalDetails(userEntity);

                Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails.getUser(),null,principalDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
                chain.doFilter(request,response);
            }

        }
        catch(TokenExpiredException e) {

            User userEntity = userRepository.findUserByAccessToken(accessToken);
            System.out.println(userEntity);


            try {
                // 만료된 accesToken이 이전에 발급해서 DB에 저장한 accessToken과 일치하는지 확인.
                // 일치하고, refreshToken이 만료 안됐으면 accessToken 재발급.
//                if (userEntity.getAccessToken() != accessToken) {
//                    throw new Exception();
//                }

                String userEmail = JWT.require(Algorithm.HMAC512("gun_secret")).build().verify(userEntity.getRefreshToken()).getClaim("email").asString();

                System.out.println("refreshed :" + userEmail);

                String refreshedAccessToken = JWT.create()
                        .withSubject(userEntity.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + (60000 * 1)))
                        .withClaim("userIndex", userEntity.getUserIndex())
                        .withClaim("email", userEntity.getEmail())
                        .sign(Algorithm.HMAC512("gun_secret"));

                userEntity.setAccessToken(refreshedAccessToken);

                // refreshedAccessToken 저장
                userRepository.save(userEntity);

                // refreshedAccessToken 반환
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Bearer " + refreshedAccessToken);
            } catch (TokenExpiredException re) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "refresh/accessToken이 모두 만료되었습니다. 재 로그인해주세요.");
            } catch (Exception ex) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "invalid Token");}

        }
        catch (Exception e) {
            logger.error(e.getMessage());
            chain.doFilter(request,response);
        }
        }
}
