package net.mnowicki.familia.domain.person;

import net.mnowicki.familia.domain.NodeConverter;
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

    public void deleteById(long id) {
        //TODO: make sure all related nodes are checked
        personRepository.deleteExistingById(id);
    }
}
