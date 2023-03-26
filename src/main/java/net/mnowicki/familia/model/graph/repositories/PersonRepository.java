package net.mnowicki.familia.model.graph.repositories;

import net.mnowicki.familia.model.graph.base.BaseNodeRepository;
import net.mnowicki.familia.model.graph.nodes.PersonNode;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends BaseNodeRepository<PersonNode> {

    @Query("MATCH (c:Person)<-[r1:CHILD]-(f:Family)<-[r2:PARENT]<-(p:Person) " +
            "WHERE ID(c) = $childId " +
            "RETURN p")
    List<PersonNode> findParents(@Param("childId") Long childId);
}
