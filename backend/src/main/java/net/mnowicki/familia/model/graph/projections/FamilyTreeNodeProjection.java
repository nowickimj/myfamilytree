package net.mnowicki.familia.model.graph.projections;

import lombok.Builder;
import net.mnowicki.familia.model.Gender;

import java.util.Set;

@Builder
public record FamilyTreeNodeProjection(String id, Gender gender, Set<Relation> parents, Set<Relation> children, Set<Relation> siblings,
                                       Set<Relation> spouses) {

    @Builder
    public record Relation(String id) {
    }
}



