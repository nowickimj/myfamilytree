package net.mnowicki.familia.domain.exception;

public class PersonDeletionException extends BadRequestException {

    public PersonDeletionException(long personId, String message) {
        super(String.format("Couldn't delete person with id %d, reason: %s", personId, message));
    }

}
