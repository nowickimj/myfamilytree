package net.mnowicki.familia.model.graph.nodes;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Data
@Builder
@Node
public class FamilyNode {

    private static final String PARENT_RELATIONSHIP_NAME = "PARENT";
    private static final String CHILD_RELATIONSHIP_NAME = "CHILD";

    @Id
    @GeneratedValue
    private Long id;

    @Relationship(type = PARENT_RELATIONSHIP_NAME, direction = Relationship.Direction.INCOMING)
    private List<PersonNode> parents;

    @Relationship(type = CHILD_RELATIONSHIP_NAME, direction = Relationship.Direction.OUTGOING)
    private List<PersonNode> children;

}
