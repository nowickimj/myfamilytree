package net.mnowicki.familia.model.graph.projections;

import lombok.Builder;

@Builder
public record FamilyTreeRootProjection(String id, String firstName, String lastName) {
}
