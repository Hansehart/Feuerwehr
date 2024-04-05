package group.artifact;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.Filter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                return http
                                .addFilterBefore(requestLoggingFilter(), FilterChainProxy.class)
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/artifact-0.0.1-SNAPSHOT/api/data/**").permitAll()
                                                .anyRequest().authenticated())
                                .csrf(req -> req.disable())
                                .build();
        }

        @Bean
        public Filter requestLoggingFilter() {
                return new RequestLoggingFilter();
        }

}
