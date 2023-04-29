package net.mnowicki.familia.model.document.collections;

import lombok.Data;
import lombok.EqualsAndHashCode;
import net.mnowicki.familia.authentication.UserRole;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Data
@Document("user")
@EqualsAndHashCode(callSuper = true)
public class UserDocument extends AbstractDocument {

    @Indexed(unique=true)
    private String username;

    @Indexed(unique=true)
    private String email;

    private String password;

    private Set<UserRole> roles;

}
