import {test, expect} from '@playwright/test';

test('Get Tags', async ({ request }) => {

    //Arrange - nothing in this test, we just need to send a GET request to the API endpoint for tags, so no setup is required

    //Act - send GET request to the API endpoint for tags
    const tagsResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags'); 
    // should be deserialized to JSON with json() method
    const tagsResponseJson = await tagsResponse.json(); // should be an array of tags
    //console.log(tagsResponseJson); //see in console the tags array

    //Assert - check if the response status is 200 OK
    expect(tagsResponse.status()).toBe(200); // check if the status code is 200
    //also don't forget to check if it really works and use a quick test as toBe(201) to see the test fail and then change it back to 200 to see it pass
    expect(tagsResponseJson).toHaveProperty('tags'); // check if the response has a property 'tags'
    expect(Array.isArray(tagsResponseJson.tags)).toBe(true); // check if the 'tags' property is an array
    expect(tagsResponseJson.tags.length).toBeGreaterThan(0); // check if the 'tags' array is not empty
    expect(tagsResponseJson.tags.length).toBeLessThanOrEqual(10); // check if the 'tags' array has at most 10 tags
    expect(tagsResponseJson.tags).toContain('YouTube'); // check if the 'tags' array contains the tag 'YouTube'
    expect(tagsResponseJson.tags[0]).toBe('Test'); // check if the first tag in the 'tags' array is 'Test'
    





});

