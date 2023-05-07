package net.mnowicki.familia.authentication;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.mnowicki.familia.authentication.dto.SignInRequestDto;
import net.mnowicki.familia.authentication.dto.SignInResponseDto;
import net.mnowicki.familia.config.jwt.JwtTokenProvider;
import net.mnowicki.familia.config.jwt.JwtTokenRefreshService;
import net.mnowicki.familia.exception.UnauthorizedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final JwtTokenRefreshService tokenRefreshService;

    public SignInResponseDto signin(SignInRequestDto loginRequest) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
        } catch (AuthenticationException e) {
            log.debug("Authentication failed for request {}: {}", loginRequest, e.getMessage());
            throw new UnauthorizedException();
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var user = userService.loadUserByUsername(loginRequest.email());
        var accessToken = jwtTokenProvider.createToken(authentication.getName(), authentication.getAuthorities());
        var refreshToken = tokenRefreshService.createOrUpdateRefreshToken(user);

        return new SignInResponseDto(accessToken, refreshToken, loginRequest.email());
    }

    public SignInResponseDto refreshToken(UUID token) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var user = userService.loadUserByUsername(authentication.getName());
        log.debug("Refreshing JWT access token for user [{}]", user.getEmail());
        tokenRefreshService.refreshToken(user, token);
        var accessToken = jwtTokenProvider.createToken(user.getEmail(), user.getAuthorities());

        return new SignInResponseDto(accessToken, token, authentication.getName());
    }

}
