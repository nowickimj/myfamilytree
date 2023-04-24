package net.mnowicki.familia.domain.person;

import net.mnowicki.familia.domain.family.FamilyService;
import net.mnowicki.familia.domain.family.dto.FamilyDto;
import net.mnowicki.familia.domain.person.dto.CreateChildDto;
import net.mnowicki.familia.domain.person.dto.CreatePersonDto;
import net.mnowicki.familia.domain.person.dto.PersonDto;
import net.mnowicki.familia.domain.person.dto.UpdatePersonDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping(path = "/persons")
public class PersonController {

    private final PersonService personService;
    private final FamilyService familyService;

    @Autowired
    public PersonController(PersonService personService, FamilyService familyService) {
        this.personService = personService;
        this.familyService = familyService;
    }

    @GetMapping
    List<PersonDto> findAll() {
        return personService.findAll();
    }

    @GetMapping("/{id}")
    PersonDto getById(@NonNull @PathVariable("id") long id) {
        return personService.findById(id);
    }

    @PostMapping
    PersonDto create(@RequestBody @Validated CreatePersonDto dto) {
        return personService.create(dto);
    }

    @PatchMapping("/{id}")
    PersonDto update(@NonNull @PathVariable("id") long id, @RequestBody @Validated UpdatePersonDto dto) {
        return personService.update(id, dto);
    }

    @PostMapping("/{id}/partners/{partnerId}")
    public FamilyDto addPartner(@NotNull @PathVariable("id") long partnerId1, @NotNull @PathVariable("partnerId") long partnerId2) {
        return familyService.addPartner(partnerId1, partnerId2);
    }

    @PostMapping("/{id}/children")
    public FamilyDto createChild(@NotNull @PathVariable("id") long parentId, @RequestBody @Validated CreateChildDto dto) {
        return familyService.createChild(parentId, dto);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteExistingById(@NonNull @PathVariable("id") long id) {
        personService.deleteExistingById(id);
        return ResponseEntity.accepted().build();
    }

}
