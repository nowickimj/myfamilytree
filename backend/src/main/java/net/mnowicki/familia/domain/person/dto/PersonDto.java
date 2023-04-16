package net.mnowicki.familia.domain.person.dto;

import lombok.Builder;
import net.mnowicki.familia.model.Gender;

import java.time.LocalDate;

@Builder
public record PersonDto(long id, String firstName, String middleName, String lastName, LocalDate dateOfBirth, LocalDate dateOfDeath, Gender gender) {
}
