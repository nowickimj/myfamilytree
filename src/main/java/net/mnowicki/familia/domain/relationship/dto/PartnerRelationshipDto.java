package net.mnowicki.familia.domain.relationship.dto;

import lombok.Builder;
import net.mnowicki.familia.model.RelationshipType;

@Builder
public record PartnerRelationshipDto(Long id, Long partner1Id, Long partner2Id) {
}
