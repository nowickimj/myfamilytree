package net.mnowicki.familia.domain;

import lombok.Getter;
import net.mnowicki.familia.model.document.repositories.ConfigurationRepository;
import org.springframework.stereotype.Component;

@Component
public class ConfigurationService {

    private final ConfigurationRepository configurationRepository;

    public ConfigurationService(ConfigurationRepository configurationRepository) {
        this.configurationRepository = configurationRepository;
    }

    public TreeConfiguration getTreeConfiguration() {
        var result = configurationRepository.findOneByName(ConfigurationEntities.TREE.getName());
        return new TreeConfiguration(result.getCurrentRootId());
    }

    public void updateTreeConfiguration(TreeConfiguration treeConfiguration) {
        var result = configurationRepository.findOneByName(ConfigurationEntities.TREE.getName());
        result.setCurrentRootId(treeConfiguration.currentRootId());

        configurationRepository.save(result);
    }

    protected enum ConfigurationEntities {
        TREE("tree");

        @Getter
        private String name;

        ConfigurationEntities(String name) {
            this.name = name;
        }
    }
}
