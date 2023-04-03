package net.mnowicki.familia.domain.tree.dto;

import lombok.Builder;

@Builder
public record FamilyTreeRootDto(String id, String firstName, String lastName) {
}
