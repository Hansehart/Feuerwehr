package group.artifact;

import static org.junit.Assert.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import group.artifact.controller.PostmanController;

@SpringBootTest
class FFLernAppApplicationTest {

    @Autowired
    PostmanController postmanController;

    // sanity check for running application
    @Test
    void contextLoads() {
        assertNotNull(postmanController);
    }
}
