package net.mnowicki.familia.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;


@Data
@Configuration
@ConfigurationProperties(prefix = "security.jwt")
public class JwtConfig {

    private String secretKey;
    private String tokenPrefix;
    private Integer tokenExpiration;
    private Integer refreshTokenExpiration;

}
