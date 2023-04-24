package net.mnowicki.familia.domain.person.dto;

import net.mnowicki.familia.model.Gender;

import java.time.LocalDate;

public record CreateChildDto(String coParentId, String firstName, String middleName, String lastName,
                             String maidenName, LocalDate dateOfBirth, LocalDate dateOfDeath,
                             Gender gender, String description) {
}
