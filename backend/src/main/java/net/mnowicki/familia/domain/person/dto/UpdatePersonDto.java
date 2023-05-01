package net.mnowicki.familia.domain.person.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import net.mnowicki.familia.model.Gender;

import java.time.LocalDate;

@Builder
public record UpdatePersonDto(@NotBlank String firstName, String middleName, String lastName, String maidenName, LocalDate dateOfBirth, LocalDate dateOfDeath,
                              @NotNull Gender gender, String description) implements IPersonDto {
}
