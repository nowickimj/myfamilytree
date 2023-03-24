package net.mnowicki.familia.model.graph.repositories;

import net.mnowicki.familia.model.graph.nodes.FamilyNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilyRepository extends Neo4jRepository<FamilyNode, Long> {
}
