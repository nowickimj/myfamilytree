package net.mnowicki.familia.model.graph.nodes;

import lombok.Builder;
import lombok.Data;
import net.mnowicki.familia.model.Gender;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.time.LocalDate;

@Data
@Builder
@Node
public class PersonNode {

    @Id
    @GeneratedValue
    private Long id;

    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private LocalDate dateOfDeath;
    private Gender gender;

}
