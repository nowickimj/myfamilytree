package net.mnowicki.familia.domain.relationship.dto;

import org.springframework.lang.NonNull;

public record CreatePartnerRelationshipDto(@NonNull Long partnerId1, @NonNull Long partnerId2) {
}
