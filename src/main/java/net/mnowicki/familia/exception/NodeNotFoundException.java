package net.mnowicki.familia.exception;

public class NodeNotFoundException extends NotFoundException {
    public NodeNotFoundException(Long id) {
        super("Node with id %s does not exists.", id.toString());
    }
}
