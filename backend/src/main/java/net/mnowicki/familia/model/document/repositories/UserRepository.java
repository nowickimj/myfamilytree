package net.mnowicki.familia.model.document.repositories;

import net.mnowicki.familia.model.document.collections.UserDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserDocument, String> {

    Optional<UserDocument> findByEmail(String email);

}
