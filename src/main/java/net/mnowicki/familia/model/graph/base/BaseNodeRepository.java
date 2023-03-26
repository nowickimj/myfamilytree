package net.mnowicki.familia.model.graph.base;

import net.mnowicki.familia.exception.NodeNotFoundException;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface BaseNodeRepository<T extends BaseNode> extends Neo4jRepository<T, Long> {

    default T findOrThrow(long id) {
        return findById(id).orElseThrow(() -> new NodeNotFoundException(id));
    }

    default void deleteExistingById(long id) {
        T node = findOrThrow(id);
        delete(node);
    }

}
