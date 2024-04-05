package group.artifact.controller;

import static org.junit.Assert.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class PostmanControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    /*
    @Test
    void postRequestForImageCreation() throws Exception {
        // prepare the request body
        String jsonBody = "{\"path\": \"/path/to/image.jpg\", \"width\": 800, \"height\": 600}";

        // set the content type to JSON
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // create the HTTP entity with headers and body
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);

        // send the POST request
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(
                "http://localhost:" + port + "/postman/image",
                requestEntity,
                String.class);

        assertEquals(200, responseEntity.getStatusCode().value());
    }
     */
}
