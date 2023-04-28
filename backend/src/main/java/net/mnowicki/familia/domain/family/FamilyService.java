package net.mnowicki.familia.domain.family;

import net.mnowicki.familia.domain.NodeConverter;
import net.mnowicki.familia.domain.PersonUtils;
import net.mnowicki.familia.domain.exception.FamilyCreationException;
import net.mnowicki.familia.domain.family.dto.FamilyDto;
import net.mnowicki.familia.model.graph.repositories.FamilyRepository;
import net.mnowicki.familia.model.graph.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void addChildToFamily(long familyId, long childId) {
        assertChildNotAssignedToFamily(childId);
        var child = personRepository.findOrThrow(childId);
        var family = familyRepository.findOrThrow(familyId);
        family.addChild(child);

        familyRepository.save(family);
    }

    public void addParentToFamily(long familyId, long parentId) {
        var family = familyRepository.findOrThrow(familyId);
        PersonUtils.assertParentsCountLimitNotReached(family);
        var parent = personRepository.findOrThrow(parentId);
        family.addParent(parent);

        familyRepository.save(family);
    }

    public void assertChildNotAssignedToFamily(long childId) {
        familyRepository.findAscendingFamily(childId).ifPresent(existingFamily -> {
            throw new FamilyCreationException("Child with id %s is already assigned to family with id %s", Long.toString(childId), existingFamily.idAsString());
        });
    }

}
