package net.mnowicki.familia.domain.person;

import net.mnowicki.familia.domain.person.dto.CreatePersonDto;
import net.mnowicki.familia.domain.person.dto.PersonDto;
import net.mnowicki.familia.model.graph.nodes.PersonNode;
import net.mnowicki.familia.model.graph.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    private final PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<PersonDto> findAll() {
        return personRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    public PersonDto create(CreatePersonDto createPersonDto) {
        var node = personRepository.save(PersonNode.builder()
                .firstName(createPersonDto.firstName())
                .lastName(createPersonDto.lastName())
                .dateOfBirth(createPersonDto.dateOfBirth())
                .dateOfDeath(createPersonDto.dateOfDeath())
                .gender(createPersonDto.gender())
                .build());

        return toDto(node);
    }

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
