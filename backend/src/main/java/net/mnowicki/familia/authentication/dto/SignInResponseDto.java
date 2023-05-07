package net.mnowicki.familia.authentication.dto;

import java.util.UUID;

public record SignInResponseDto(String token, UUID refreshToken, String username) {
}
