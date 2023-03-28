package net.mnowicki.familia.model.graph.base;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Version;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;

@Getter
@Setter
@ToString
@EqualsAndHashCode
public abstract class BaseNode {

    @Id
    @GeneratedValue
    protected Long id;

    public String idAsString() {
        return id.toString();
    }

    @Version
    protected long version;
}