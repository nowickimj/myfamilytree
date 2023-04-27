package net.mnowicki.familia.domain.person.dto;

import net.mnowicki.familia.model.Gender;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public record CreateChildDto(Long familyId, String firstName, String middleName, String lastName,
                             String maidenName, LocalDate dateOfBirth, LocalDate dateOfDeath,
                             @NotNull Gender gender, String description) {
}
