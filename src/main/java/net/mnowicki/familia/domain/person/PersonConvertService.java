package net.mnowicki.familia.domain.person;

import net.mnowicki.familia.domain.person.dto.PersonDto;
import net.mnowicki.familia.model.graph.nodes.PersonNode;
import org.springframework.stereotype.Component;

@Component
public class PersonConvertService {

    public PersonDto toDto(PersonNode node) {
        return PersonDto.builder()
                .id(node.getId())
                .firstName(node.getFirstName())
                .lastName(node.getLastName())
                .dateOfBirth(node.getDateOfBirth())
                .dateOfDeath(node.getDateOfDeath())
                .gender(node.getGender())
                .build();
    }
}
