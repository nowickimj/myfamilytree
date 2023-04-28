package net.mnowicki.familia.domain.person;

import net.mnowicki.familia.domain.NodeConverter;
import net.mnowicki.familia.domain.exception.PersonDeletionException;
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

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Consumer;
import java.util.function.Supplier;

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
        updateStringValueIfPresent(dto::lastName, node::setLastName);
        updateValueIfPresent(dto::gender, node::setGender);
        updateValueIfPresent(dto::dateOfBirth, node::setDateOfBirth);
        updateValueIfPresent(dto::dateOfDeath, node::setDateOfDeath);

        return converter.toPersonDto(personRepository.save(node));
    }

    @Transactional
    public void deleteExistingById(long id) {
        var deletedPerson = personRepository.findOrThrow(id);
        var descendingFamilies = familyRepository.findDescendingFamilies(id);
        boolean hasUndetachableChildren = descendingFamilies.stream()
                .anyMatch(descendingFamily -> {
                    boolean hasOtherParent = descendingFamily.getParents().stream().anyMatch(parent -> !parent.equals(deletedPerson));
                    boolean hasChildren = !descendingFamily.getChildren().isEmpty();

                    return hasOtherParent && hasChildren;
                });
        if(hasUndetachableChildren) {
            throw new PersonDeletionException(id, "Person has undetachable children");
        }
        // delete ascending family if necessary
        familyRepository.findAscendingFamily(id).filter(ascendingFamily -> {
                    boolean isNotSpouseFamily = ascendingFamily.getParents().size() < 2;
                    boolean hasNoOtherChildren = ascendingFamily.getChildren().stream().allMatch(child -> child.equals(deletedPerson));
                    return isNotSpouseFamily && hasNoOtherChildren;
                }).ifPresent(familyRepository::delete);

        personRepository.deleteExistingById(id);
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
}
