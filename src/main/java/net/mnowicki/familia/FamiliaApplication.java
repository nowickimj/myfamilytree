package net.mnowicki.familia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;

@EnableNeo4jRepositories(basePackages = "net.mnowicki.familia.model.graph.repositories")
@SpringBootApplication
public class FamiliaApplication {

	public static void main(String[] args) {
		SpringApplication.run(FamiliaApplication.class, args);
	}

}
