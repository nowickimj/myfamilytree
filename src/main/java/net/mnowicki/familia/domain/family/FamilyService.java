package net.mnowicki.familia.domain.family;

import net.mnowicki.familia.domain.NodeConverter;
import net.mnowicki.familia.domain.family.dto.CreateFamilyDto;
import net.mnowicki.familia.domain.family.dto.FamilyDto;
import net.mnowicki.familia.model.graph.base.BaseNode;
import net.mnowicki.familia.model.graph.nodes.FamilyNode;
import net.mnowicki.familia.model.graph.nodes.PersonNode;
import net.mnowicki.familia.model.graph.repositories.FamilyRepository;
import net.mnowicki.familia.model.graph.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public FamilyDto createFamily(CreateFamilyDto dto) {
        int parentsCount = dto.parentsIds().size();
        if (parentsCount != 1 && parentsCount != 2) {
            throw new FamilyCreationException("Invalid parents count.");
        }
        var parents = dto.parentsIds().stream().map(personRepository::findOrThrow).toList();
        var children = dto.childrenIds().stream().map(personRepository::findOrThrow).toList();
        assertChildrenNotHavingOtherParents(parents, children);

        var existingParentsFamily = parentsCount == 2
                ? familyRepository.findPartnersFamily(parents.get(0).getId(), parents.get(1).getId())
                : familyRepository.findDescendingFamily(parents.get(0).getId());

        var family = existingParentsFamily.orElseGet(() -> FamilyNode.builder().build());

        family.getChildren().addAll(children);
        familyRepository.save(family);
        return converter.toFamilyDto(family);
    }

    public FamilyDto addPartner(long personId1, long personId2) {
        var person1 = personRepository.findOrThrow(personId1);
        var person2 = personRepository.findOrThrow(personId2);
        assertNoRelationshipExists(person1, person2);

        var family = FamilyNode.builder()
                .parents(List.of(person1, person2))
                .build();
        familyRepository.save(family);
        return converter.toFamilyDto(family);
    }

    public FamilyDto addChild(long parentId, long childId) {
        var parent = personRepository.findOrThrow(parentId);
        var child = personRepository.findOrThrow(childId);
        assertNoRelationshipExists(parent, child);
        var family = familyRepository.findAscendingFamily(childId)
                .map(existingFamily -> {
                    if (existingFamily.getParents().size() > 1) {
                        throw new FamilyCreationException("Person with id %s has already been assigned a maximum number of parents.", Long.toString(childId));
                    }
                    existingFamily.getParents().add(parent);
                    return existingFamily;
                }).orElseGet(() -> FamilyNode.builder()
                        .parents(List.of(parent))
                        .children(List.of(child))
                        .build());

        familyRepository.save(family);
        return converter.toFamilyDto(family);
    }

    public void addChildToFamily(long familyId, long childId) {
        familyRepository.findAscendingFamily(childId).ifPresent(family -> {
            throw new FamilyCreationException("Person with id %s is already assigned to family %s", Long.toString(childId), family.idAsString());
        });

        var child = personRepository.findOrThrow(childId);
        var family = familyRepository.findOrThrow(familyId);
        family.getChildren().add(child);
        familyRepository.save(family);
    }

    public void addParentToFamily(long familyId, long parentId) {
        var family = familyRepository.findOrThrow(familyId);
        if (family.getParents().size() > 1) {
            throw new FamilyCreationException("Maximum number of parents already assigned to family.");
        }
        var parent = personRepository.findOrThrow(parentId);
        family.getParents().add(parent);
        familyRepository.save(family);
    }

    private void assertChildrenNotHavingOtherParents(List<PersonNode> expectedParents, List<PersonNode> children) {
        children.forEach(child -> {
            var foundParents = personRepository.findParents(child.getId());
            foundParents.removeAll(expectedParents);
            if (foundParents.size() != 0) {
                List<Long> foundParentsIds = foundParents.stream().map(BaseNode::getId).toList();
                throw new FamilyCreationException(String.format("Unexpected parents [%s] found for child %s", foundParentsIds, child.idAsString()));
            }
        });
    }

    public void assertNoRelationshipExists(PersonNode person1, PersonNode person2) {
        if (familyRepository.hasFamilyWith(person1.getId(), person2.getId())) {
            throw new FamilyCreationException("Person with id %s is already a family with %s", Long.toString(person1.getId()), Long.toString(person2.getId()));
        }
    }
}
