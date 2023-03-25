package net.mnowicki.familia.domain.relationship.dto;

import net.mnowicki.familia.model.RelationshipType;
import org.springframework.lang.NonNull;

public record CreateParentalRelationshipDto(@NonNull Long parentId1, @NonNull Long parentId2, @NonNull Long childId) {
}
