package net.mnowicki.familia.model.graph.repositories;

import net.mnowicki.familia.model.graph.nodes.FamilyNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FamilyRepository extends Neo4jRepository<FamilyNode, Long> {

    @Query("OPTIONAL MATCH (p1:Person)--(f:Family)--(p2:Person) " +
            "WHERE ID(p1) = $personId1 AND ID(p2) = $personId2 " +
            "RETURN f")
    Optional<FamilyNode> findBetween(@Param("personId1") long personId1, @Param("personId2") Long personId2);
}
