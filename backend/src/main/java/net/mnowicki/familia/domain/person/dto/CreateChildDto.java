package net.mnowicki.familia.domain.person.dto;

import jakarta.validation.constraints.NotBlank;
import net.mnowicki.familia.model.Gender;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public record CreateChildDto(Long familyId, @NotBlank String firstName, String middleName, String lastName,
                             String maidenName, LocalDate dateOfBirth, LocalDate dateOfDeath,
                             @NotNull Gender gender, String description) implements IPersonDto {
}
