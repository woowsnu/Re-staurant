package com.restaurant.app.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
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
        System.out.println("JwtAuthorizationFilter.");

        String jwtHeader = request.getHeader("Authorization");
        System.out.println("jwtHeader : " + jwtHeader);

        if(jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
            chain.doFilter(request,response);
            return;
        }

        String jwtToken = request.getHeader("Authorization").replace("Bearer ","");

        try{
        String userEmail = JWT.require(Algorithm.HMAC512("gun_secret")).build().verify(jwtToken).getClaim("email").asString();
        System.out.println(userEmail);

        if (userEmail!=null) {

                User userEntity = userRepository.findUserByEmail(userEmail);

                PrincipalDetails principalDetails = new PrincipalDetails(userEntity);

                Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails.getUser(),null,principalDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
                chain.doFilter(request,response);
            }

        } catch (Exception e) {
            logger.error(e.getMessage());
            chain.doFilter(request,response);
        }
        }
}
