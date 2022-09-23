package com.restaurant.app.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.restaurant.app.config.auth.PrincipalDetails;
<<<<<<< HEAD
import com.restaurant.app.model.User;
=======
import com.restaurant.app.repository.UserRepository;
>>>>>>> b48e3904361b2f450f0a8d0191fec223963c7e33
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

    private final UserRepository userRepository;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("JwtAuthenticationFilter");

        try {
            ObjectMapper om = new ObjectMapper();
            User user = om.readValue(request.getInputStream(), User.class);
            System.out.println(user.toString());

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword());

            Authentication authentication =
                    authenticationManager.authenticate(authenticationToken);

            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

            System.out.println("로그인 완료: " + principalDetails.getUser());

            return authentication;

        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("로그인 실패");
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain
                        , Authentication authResult) throws IOException, ServletException {
        System.out.println("SuccessfulAuthentication");

        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

<<<<<<< HEAD
        String jwtToken = JWT.create()
                .withSubject(principalDetails.getUser().getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + (60000*10)))
                .withClaim("id",principalDetails.getUser().getEmail())
                .withClaim("username",principalDetails.getUser().getUsername())
                .sign(Algorithm.HMAC512("gun_secret"));

        response.setHeader("Authorization","Bearer "+jwtToken);

    }
=======
        String accessToken = JWT.create()
                .withSubject(principalDetails.getUser().getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + (60000 * 1)))
                .withClaim("userIndex",principalDetails.getUser().getUserIndex())
                .withClaim("email",principalDetails.getUser().getEmail())
                .sign(Algorithm.HMAC512("gun_secret"));

        String refreshToken = JWT.create()
                .withSubject(principalDetails.getUser().getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + (60000 * 300)))
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
>>>>>>> b48e3904361b2f450f0a8d0191fec223963c7e33
}
