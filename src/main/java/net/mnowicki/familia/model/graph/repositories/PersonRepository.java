package net.mnowicki.familia.model.graph.repositories;

import net.mnowicki.familia.model.graph.nodes.PersonNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends Neo4jRepository<PersonNode, Long> {
}
