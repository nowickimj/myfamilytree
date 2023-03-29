package net.mnowicki.familia.model.graph.repositories;

import net.mnowicki.familia.model.graph.base.BaseNodeRepository;
import net.mnowicki.familia.model.graph.nodes.FamilyNode;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FamilyRepository extends BaseNodeRepository<FamilyNode> {

    @Query("MATCH (p1:Person)--(f:Family)--(p2:Person) " +
            "WHERE ID(p1) = $personId1 AND ID(p2) = $personId2 " +
            "RETURN f")
    Optional<FamilyNode> findContaining(@Param("personId1") long personId1, @Param("personId2") Long personId2);

    @Query("MATCH (p:Person)-[r:PARENT]->(f:Family) " +
            "WHERE ID(p) = $personId " +
            "RETURN f")
    Optional<FamilyNode> findDescendingFamily(@Param("personId") long personId);

    @Query("MATCH (p:Person)<-[r1:CHILD]-(f:Family) " +
            "WHERE ID(p) = $personId " +
            "RETURN f LIMIT 1")
    Optional<FamilyNode> findAscendingFamily(@Param("personId") long personId);

    @Query("MATCH (p1:Person)-[r1:PARENT]->(f:Family)<-[r2:PARENT]-(p2:Person) " +
            "WHERE ID(p1) = $personId1 AND ID(p2) = $personId2 " +
            "RETURN f")
    Optional<FamilyNode> findPartnersFamily(@Param("personId1") long personId1, @Param("personId2") Long personId2);

    @Query("OPTIONAL MATCH (p1:Person)--(f:Family)--(p2:Person) " +
            "WHERE ID(p1) = $personId1 AND ID(p2) = $personId2 " +
            "RETURN f IS NOT NULL AS Predicate")
    boolean hasFamilyWith(@Param("personId1") long personId1, @Param("personId2") Long personId2);
}
