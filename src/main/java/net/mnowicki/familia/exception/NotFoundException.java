package net.mnowicki.familia.exception;

import lombok.Getter;

public class NotFoundException extends RuntimeException {

    private static final String DEFAULT_MESSAGE = "Resource with id %s does not exist.";

    @Getter
    String id;

    public NotFoundException(String id) {
        super(String.format(DEFAULT_MESSAGE, id));
        this.id = id;
    }

    public NotFoundException(String message, String id) {
        super(String.format(message, id));
        this.id = id;
    }

}
