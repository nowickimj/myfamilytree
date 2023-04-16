package net.mnowicki.familia.model.graph;

import net.mnowicki.familia.model.Gender;
import net.mnowicki.familia.model.graph.projections.FamilyTreeNodeProjection;
import net.mnowicki.familia.model.graph.projections.FamilyTreeRootProjection;
import org.neo4j.driver.Value;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class GraphDao {

    private final Neo4jClient neo4jClient;

    public GraphDao(Neo4jClient neo4jClient) {
        this.neo4jClient = neo4jClient;
    }

    public Set<FamilyTreeRootProjection> findTreeRoots() {
        var queryResults = neo4jClient.query("""
                        MATCH (p:Person)
                            WHERE NOT EXISTS((p)<-[:CHILD]-(:Family))
                            return ID(p) AS id, p.firstName AS firstName, p.lastName AS lastName
                        """)
                .fetchAs(FamilyTreeRootProjection.class)
                .mappedBy(((typeSystem, record) -> FamilyTreeRootProjection.builder()
                        .id(Long.toString(record.get("id").asLong()))
                        .firstName(getNullableStringValue(record, "firstName"))
                        .lastName(getNullableStringValue(record, "lastName"))
                        .build()))
                .all();

        return new HashSet<>(queryResults);
    }

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
                         n.firstName as firstName,
                         n.middleName as middleName,
                         n.lastName as lastName,
                         n.dateOfBirth as dateOfBirth,
                         n.dateOfDeath as dateOfDeath,
                         collect(distinct ID(parent)) AS parents,
                         collect(distinct ID(child)) AS children,
                         collect(distinct ID(sb)) AS siblings,
                         collect(distinct ID(sp)) AS spouses
                        """)
                .fetchAs(FamilyTreeNodeProjection.class)
                .mappedBy((typesystem, record) -> FamilyTreeNodeProjection.builder()
                        .id(Long.toString(record.get("id").asLong()))
                        .gender(Gender.valueOf(record.get("gender").asString()))
                        .firstName(getNullableStringValue(record, "firstName"))
                        .middleName(getNullableStringValue(record, "middleName"))
                        .lastName(getNullableStringValue(record, "lastName"))
                        .dateOfBirth(getNullableDateValue(record, "dateOfBirth"))
                        .dateOfDeath(getNullableDateValue(record, "dateOfDeath"))
                        .children(recordToRelationSet(record, "children"))
                        .parents(recordToRelationSet(record, "parents"))
                        .siblings(recordToRelationSet(record, "siblings"))
                        .spouses(recordToRelationSet(record, "spouses"))
                        .build())
                .all();

        return new HashSet<>(queryResults);
    }

    private Set<FamilyTreeNodeProjection.Relation> recordToRelationSet(org.neo4j.driver.Record record, String listName) {
        return record.get(listName).asList(Value::asLong).stream()
                .map(Object::toString)
                .map(FamilyTreeNodeProjection.Relation::new)
                .collect(Collectors.toSet());
    }

    private String getNullableStringValue(org.neo4j.driver.Record record, String propertyName) {
        return Optional.ofNullable(record.get(propertyName))
                .filter(value -> !value.isNull())
                .map(Value::asString)
                .orElse(null);
    }

    private LocalDate getNullableDateValue(org.neo4j.driver.Record record, String propertyName) {
        return Optional.ofNullable(record.get(propertyName))
                .filter(value -> !value.isNull())
                .map(Value::asLocalDate)
                .orElse(null);
    }
}
