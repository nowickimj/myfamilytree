package net.mnowicki.familia.config.jwt;

import net.mnowicki.familia.authentication.UserRole;

import java.util.Set;

public record JwtTokenInfo(String email, Set<UserRole> roles) {
}
