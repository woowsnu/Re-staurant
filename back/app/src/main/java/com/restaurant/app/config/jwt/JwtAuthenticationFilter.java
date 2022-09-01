package com.restaurant.app.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.config.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
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

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException{
        System.out.println("JwtAuthenticationFilter");

        try {
            ObjectMapper om = new ObjectMapper();
            UserDTO userDTO = om.readValue(request.getInputStream(), UserDTO.class);
            System.out.println(userDTO.toString());

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userDTO.getEmail(),userDTO.getPassword());

            Authentication authentication =
                    authenticationManager.authenticate(authenticationToken);

            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            System.out.println("로그인 완료: " + principalDetails.getUser());

            return authentication;


        }
        catch (IOException failed) {
            
        }
        catch(NullPointerException e) {
            System.out.println("Email or password is invalid");
        }
        System.out.println("로그인 실패");
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain
                        , Authentication authResult) throws IOException, ServletException {
        System.out.println("SuccessfulAuthentication");

        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        String jwtToken = JWT.create()
                .withSubject(principalDetails.getUser().getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + (60000 * 10)))
                .withClaim("userIndex",principalDetails.getUser().getUserIndex())
                .withClaim("email",principalDetails.getUser().getEmail())
                .sign(Algorithm.HMAC512("gun_secret"));

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"jwtToken\"" +":" + "\"Bearer " + jwtToken + "\"" +"}");

    }

//    @Override
//    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed)
//            throws IOException, ServletException {
////        log.error("un")/
////
//        if (logger.isDebugEnabled()) {
//            logger.debug("Authentication request failed: " + failed.toString(), failed);
//            logger.debug("Updated SecurityContextHolder to contain null Authentication");
////            logger.debug("Delegating to authentication failure handler" + failureHadnler);
//        }
//    }
}
