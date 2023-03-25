package net.mnowicki.familia.domain.relationship;

import net.mnowicki.familia.domain.relationship.dto.CreateParentalRelationshipDto;
import net.mnowicki.familia.domain.relationship.dto.CreatePartnerRelationshipDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/relationships")
public class RelationshipController {

    @Autowired
    private RelationshipService relationshipService;

    @PostMapping("/partners")
    public ResponseEntity<Void> createPartnerRelationship(@RequestBody @Validated CreatePartnerRelationshipDto dto) {
         relationshipService.createPartnerRelationship(dto);
         return ResponseEntity.ok().build();
    }

    @PostMapping("/parents")
    public ResponseEntity<Void> createParentalRelationship(@RequestBody @Validated CreateParentalRelationshipDto dto) {
        relationshipService.createParentalRelationship(dto);
        return ResponseEntity.ok().build();
    }
}
