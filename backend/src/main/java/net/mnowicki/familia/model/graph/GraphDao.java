package net.mnowicki.familia.model.graph;

import net.mnowicki.familia.model.Gender;
import net.mnowicki.familia.model.graph.projections.FamilyTreeNodeProjection;
import org.neo4j.driver.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class GraphDao {

    @Autowired
    Neo4jClient neo4jClient;

    public Set<FamilyTreeNodeProjection> getFamilyTreeNodes() {
        var queryResults = neo4jClient.query("""
                        MATCH (n:Person)
                        OPTIONAL MATCH (n)<-[:CHILD]-(pf:Family)<-[:PARENT]-(parent:Person)
                        OPTIONAL MATCH (n)-[:PARENT]->(cf:Family)-[:CHILD]->(child:Person)
                        OPTIONAL MATCH (pf)-[:CHILD]->(sb:Person)
                            WHERE ID(sb)<>ID(n)
                        OPTIONAL MATCH (cf)<-[:PARENT]-(sp:Person)
                            WHERE ID(sp)<>ID(n)
                        RETURN ID(n) as id,
                         n.gender as gender,
                         collect(distinct ID(parent)) AS parents,
                         collect(distinct ID(child)) AS children,
                         collect(distinct ID(sb)) AS siblings,
                         collect(distinct ID(sp)) AS spouses
                        """)
                .fetchAs(FamilyTreeNodeProjection.class)
                .mappedBy((typesystem, record) -> FamilyTreeNodeProjection.builder()
                        .id(Long.toString(record.get("id").asLong()))
                        .gender(Gender.valueOf(record.get("gender").asString()))
                        .children(recordToRelationSet(record, "children"))
                        .parents(recordToRelationSet(record, "parents"))
                        .siblings(recordToRelationSet(record, "siblings"))
                        .spouses(recordToRelationSet(record, "spouses"))
                        .build())
                .all();

        return new HashSet<>(queryResults);
    }

    private static Set<FamilyTreeNodeProjection.Relation> recordToRelationSet(org.neo4j.driver.Record record, String listName) {
        return record.get(listName).asList(Value::asLong).stream()
                .map(Object::toString)
                .map(FamilyTreeNodeProjection.Relation::new)
                .collect(Collectors.toSet());
    }


}
