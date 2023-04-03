package net.mnowicki.familia.domain.tree;

import net.mnowicki.familia.domain.tree.dto.FamilyTreeNodeDto;
import net.mnowicki.familia.domain.tree.dto.FamilyTreeRootDto;
import net.mnowicki.familia.model.graph.GraphDao;
import net.mnowicki.familia.model.graph.projections.FamilyTreeNodeProjection;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TreeService {

    private final GraphDao graphDao;

    public TreeService(GraphDao graphDao) {
        this.graphDao = graphDao;
    }

    public Set<FamilyTreeRootDto> getFamilyTreeRoots() {
        return graphDao.findTreeRoots().stream().map(result -> FamilyTreeRootDto.builder()
                        .id(result.id())
                        .firstName(result.firstName())
                        .lastName(result.lastName())
                        .build())
                .collect(Collectors.toSet());
    }

    public Set<FamilyTreeNodeDto> getFamilyTreeNodes() {
        return graphDao.getFamilyTreeNodes()
                .stream()
                .map(result -> FamilyTreeNodeDto.builder()
                        .id(result.id())
                        .gender(result.gender())
                        .parents(mapRelationDto(result.parents(), FamilyTreeNodeDto.RelativeType.BLOOD))
                        .children(mapRelationDto(result.children(), FamilyTreeNodeDto.RelativeType.BLOOD))
                        .siblings(mapRelationDto(result.siblings(), FamilyTreeNodeDto.RelativeType.BLOOD))
                        .spouses(mapRelationDto(result.spouses(), FamilyTreeNodeDto.RelativeType.MARRIED))
                        .build())
                .collect(Collectors.toSet());
    }

    private Set<FamilyTreeNodeDto.RelationDto> mapRelationDto(Set<FamilyTreeNodeProjection.Relation> relationProjections, FamilyTreeNodeDto.RelativeType type) {
        return relationProjections.stream().map(projection -> FamilyTreeNodeDto.RelationDto.builder()
                        .id(projection.id())
                        .type(type)
                        .build())
                .collect(Collectors.toSet());
    }
}
