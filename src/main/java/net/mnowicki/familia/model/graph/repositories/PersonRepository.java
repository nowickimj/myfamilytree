package net.mnowicki.familia.model.graph.repositories;

import net.mnowicki.familia.model.graph.base.BaseNodeRepository;
import net.mnowicki.familia.model.graph.nodes.PersonNode;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends BaseNodeRepository<PersonNode> {

}
