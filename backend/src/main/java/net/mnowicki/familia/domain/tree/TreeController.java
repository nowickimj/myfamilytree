package net.mnowicki.familia.domain.tree;

import net.mnowicki.familia.domain.tree.dto.FamilyTreeNodeDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/tree")
public class TreeController {

    private final TreeService treeService;

    public TreeController(TreeService treeService) {
        this.treeService = treeService;
    }

    @RequestMapping()
    public Set<FamilyTreeNodeDto> getNodes() {
        return treeService.getFamilyTreeNodes();
    }
}
