package net.mnowicki.familia.domain;

import net.mnowicki.familia.domain.exception.FamilyCreationException;
import net.mnowicki.familia.model.graph.nodes.FamilyNode;

public class PersonUtils {

    private PersonUtils() {}

    public static void assertParentsCountLimitNotReached(FamilyNode family) {
        if (family.getParents().size() > 1) {
            throw new FamilyCreationException("Maximum number of parents already assigned to family.");
        }
    }

}
