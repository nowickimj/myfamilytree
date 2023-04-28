package net.mnowicki.familia.domain.person.dto;

import lombok.Builder;
import net.mnowicki.familia.model.Gender;

import java.time.LocalDate;

@Builder
public record UpdatePersonDto(String firstName, String middleName, String lastName, String maidenName, LocalDate dateOfBirth, LocalDate dateOfDeath,
                              Gender gender, String description) {
}
