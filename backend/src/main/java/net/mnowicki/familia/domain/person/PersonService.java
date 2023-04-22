package net.mnowicki.familia.domain.person;

import net.mnowicki.familia.domain.NodeConverter;
import net.mnowicki.familia.domain.person.dto.CreatePersonDto;
import net.mnowicki.familia.domain.person.dto.PersonDto;
import net.mnowicki.familia.domain.person.dto.UpdatePersonDto;
import net.mnowicki.familia.model.graph.nodes.PersonNode;
import net.mnowicki.familia.model.graph.repositories.PersonRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Supplier;

@Service
public class PersonService {

    private final PersonRepository personRepository;
    private final NodeConverter converter;

    @Autowired
    public PersonService(PersonRepository personRepository, NodeConverter converter) {
        this.personRepository = personRepository;
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

    public void deleteExistingById(long id) {
        //TODO: make sure all related nodes are checked
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
