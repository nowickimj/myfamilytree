package net.mnowicki.familia.model.graph.nodes;

import lombok.Builder;
import lombok.Data;
import net.mnowicki.familia.model.RelationshipType;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Data
@Builder
@Node("Family")
public class FamilyNode {

    @Id
    @GeneratedValue
    private Long id;

    @Relationship(type = RelationshipType.PARENT_STRING, direction = Relationship.Direction.INCOMING)
    private List<PersonNode> parents;

    @Relationship(type = RelationshipType.CHILD_STRING, direction = Relationship.Direction.OUTGOING)
    private List<PersonNode> children;

    //TODO: add optimistic lock
    //@Version
    //private Long version;
}
