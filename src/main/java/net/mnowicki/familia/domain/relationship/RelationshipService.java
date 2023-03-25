package net.mnowicki.familia.domain.relationship;

import net.mnowicki.familia.domain.person.exception.RelationshipCreationException;
import net.mnowicki.familia.domain.relationship.dto.CreateParentalRelationshipDto;
import net.mnowicki.familia.domain.relationship.dto.CreatePartnerRelationshipDto;
import net.mnowicki.familia.model.graph.nodes.FamilyNode;
import net.mnowicki.familia.model.graph.nodes.PersonNode;
import net.mnowicki.familia.model.graph.repositories.FamilyRepository;
import net.mnowicki.familia.model.graph.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RelationshipService {

    private final FamilyRepository familyRepository;
    private final PersonRepository personRepository;

    @Autowired
    public RelationshipService(FamilyRepository familyRepository, PersonRepository personRepository) {
        this.familyRepository = familyRepository;
        this.personRepository = personRepository;
    }

    @Transactional
    public void createPartnerRelationship(CreatePartnerRelationshipDto dto) {
        var partner1 = personRepository.findOrThrow(dto.partnerId1());
        var partner2 = personRepository.findOrThrow(dto.partnerId2());
        assertNoRelationshipExists(partner1, partner2);

        var family = FamilyNode.builder()
                .parents(List.of(partner1, partner2))
                .build();
        familyRepository.save(family);
    }

    public void createParentalRelationship(CreateParentalRelationshipDto dto) {
        var parent1 = personRepository.findOrThrow(dto.parentId1());
        var parent2 = personRepository.findOrThrow(dto.parentId2());
        var child = personRepository.findOrThrow(dto.childId());
        assertNoRelationshipExists(parent1, child);
        assertNoRelationshipExists(parent2, child);

        var family = familyRepository.findBetween(parent1.getId(), parent2.getId())
                .orElseGet(() -> FamilyNode.builder().build());

        family.getChildren().add(child);
        familyRepository.save(family);
    }

    public void assertNoRelationshipExists(PersonNode person1, PersonNode person2) {
        if (personRepository.hasRelationship(person1.getId(), person2.getId())) {
            throw new RelationshipCreationException("Relationship between persons already exists.");
        }
    }
}
