package net.mnowicki.familia.domain.person.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import net.mnowicki.familia.model.Gender;
import org.springframework.lang.NonNull;

import java.time.LocalDate;

@Builder
public record CreatePersonDto(@NotBlank String firstName, String middleName, @NotBlank String lastName,
                              String maidenName, LocalDate dateOfBirth, LocalDate dateOfDeath,
                              @NonNull Gender gender, String description) implements IPersonDto {
}
