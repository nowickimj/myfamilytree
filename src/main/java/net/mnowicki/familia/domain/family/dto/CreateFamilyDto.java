package net.mnowicki.familia.domain.family.dto;

import net.mnowicki.familia.domain.person.dto.PersonDto;
import org.springframework.lang.NonNull;


import javax.validation.constraints.NotEmpty;
import java.util.List;

public record CreateFamilyDto(@NotEmpty List<Long> parentsIds, List<Long> childrenIds) {
}
