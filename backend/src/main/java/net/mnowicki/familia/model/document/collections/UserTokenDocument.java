package net.mnowicki.familia.model.document.collections;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("userToken")
@EqualsAndHashCode(callSuper = true)
public class UserTokenDocument extends AbstractDocument {

    @Indexed(unique=true)
    private String username;

    @Indexed(name = "jwtToken", expireAfterSeconds = 3600)
    private String jwtToken;

}
