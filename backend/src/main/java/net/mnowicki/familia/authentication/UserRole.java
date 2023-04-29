package net.mnowicki.familia.authentication;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    USER("USER"),
    ADMIN("ADMIN");

    @Getter
    private String authority;

    UserRole(String authority) {
        this.authority = authority;
    }

}
