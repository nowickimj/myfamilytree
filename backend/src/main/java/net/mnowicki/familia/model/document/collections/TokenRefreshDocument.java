package net.mnowicki.familia.model.document.collections;

import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document("tokenRefresh")
public class TokenRefreshDocument extends AbstractDocument {

    public TokenRefreshDocument(String email) {
        this.email = email;
    }

    @Indexed(unique = true, name = "email")
    private String email;

    private String token;

    private LocalDateTime expiryDate;

    private int accessTokenRefreshCount = 0;

    public void incrementRefreshCount() {
        this.accessTokenRefreshCount++;
    }

}
