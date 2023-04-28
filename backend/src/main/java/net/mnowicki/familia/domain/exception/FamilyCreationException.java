package net.mnowicki.familia.domain.exception;

public class FamilyCreationException extends BadRequestException {

    public FamilyCreationException(String message, String... values) {
        super(String.format(message, (Object[]) values));
    }

}
