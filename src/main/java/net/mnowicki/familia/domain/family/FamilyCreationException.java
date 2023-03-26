package net.mnowicki.familia.domain.family;

public class FamilyCreationException extends RuntimeException {
    public FamilyCreationException(String message, String... values) {
        super(String.format(message, (Object[]) values));
    }

}
