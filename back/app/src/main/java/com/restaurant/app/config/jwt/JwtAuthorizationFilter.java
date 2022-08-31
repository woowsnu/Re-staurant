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

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private UserRepository userRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager,UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
//        System.out.println("인증이 필요함.");

        String jwtHeader = request.getHeader("Authorization");
        System.out.println("jwtHeader : " + jwtHeader);

        if(jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
            chain.doFilter(request,response);
            return;
        }

        String jwtToken = request.getHeader("Authorization").replace("Bearer ","");
        try{
        String username = JWT.require(Algorithm.HMAC512("gun_secret")).build().verify(jwtToken).getClaim("username").asString();
        System.out.println(username);

        if (username!=null) {

                User userEntity = userRepository.findByUsername(username);

                PrincipalDetails principalDetails = new PrincipalDetails(userEntity);

                Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails,null,principalDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
                chain.doFilter(request,response);
            }
        }
        catch (TokenExpiredException e) {
            logger.error(e.getMessage());

            chain.doFilter(request,response);
        }


    }
}
