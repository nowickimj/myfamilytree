package net.mnowicki.familia.config.jwt;

import lombok.RequiredArgsConstructor;
import net.mnowicki.familia.authentication.User;
import net.mnowicki.familia.config.JwtConfig;
import net.mnowicki.familia.exception.UnauthorizedException;
import net.mnowicki.familia.model.document.collections.TokenRefreshDocument;
import net.mnowicki.familia.model.document.repositories.TokenRefreshRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtTokenRefreshService {

    private final TokenRefreshRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtConfig jwtConfig;

    public UUID createOrUpdateRefreshToken(User user) {
        var token = UUID.randomUUID();
        var refreshToken = refreshTokenRepository.findByEmail(user.getEmail())
                .orElse(new TokenRefreshDocument(user.getEmail()));
        refreshToken.setToken(passwordEncoder.encode(token.toString()));
        refreshToken.setExpiryDate(LocalDateTime.now().plusSeconds(jwtConfig.getRefreshTokenExpiration()));
        refreshToken.incrementRefreshCount();
        refreshTokenRepository.save(refreshToken);

        return token;
    }

    public void refreshToken(User user, UUID token) {
        var userRefreshToken = refreshTokenRepository.findByEmail(user.getEmail())
                .orElseThrow(UnauthorizedException::new);

        validateRefreshToken(userRefreshToken, token);
        userRefreshToken.incrementRefreshCount();
        refreshTokenRepository.save(userRefreshToken);
    }

    private void validateRefreshToken(TokenRefreshDocument refreshToken, UUID requestedTokenValue) {
        if (LocalDateTime.now().isAfter(refreshToken.getExpiryDate())) {
            throw new UnauthorizedException();
        }
        if (!passwordEncoder.matches(requestedTokenValue.toString(), refreshToken.getToken())) {
            throw new UnauthorizedException();
        }
    }
}