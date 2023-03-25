package net.mnowicki.familia.model.graph.repositories;

import net.mnowicki.familia.exception.NodeNotFoundException;
import net.mnowicki.familia.model.graph.nodes.PersonNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends Neo4jRepository<PersonNode, Long> {

    default PersonNode findOrThrow(long id) {
        return findById(id).orElseThrow(() -> new NodeNotFoundException(id));
    }

    @Query("OPTIONAL MATCH (p:Person)--(f:Family)--(c:Person) " +
            "WHERE ID(p) = $parentId AND ID(c) = $childId " +
            "RETURN f IS NOT NULL AS Predicate")
    boolean hasRelationship(@Param("parentId") long parentId, @Param("childId") Long childId);

    @Query("MATCH (p:Person)-[r1:PARENT]->(f:Family)-[r2:CHILD]->(c:Person) " +
            "WHERE ID(p) = $parentId AND ID(c) = $childId " +
            "RETURN f IS NOT NULL AS Predicate")
    boolean isParent(@Param("parentId") long parentId, @Param("childId") Long childId);
}
