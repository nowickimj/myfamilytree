package net.mnowicki.familia.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Gender {
    MALE(0),
    FEMALE(1);

    private int jsonValue;

    Gender(int jsonValue) {
        this.jsonValue = jsonValue;
    }

    @JsonValue
    public int getJsonValue() {
        return jsonValue;
    }
}
