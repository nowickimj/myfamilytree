package net.mnowicki.familia.domain.family;

import net.mnowicki.familia.domain.family.dto.FamilyDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/families")
public class FamilyController {

    private final FamilyService familyService;

    @Autowired
    public FamilyController(FamilyService familyService) {
        this.familyService = familyService;
    }

    @GetMapping("/{id}")
    public FamilyDto findById(@NotNull @PathVariable("id") long id) {
        return familyService.findById(id);
    }

    @PostMapping("/{familyId}/children/{childId}")
    public ResponseEntity<Void> addChildToFamily(@NotNull @PathVariable("familyId") long familyId, @NotNull @PathVariable("childId") Long childId) {
        familyService.addChildToFamily(familyId, childId);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/{familyId}/parents/{parentId}")
    public ResponseEntity<Void> addParentToFamily(@NotNull @PathVariable("familyId") long familyId, @NotNull @PathVariable("parentId") Long parentId) {
        familyService.addParentToFamily(familyId, parentId);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@NonNull @PathVariable("id") Long id) {
        familyService.deleteExistingById(id);
        return ResponseEntity.accepted().build();
    }

}
