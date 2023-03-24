package net.mnowicki.familia.person.dto;

import lombok.Builder;
import net.mnowicki.familia.model.Gender;

import java.time.LocalDate;

@Builder
public record PersonDto(Long id, String firstName, String lastName, LocalDate dateOfBirth, LocalDate dateOfDeath, Gender gender) {
}
