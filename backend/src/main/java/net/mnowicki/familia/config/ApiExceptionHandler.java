package net.mnowicki.familia.config;

import jakarta.servlet.http.HttpServletRequest;
import net.mnowicki.familia.domain.family.FamilyCreationException;
import net.mnowicki.familia.exception.NodeNotFoundException;
import net.mnowicki.familia.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler({NodeNotFoundException.class})
    public <E extends NotFoundException> ResponseEntity<ErrorApiResponse> handleNotFound(final HttpServletRequest request, final E e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(buildErrorResponse(e.getMessage(), request.getRequestURI()));
    }

    @ExceptionHandler({FamilyCreationException.class})
    public <E extends RuntimeException> ResponseEntity<ErrorApiResponse> handleBadRequest(final HttpServletRequest request, final E e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(buildErrorResponse(e.getMessage(), request.getRequestURI()));
    }

    private ErrorApiResponse buildErrorResponse(String message, String path) {
        var timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
        return new ErrorApiResponse(timestamp, message, path);
    }

}