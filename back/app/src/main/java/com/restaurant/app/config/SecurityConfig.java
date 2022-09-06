package com.restaurant.app.config;

import com.restaurant.app.config.jwt.JwtAuthenticationFilter;
import com.restaurant.app.config.jwt.JwtAuthorizationFilter;
import com.restaurant.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserRepository userRepository;
    @Autowired
    private CorsConfig corsConfig;

    @Bean
    BCryptPasswordEncoder passwordEncoder() {return new BCryptPasswordEncoder();}

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();

        http.addFilter(corsConfig.corsFilter())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin()
                .usernameParameter("email").disable()
                .httpBasic().disable()
                .addFilter(new JwtAuthenticationFilter(authenticationManager())) // JwtFilter를 직접 등록해줌.
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository)) // JwtFilter를 직접 등록해줌.
                .authorizeRequests()
                .antMatchers("/auth/**").authenticated()
                .antMatchers("/review/{\\d+}/auth/**").authenticated()
                .antMatchers("/user/auth/**").authenticated()
                .antMatchers("/follow/auth/**").authenticated()
                .antMatchers("/restaurant/admin/**").access("hasRole('ROLE_ADMIN')")
                .anyRequest().permitAll();

    }
}
