package net.mnowicki.familia.domain.person;

import net.mnowicki.familia.domain.family.FamilyService;
import net.mnowicki.familia.domain.family.dto.FamilyDto;
import net.mnowicki.familia.domain.person.dto.CreatePersonDto;
import net.mnowicki.familia.domain.person.dto.PersonDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    PersonDto create(@RequestBody @Validated CreatePersonDto dto) {
        return personService.create(dto);
    }

    @PostMapping("/{id}/partners/{partnerId}")
    public FamilyDto addPartner(@NotNull @PathVariable("{id}") long partnerId1, @NotNull @PathVariable("partnerId") Long partnerId2) {
        return familyService.addPartner(partnerId1, partnerId2);
    }

    @PostMapping("/{id}/children/{childId}")
    public FamilyDto addChild(@NotNull @PathVariable("{id}") long parentId, @NotNull @PathVariable("childId") Long childId) {
        return familyService.addChild(parentId, childId);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@NonNull @PathVariable("id") Long id) {
        personService.deleteById(id);
        return ResponseEntity.accepted().build();
    }

}
