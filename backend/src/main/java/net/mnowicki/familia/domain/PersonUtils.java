package net.mnowicki.familia.domain;

import net.mnowicki.familia.exception.BadRequestException;
import net.mnowicki.familia.model.graph.nodes.FamilyNode;

public class PersonUtils {

    private PersonUtils() {}

    public static void assertParentsCountLimitNotReached(FamilyNode family) {
        if (family.getParents().size() > 1) {
            throw new BadRequestException("Maximum number of parents already assigned to family.");
        }
    }

}
