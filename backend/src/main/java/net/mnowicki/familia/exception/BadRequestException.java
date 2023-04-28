package net.mnowicki.familia.exception;

public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, String... values) {
        super(String.format(message, (Object[]) values));
    }

}
