package net.mnowicki.familia.config;

import lombok.RequiredArgsConstructor;
import net.mnowicki.familia.authentication.AuthController;
import net.mnowicki.familia.authentication.UserRole;
import net.mnowicki.familia.authentication.UserService;
import net.mnowicki.familia.config.jwt.JwtAuthFilter;
import net.mnowicki.familia.config.jwt.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.access.AccessDeniedHandler;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtConfig jwtConfig;

    private static final String[] AUTH_WHITELIST = {
            "/auth/signin",
            "/swagger-resources/**",
            "/swagger-ui/**",
            "/swagger.html",
            "/v3/api-docs/**"
    };

    private static final String REFRESH_ACCESS_TOKEN_URL = AuthController.REQUEST_MAPPING + "/refresh";

    @Bean
    public AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userService).passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests()
                .requestMatchers(AUTH_WHITELIST).permitAll()
                .requestMatchers(HttpMethod.POST, REFRESH_ACCESS_TOKEN_URL).hasAnyAuthority(UserRole.USER.getAuthority(), UserRole.ADMIN.getAuthority())
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new JwtAuthFilter(jwtTokenProvider, jwtConfig), UsernamePasswordAuthenticationFilter.class)
                .cors();

        return http.build();
    }

}
