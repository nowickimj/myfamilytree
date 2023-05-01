package net.mnowicki.familia.config.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.mnowicki.familia.authentication.UserRole;
import net.mnowicki.familia.config.JwtConfig;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final JwtConfig jwtConfig;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (authorizationHeader == null) {
                filterChain.doFilter(request, response);
                return;
            }

            String token = authorizationHeader.replace(jwtConfig.getTokenPrefix(), "");
            JwtTokenInfo tokenInfo = jwtTokenProvider.parseToken(token);
            Authentication authentication = new UsernamePasswordAuthenticationToken(tokenInfo.email(), tokenInfo.email(), tokenInfo.roles());
            SecurityContextHolder.getContext().setAuthentication(authentication);


        } catch (ExpiredJwtException e) {
            String requestedUri = request.getRequestURI();
            if ("/api/auth/refresh".equals(requestedUri)) {
                Claims claims = e.getClaims();
                String email = claims.getSubject();
                List<?> roleList = claims.get("roles", List.class);
                Set<UserRole> roles = roleList
                        .stream()
                        .map(String.class::cast)
                        .map(UserRole::valueOf)
                        .collect(Collectors.toSet());
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, email, roles);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            log.error("Error occurred while parsing token or authenticating", e);
        }

        filterChain.doFilter(request, response);
    }

}
