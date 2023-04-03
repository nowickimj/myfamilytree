package net.mnowicki.familia.model.document.collections;

import org.springframework.data.mongodb.core.mapping.MongoId;

public abstract class AbstractDocument {

    @MongoId
    private String id;
}
