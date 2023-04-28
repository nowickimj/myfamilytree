package net.mnowicki.familia.domain.person;

import net.mnowicki.familia.domain.NodeConverter;
import net.mnowicki.familia.domain.PersonUtils;
import net.mnowicki.familia.exception.BadRequestException;
import net.mnowicki.familia.domain.family.dto.FamilyDto;
import net.mnowicki.familia.domain.person.dto.CreateChildDto;
import net.mnowicki.familia.domain.person.dto.CreatePersonDto;
import net.mnowicki.familia.domain.person.dto.PersonDto;
import net.mnowicki.familia.domain.person.dto.UpdatePersonDto;
import net.mnowicki.familia.model.graph.nodes.FamilyNode;
import net.mnowicki.familia.model.graph.nodes.PersonNode;
import net.mnowicki.familia.model.graph.repositories.FamilyRepository;
import net.mnowicki.familia.model.graph.repositories.PersonRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.function.Consumer;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Service
public class PersonService {

    private final PersonRepository personRepository;
    private final FamilyRepository familyRepository;
    private final NodeConverter converter;

    @Autowired
    public PersonService(PersonRepository personRepository, FamilyRepository familyRepository, NodeConverter converter) {
        this.personRepository = personRepository;
        this.familyRepository = familyRepository;
        this.converter = converter;
    }

    public List<PersonDto> findAll() {
        return personRepository.findAll().stream()
                .map(converter::toPersonDto)
                .toList();
    }

    public PersonDto findById(long id) {
        var node = personRepository.findOrThrow(id);
        return converter.toPersonDto(node);
    }

    public PersonDto create(CreatePersonDto createPersonDto) {
        var node = personRepository.save(PersonNode.builder()
                .firstName(createPersonDto.firstName())
                .lastName(createPersonDto.lastName())
                .dateOfBirth(createPersonDto.dateOfBirth())
                .dateOfDeath(createPersonDto.dateOfDeath())
                .gender(createPersonDto.gender())
                .build());

        return converter.toPersonDto(node);
    }

    public PersonDto update(long id, UpdatePersonDto dto) {
        var node = personRepository.findOrThrow(id);
        updateStringValueIfPresent(dto::firstName, node::setFirstName);
        updateValueIfPresent(dto::middleName, node::setMiddleName);
        updateStringValueIfPresent(dto::lastName, node::setLastName);
        updateValueIfPresent(dto::maidenName, node::setMaidenName);
        updateValueIfPresent(dto::gender, node::setGender);
        updateValueIfPresent(dto::dateOfBirth, node::setDateOfBirth);
        updateValueIfPresent(dto::dateOfDeath, node::setDateOfDeath);
        updateValueIfPresent(dto::description, node::setDescription);

        return converter.toPersonDto(personRepository.save(node));
    }

    @Transactional
    public FamilyDto createChild(long parentId, CreateChildDto dto) {
        var parent = personRepository.findOrThrow(parentId);
        var family = Optional.ofNullable(dto.familyId())
                .map(familyRepository::findOrThrow)
                .orElseGet(() -> FamilyNode.builder()
                        .parents(Set.of(parent))
                        .build());
        var child = personRepository.save(PersonNode.builder()
                .firstName(dto.firstName())
                .middleName(dto.middleName())
                .lastName(dto.lastName())
                .maidenName(dto.maidenName())
                .gender(dto.gender())
                .dateOfBirth(dto.dateOfBirth())
                .dateOfDeath(dto.dateOfDeath())
                .description(dto.description())
                .build());
        family.addChild(child);
        familyRepository.save(family);

        return converter.toFamilyDto(family);
    }

    @Transactional
    public FamilyDto createParent(long childId, CreatePersonDto dto) {
        var child = personRepository.findOrThrow(childId);
        var family = familyRepository.findAscendingFamily(childId).map(existingFamily -> {
            PersonUtils.assertParentsCountLimitNotReached(existingFamily);
            return existingFamily;
        }).orElseGet(() -> FamilyNode.builder()
                .children(Set.of(child))
                .build());
        var parent = personRepository.save(PersonNode.builder()
                .firstName(dto.firstName())
                .middleName(dto.middleName())
                .lastName(dto.lastName())
                .maidenName(dto.maidenName())
                .gender(dto.gender())
                .description(dto.description())
                .dateOfBirth(dto.dateOfBirth())
                .dateOfDeath(dto.dateOfDeath())
                .build());
        family.addParent(parent);
        familyRepository.save(family);

        return converter.toFamilyDto(family);
    }

    @Transactional
    public FamilyDto createSpouse(long id, CreatePersonDto dto) {
        var person = personRepository.findOrThrow(id);
        var spouse = personRepository.save(PersonNode.builder()
                .firstName(dto.firstName())
                .middleName(dto.middleName())
                .lastName(dto.lastName())
                .maidenName(dto.maidenName())
                .gender(dto.gender())
                .description(dto.description())
                .dateOfBirth(dto.dateOfBirth())
                .dateOfDeath(dto.dateOfDeath())
                .build());
        var family = familyRepository.save(FamilyNode.builder()
                        .parents(Set.of(person, spouse))
                .build());

        return converter.toFamilyDto(family);
    }

    @Transactional
    public void deleteExistingById(long id) {
        var deletedPerson = personRepository.findOrThrow(id);
        var ascendingFamily = familyRepository.findAscendingFamily(id);
        var descendingFamilies = familyRepository.findDescendingFamilies(id);

        boolean isMiddleNode = ascendingFamily.isPresent() && !descendingFamilies.isEmpty();
        if (isMiddleNode) {
            throw new BadRequestException("Middle node cannot be deleted.");
        }

        ascendingFamily.filter(family -> {
            boolean isNotSpouseFamily = family.getParents().size() < 2;
            boolean isOnlyChild = family.getChildren().stream().allMatch(deletedPerson::equals);
            return isNotSpouseFamily && isOnlyChild;
        }).ifPresent(familyRepository::delete);

        descendingFamilies.stream().filter(family -> {
            boolean isNotSpouseFamily = family.getParents().size() < 2;
            boolean isOnlyParent = family.getParents().stream().allMatch(deletedPerson::equals);
            return isNotSpouseFamily && isOnlyParent;
        }).forEach(familyRepository::delete);

        personRepository.deleteExistingById(id);
    }

    public FamilyDto spouse(long personId1, long personId2) {
        var person1 = personRepository.findOrThrow(personId1);
        var person2 = personRepository.findOrThrow(personId2);
        assertPersonsNotAlreadyInFamily(person1, person2);

        var family = FamilyNode.builder()
                .parents(Set.of(person1, person2))
                .build();
        familyRepository.save(family);

        return converter.toFamilyDto(family);
    }

    private void updateStringValueIfPresent(Supplier<String> dtoGetter, Consumer<String> nodeSetter) {
        Optional.ofNullable(dtoGetter.get())
                .filter(StringUtils::isNotBlank)
                .ifPresent(nodeSetter);
    }

    private <T> void updateValueIfPresent(Supplier<T> dtoGetter, Consumer<T> nodeSetter) {
        Optional.ofNullable(dtoGetter.get())
                .ifPresent(nodeSetter);
    }

    public Set<PersonDto> getParents(long childId) {
        personRepository.findOrThrow(childId);
        return familyRepository.findAscendingFamily(childId)
                .map(FamilyNode::getParents)
                .orElse(Collections.emptySet())
                .stream()
                .map(converter::toPersonDto)
                .collect(Collectors.toSet());
    }

    public FamilyDto getAscendingFamily(long personId) {
        return familyRepository.findAscendingFamily(personId)
                .map(converter::toFamilyDto)
                .orElse(null);
    }

    public Set<FamilyDto> getDescendingFamilies(long personId) {
        return familyRepository.findDescendingFamilies(personId).stream()
                .map(converter::toFamilyDto)
                .collect(Collectors.toSet());
    }

    public void assertPersonsNotAlreadyInFamily(PersonNode person1, PersonNode person2) {
        if (familyRepository.hasFamilyWith(person1.getId(), person2.getId())) {
            throw new BadRequestException("Person with id %s is already a family with %s", Long.toString(person1.getId()), Long.toString(person2.getId()));
        }
    }

}
