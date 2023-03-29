package net.mnowicki.familia.domain.family.dto;

import lombok.Builder;
import net.mnowicki.familia.domain.person.dto.PersonDto;

import java.util.List;

@Builder
public record FamilyDto(long id, List<PersonDto> parents, List<PersonDto> children) {
}
