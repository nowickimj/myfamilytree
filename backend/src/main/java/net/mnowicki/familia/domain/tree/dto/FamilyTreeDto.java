package net.mnowicki.familia.domain.tree.dto;

import lombok.Builder;

import java.util.Set;

@Builder
public record FamilyTreeDto(String rootId, Set<FamilyTreeNodeDto> nodes) {
}
