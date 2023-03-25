package net.mnowicki.familia.exception;

public class NodeNotFoundException extends RuntimeException {
    public NodeNotFoundException(long id) {
        super(String.format("Node with id %d does not exists.", id));
    }
}
