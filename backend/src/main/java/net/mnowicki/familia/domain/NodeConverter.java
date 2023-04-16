package net.mnowicki.familia.domain;

import net.mnowicki.familia.domain.family.dto.FamilyDto;
import net.mnowicki.familia.domain.person.dto.PersonDto;
import net.mnowicki.familia.model.graph.nodes.FamilyNode;
import net.mnowicki.familia.model.graph.nodes.PersonNode;
import org.springframework.stereotype.Component;

@Component
public class NodeConverter {

    public PersonDto toPersonDto(PersonNode node) {
        return PersonDto.builder()
                .id(node.getId())
                .firstName(node.getFirstName())
                .middleName(node.getMiddleName())
                .lastName(node.getLastName())
                .dateOfBirth(node.getDateOfBirth())
                .dateOfDeath(node.getDateOfDeath())
                .gender(node.getGender())
                .build();
    }

    public FamilyDto toFamilyDto(FamilyNode node) {
        return FamilyDto.builder()
                .id(node.getId())
                .parents(node.getParents().stream().map(this::toPersonDto).toList())
                .children(node.getChildren().stream().map(this::toPersonDto).toList())
                .build();
    }

}
