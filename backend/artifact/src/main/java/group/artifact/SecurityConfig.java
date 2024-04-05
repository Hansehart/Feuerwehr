package group.artifact;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        /*
         * allowed paths: none
         * except: /delete/*
         * 
         * rules: csrf disable
         */
        protected void configure(HttpSecurity http) throws Exception {
                http.authorizeRequests()
                                .antMatchers("/delete/**").permitAll()
                                .anyRequest().authenticated()
                                .and()
                                .httpBasic().and()
                                .csrf().disable();
        }

}
