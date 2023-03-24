package net.mnowicki.familia.person.dto;

import lombok.Builder;
import net.mnowicki.familia.model.Gender;
import org.springframework.lang.NonNull;

import java.time.LocalDate;

@Builder
public record CreatePersonDto(@NonNull String firstName, @NonNull String lastName, LocalDate dateOfBirth, LocalDate dateOfDeath, @NonNull Gender gender) {
}
