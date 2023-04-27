package net.mnowicki.familia.model.graph.repositories;

import net.mnowicki.familia.model.graph.base.BaseNodeRepository;
import net.mnowicki.familia.model.graph.nodes.FamilyNode;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface FamilyRepository extends BaseNodeRepository<FamilyNode> {

//    @Query("MATCH (p1:Person)--(f:Family)--(p2:Person) " +
//            "WHERE ID(p1) = $personId1 AND ID(p2) = $personId2 " +
//            "RETURN f")
//    Optional<FamilyNode> findContaining(@Param("personId1") long personId1, @Param("personId2") Long personId2);

    @Query("""
            MATCH (p:Person)-[r:PARENT]->(f:Family) WHERE ID(p) = $personId
            OPTIONAL MATCH (f)<-[r1:PARENT]-(p1:Person)
            OPTIONAL MATCH (f)-[r2:CHILD]->(p2:Person)
            RETURN f, COLLECT(r1), COLLECT(p1) as parents,
            COLLECT(r2), COLLECT(p2) as children
            """)
    Set<FamilyNode> findDescendingFamilies(@Param("personId") long personId);

    @Query("""
            MATCH (p:Person)<-[r:CHILD]-(f:Family) WHERE ID(p) = 9
            OPTIONAL MATCH (f)-[r1:CHILD]->(p1:Person)
            OPTIONAL MATCH (f)<-[r2:PARENT]-(p2:Person)
            RETURN f, COLLECT(r1), COLLECT(p1) as children,
            COLLECT(r2), COLLECT(p2) as parents
            """)
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
