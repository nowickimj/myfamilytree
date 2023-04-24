package net.mnowicki.familia.model.graph.nodes;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.mnowicki.familia.model.Gender;
import net.mnowicki.familia.model.graph.base.BaseNode;
import org.springframework.data.neo4j.core.schema.Node;

import java.time.LocalDate;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@Node("Person")
public class PersonNode extends BaseNode {

    private String firstName;
    private String middleName;
    private String lastName;
    private String maidenName;
    private LocalDate dateOfBirth;
    private LocalDate dateOfDeath;
    private Gender gender;
    private String description;

}
