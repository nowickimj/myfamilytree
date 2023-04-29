package net.mnowicki.familia.model.document.repositories;

import net.mnowicki.familia.model.document.collections.TokenRefreshDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TokenRefreshRepository extends MongoRepository<TokenRefreshDocument, String> {

    Optional<TokenRefreshDocument> findByEmail(String email);
}
