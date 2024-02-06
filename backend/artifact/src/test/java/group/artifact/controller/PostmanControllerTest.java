package group.artifact.controller;

import static org.junit.Assert.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class PostmanControllerTest {

    @Autowired
    PostmanController postmanController;

    @Test
    void contextLoads() {
        assertNotNull(postmanController);
    }
}
