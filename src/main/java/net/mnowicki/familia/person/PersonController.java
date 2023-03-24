package net.mnowicki.familia.person;

import net.mnowicki.familia.person.dto.CreatePersonDto;
import net.mnowicki.familia.person.dto.PersonDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/person")
public class PersonController {

    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping
    List<PersonDto> findAll() {
        return personService.findAll();
    }

    @PostMapping
    PersonDto create(@RequestBody @Validated CreatePersonDto dto) {
        return personService.create(dto);
    }
}
