package net.mnowicki.familia.model.graph.nodes;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.mnowicki.familia.model.RelationshipType;
import net.mnowicki.familia.model.graph.base.BaseNode;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@Node("Family")
public class FamilyNode extends BaseNode {

    @Relationship(type = RelationshipType.PARENT_STRING, direction = Relationship.Direction.INCOMING)
    private List<PersonNode> parents;

    @Relationship(type = RelationshipType.CHILD_STRING, direction = Relationship.Direction.OUTGOING)
    private List<PersonNode> children;

    //TODO: add optimistic lock
    //@Version
    //private Long version;
}
