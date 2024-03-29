package net.mnowicki.familia.domain.person;

import net.mnowicki.familia.domain.family.dto.FamilyDto;
import net.mnowicki.familia.domain.person.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "/persons")
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

    @GetMapping("/{id}/parents")
    public Set<PersonDto> getParents(@NotNull @PathVariable("id") long childId) {
        return personService.getParents(childId);
    }

    @PostMapping("/{id}/children")
    public FamilyDto createChild(@NotNull @PathVariable("id") long parentId, @RequestBody @Validated CreateChildDto dto) {
        return personService.createChild(parentId, dto);
    }

    @PostMapping("/{id}/parents")
    public FamilyDto createParent(@NotNull @PathVariable("id") long parentId, @RequestBody @Validated CreatePersonDto dto) {
        return personService.createParent(parentId, dto);
    }

    @PostMapping("/{id}/spouses")
    public FamilyDto createSpouse(@NotNull @PathVariable("id") long id, @RequestBody @Validated CreateSpouseDto dto) {
        return personService.createSpouse(id, dto);
    }

    @GetMapping("/{id}/families/descending")
    public Set<FamilyDto> getDescendingFamilies(@NotNull @PathVariable("id") long id) {
        return personService.getDescendingFamilies(id);
    }

    @GetMapping("/{id}/families/ascending")
    public FamilyDto getAscendingFamily(@NotNull @PathVariable("id") long id) {
        return personService.getAscendingFamily(id);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteExistingById(@NonNull @PathVariable("id") long id) {
        personService.deleteExistingById(id);
        return ResponseEntity.accepted().build();
    }

}
