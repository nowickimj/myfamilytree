package net.mnowicki.familia.domain.tree.dto;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Builder;
import lombok.Getter;
import net.mnowicki.familia.model.Gender;

import java.util.Set;

@Builder
public record FamilyTreeNodeDto(String id, Gender gender, Set<RelationDto> parents, Set<RelationDto> children,
                                Set<RelationDto> siblings, Set<RelationDto> spouses) {

    @Builder
    public record RelationDto(String id, RelativeType type) {
    }

    public enum RelativeType {
        BLOOD("blood"),
        MARRIED("married");

        @Getter
        @JsonValue
        final String value;

        RelativeType(String value) {
            this.value = value;
        }
    }
}

