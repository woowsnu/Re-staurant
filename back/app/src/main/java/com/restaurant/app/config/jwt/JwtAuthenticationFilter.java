package com.restaurant.app.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.config.auth.PrincipalDetails;
import com.restaurant.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException{
        System.out.println("JwtAuthenticationFilter");

        try {
            ObjectMapper om = new ObjectMapper();
            UserDTO userDTO = om.readValue(request.getInputStream(), UserDTO.class);
//            System.out.println(userDTO.toString());

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userDTO.getEmail(),userDTO.getPassword());

            Authentication authentication =
                    authenticationManager.authenticate(authenticationToken);

            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            System.out.println("로그인 완료: " + principalDetails.getUser());

            return authentication;


        }
        catch (IOException e) {
            e.printStackTrace();
            System.out.println("로그인 실패");
        }
        catch (UsernameNotFoundException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain
                        , Authentication authResult) throws IOException, ServletException {
        System.out.println("SuccessfulAuthentication -> login_authorized");

        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        String accessToken = JWT.create()
                .withSubject(principalDetails.getUser().getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + (60000 * 400)))
                .withClaim("userIndex",principalDetails.getUser().getUserIndex())
                .withClaim("email",principalDetails.getUser().getEmail())
                .sign(Algorithm.HMAC512("gun_secret"));

        String refreshToken = JWT.create()
                .withSubject(principalDetails.getUser().getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + (60000 * 500)))
                .withClaim("userIndex",principalDetails.getUser().getUserIndex())
                .withClaim("email",principalDetails.getUser().getEmail())
                .sign(Algorithm.HMAC512("gun_secret"));

        principalDetails.getUser().setAccessToken(accessToken);
        principalDetails.getUser().setRefreshToken(refreshToken);

        userRepository.save(principalDetails.getUser());

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"jwtToken\"" + ":" + "\"Bearer " + accessToken + "\"" +"}");


    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {
        System.out.println("unsuccessfullAuthentication -> login_unauthorized");

        logger.debug("failed authentication while attempting to access");

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                "로그인에 실패했습니다.");
    }
}
