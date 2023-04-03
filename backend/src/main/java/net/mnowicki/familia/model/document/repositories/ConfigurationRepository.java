package net.mnowicki.familia.model.document.repositories;

import net.mnowicki.familia.model.document.collections.ConfigurationDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfigurationRepository extends MongoRepository<ConfigurationDocument, String> {

    ConfigurationDocument findOneByName(String name);
}
