package net.mnowicki.familia.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum RelationshipType {

    PARENT(RelationshipType.PARENT_STRING),
    CHILD(RelationshipType.CHILD_STRING);

    private String jsonValue;

    RelationshipType(String jsonValue) {
        this.jsonValue = jsonValue;
    }

    @JsonValue
    public String getJsonValue() {
        return jsonValue;
    }

    public static final String PARENT_STRING = "PARENT";
    public static final String CHILD_STRING = "CHILD";
    public static final String PARTNER_STRING = "PARTNER";
}
