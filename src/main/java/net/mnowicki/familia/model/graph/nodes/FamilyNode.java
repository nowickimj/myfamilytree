package net.mnowicki.familia.model.graph.nodes;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.mnowicki.familia.model.RelationshipType;
import net.mnowicki.familia.model.graph.base.BaseNode;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.*;

@Builder
@EqualsAndHashCode(callSuper = true)
@Node("Family")
public class FamilyNode extends BaseNode {

    @Relationship(type = RelationshipType.PARENT_STRING, direction = Relationship.Direction.INCOMING)
    private Set<PersonNode> parents;

    @Relationship(type = RelationshipType.CHILD_STRING, direction = Relationship.Direction.OUTGOING)
    private Set<PersonNode> children;

    public Set<PersonNode> getParents() {
        if(parents == null) {
            parents = new HashSet<>();
        }
        return parents;
    }

    public Set<PersonNode> getChildren() {
        if(children == null) {
            children = new HashSet<>();
        }
        return children;
    }

    public void addParent(PersonNode parent) {
        getParents().add(parent);
    }

    public void addChild(PersonNode child) {
        getChildren().add(child);
    }

    public void addChildren(List<PersonNode> children) {
        getChildren().addAll(children);
    }

    //TODO: add optimistic lock
    //@Version
    //private Long version;
}
