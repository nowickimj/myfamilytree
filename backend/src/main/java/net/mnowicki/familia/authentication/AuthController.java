package net.mnowicki.familia.authentication;

import net.mnowicki.familia.authentication.dto.SignInRequestDto;
import net.mnowicki.familia.authentication.dto.SignInResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(AuthController.REQUEST_MAPPING)
public class AuthController {

    public static final String REQUEST_MAPPING = "/auth";

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signin")
    public SignInResponseDto signin(@Validated @RequestBody SignInRequestDto dto) {
        return authService.signin(dto);
    }

    @PostMapping("/refresh")
    public SignInResponseDto refreshToken(@Validated @RequestParam String refreshToken) {
        return authService.refreshToken(UUID.fromString(refreshToken));
    }

}
