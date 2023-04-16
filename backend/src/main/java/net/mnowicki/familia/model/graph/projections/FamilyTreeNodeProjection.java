package net.mnowicki.familia.model.graph.projections;

import lombok.Builder;
import net.mnowicki.familia.model.Gender;

import java.time.LocalDate;
import java.util.Set;

@Builder
public record FamilyTreeNodeProjection(String id, String firstName, String middleName, String lastName,
                                       Gender gender, LocalDate dateOfBirth, LocalDate dateOfDeath,
                                       Set<Relation> parents, Set<Relation> children, Set<Relation> siblings,
                                       Set<Relation> spouses) {

    @Builder
    public record Relation(String id) {
    }
}



