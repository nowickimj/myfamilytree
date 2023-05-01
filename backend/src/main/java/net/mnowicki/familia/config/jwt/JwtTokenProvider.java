package net.mnowicki.familia.config.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import net.mnowicki.familia.authentication.UserRole;
import net.mnowicki.familia.config.JwtConfig;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private static final String ROLES_KEY = "roles";
    private static final String FIRST_NAME_KEY = "firstName";
    public static final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;

    private final JwtConfig jwtConfig;

    private Key key;

    @PostConstruct
    protected void init() {
        String base64EncodedSecretKey = Base64.getEncoder().encodeToString(jwtConfig.getSecretKey().getBytes());
        key = new SecretKeySpec(base64EncodedSecretKey.getBytes(), SIGNATURE_ALGORITHM.getJcaName());
    }

    public String createToken(String email, Collection<? extends GrantedAuthority> roles) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put(ROLES_KEY, roles);
        Date now = new Date();
        int tokenExpirationInSeconds = jwtConfig.getTokenExpiration();
        Date validity = new Date(now.getTime() + tokenExpirationInSeconds * 1000L);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public JwtTokenInfo parseToken(String token) {
        Jws<Claims> claimsJws = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
        Claims body = claimsJws.getBody();
        String email = body.getSubject();
        List<?> roleList = body.get(ROLES_KEY, List.class);

        Set<UserRole> roles = roleList
                .stream()
                .map(String.class::cast)
                .map(UserRole::valueOf)
                .collect(Collectors.toSet());

        return new JwtTokenInfo(email, roles);
    }

}
