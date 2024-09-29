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
class PreviewControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void postRequestForPreviewCreation() throws Exception {
        // prepare the request body
        String jsonBody = "{\"title\": \"LF 10\", \"subtitle\": \"Löschgruppenfahrzeug\"}";
        // set the content type to JSON
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // create the HTTP entity with headers and body
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);

        // send the POST request
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(
                "http://localhost:" + port + "/api/service/save/preview",
                requestEntity,
                String.class);

        assertEquals(200, responseEntity.getStatusCode().value());
    }
}
