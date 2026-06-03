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
    // expect(tagsResponseJson).toHaveProperty('tags'); // check if the response has a property 'tags'
    // expect(Array.isArray(tagsResponseJson.tags)).toBe(true); // check if the 'tags' property is an array
    // expect(tagsResponseJson.tags.length).toBeGreaterThan(0); // check if the 'tags' array is not empty
    // expect(tagsResponseJson.tags.length).toBeLessThanOrEqual(10); // check if the 'tags' array has at most 10 tags
    // expect(tagsResponseJson.tags).toContain('YouTube'); // check if the 'tags' array contains the tag 'YouTube'
    // expect(tagsResponseJson.tags[0]).toBe('Test'); // check if the first tag in the 'tags' array is 'Test'
    // I want to check if all array elements are strings, so I can use the every() method of the array to check if all elements are strings
    expect(tagsResponseJson.tags.every((element: any) => typeof element === 'string')).toBe(true); // check if all elements in the 'tags' array are strings

});

test('Get Articles', async ({ request }) => {

    // Arrange - nothing in this test, we just need to send a GET request to the API endpoint for articles, so no setup is required

    // Act - send GET request to the API endpoint for articles
    const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0');
    const articlesResponseJson = await articlesResponse.json(); // should be an object with a property 'articles' which is an array of articles
    
    // Assert 
    expect(articlesResponse.status()).toBe(200); // check if the status code is 200
    expect(articlesResponseJson).toHaveProperty('articles'); // check if the response has a property 'articles'
    expect(Array.isArray(articlesResponseJson.articles)).toBe(true); // check if the 'articles' property is an array
    expect(articlesResponseJson.articles.length).toBeGreaterThan(0); // check if the 'articles' array is not empty
    expect(articlesResponseJson.articles.length).toBeLessThanOrEqual(10); // check if the 'articles' array has at most 10 articles


});

    //Arrange - nothing in this test, we just need to send a GET request to the API endpoint for articles, so no setup is required

