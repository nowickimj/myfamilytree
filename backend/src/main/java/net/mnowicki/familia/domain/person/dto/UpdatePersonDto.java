package net.mnowicki.familia.domain.person.dto;

import lombok.Builder;
import net.mnowicki.familia.model.Gender;
import org.springframework.lang.NonNull;

import java.time.LocalDate;

@Builder
public record UpdatePersonDto(String firstName, String lastName, LocalDate dateOfBirth, LocalDate dateOfDeath, Gender gender) {
}
