package net.mnowicki.familia.model.graph.nodes;

import lombok.Builder;
import lombok.Data;
import net.mnowicki.familia.model.Gender;
import net.mnowicki.familia.model.RelationshipType;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@Node("Person")
public class PersonNode {

    @Id
    @GeneratedValue
    private Long id;

    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private LocalDate dateOfDeath;
    private Gender gender;

    @Relationship(type = RelationshipType.CHILD_STRING, direction = Relationship.Direction.OUTGOING)
    private List<FamilyNode> ownFamilies;

    @Relationship(type = RelationshipType.PARENT_STRING, direction = Relationship.Direction.INCOMING)
    private FamilyNode parentalFamily;

    //TODO: add optimistic lock
    //@Version
    //private Long version;

}
