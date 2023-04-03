package net.mnowicki.familia.model.document.collections;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("configuration")
@EqualsAndHashCode(callSuper = true)
public class ConfigurationDocument extends AbstractDocument {

    @Indexed(unique=true)
    private String name;

    private Long currentRootId;
}
