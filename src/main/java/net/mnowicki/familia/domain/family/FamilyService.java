package net.mnowicki.familia.domain.family;

import net.mnowicki.familia.domain.NodeConverter;
import net.mnowicki.familia.domain.family.dto.FamilyDto;
import net.mnowicki.familia.model.graph.nodes.FamilyNode;
import net.mnowicki.familia.model.graph.nodes.PersonNode;
import net.mnowicki.familia.model.graph.repositories.FamilyRepository;
import net.mnowicki.familia.model.graph.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class FamilyService {

    private final FamilyRepository familyRepository;
    private final PersonRepository personRepository;
    private final NodeConverter converter;

    @Autowired
    public FamilyService(FamilyRepository familyRepository, PersonRepository personRepository, NodeConverter converter) {
        this.familyRepository = familyRepository;
        this.personRepository = personRepository;
        this.converter = converter;
    }

    public FamilyDto findById(long id) {
        var node = familyRepository.findOrThrow(id);
        return converter.toFamilyDto(node);
    }

    public void deleteExistingById(long id) {
        familyRepository.deleteExistingById(id);
    }

    public FamilyDto addPartner(long personId1, long personId2) {
        var person1 = personRepository.findOrThrow(personId1);
        var person2 = personRepository.findOrThrow(personId2);
        assertPersonsNotAlreadyInFamily(person1, person2);

        var family = FamilyNode.builder()
                .parents(Set.of(person1, person2))
                .build();
        familyRepository.save(family);

        return converter.toFamilyDto(family);
    }

    public FamilyDto addChildToPerson(long parentId, long childId) {
        var parent = personRepository.findOrThrow(parentId);
        var child = personRepository.findOrThrow(childId);
        assertPersonsNotAlreadyInFamily(parent, child);
        assertChildNotAssignedToFamily(child.getId());

        var family = FamilyNode.builder()
                .parents(Set.of(parent))
                .children(Set.of(child))
                .build();
        familyRepository.save(family);

        return converter.toFamilyDto(family);
    }

    public void addChildToFamily(long familyId, long childId) {
        assertChildNotAssignedToFamily(childId);
        var child = personRepository.findOrThrow(childId);
        var family = familyRepository.findOrThrow(familyId);
        family.addChild(child);
        familyRepository.save(family);
    }

    public void addParentToFamily(long familyId, long parentId) {
        var family = familyRepository.findOrThrow(familyId);
        if (family.getParents().size() > 1) {
            throw new FamilyCreationException("Maximum number of parents already assigned to family.");
        }
        var parent = personRepository.findOrThrow(parentId);
        family.addParent(parent);
        familyRepository.save(family);
    }

    public void assertPersonsNotAlreadyInFamily(PersonNode person1, PersonNode person2) {
        if (familyRepository.hasFamilyWith(person1.getId(), person2.getId())) {
            throw new FamilyCreationException("Person with id %s is already a family with %s", Long.toString(person1.getId()), Long.toString(person2.getId()));
        }
    }

    public void assertChildNotAssignedToFamily(long childId) {
        familyRepository.findAscendingFamily(childId).ifPresent(existingFamily -> {
            throw new FamilyCreationException("Child with id %s is already assigned to family with id %s", Long.toString(childId), existingFamily.idAsString());
        });
    }
}
