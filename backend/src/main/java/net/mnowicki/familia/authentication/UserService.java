package net.mnowicki.familia.authentication;

import net.mnowicki.familia.model.document.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).map(user -> User.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .enabled(true)
                .authorities(user.getRoles())
                .build()).orElseThrow(() -> new UsernameNotFoundException(String.format("User %s not found", email)));
    }

}
