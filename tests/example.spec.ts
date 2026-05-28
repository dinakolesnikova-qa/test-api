import { test, expect } from '@playwright/test';

let authToken: string;

test.beforeAll('Run before all tests', async ({ request }) => {
  const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      "user": { "email": "dina3kolesn@gmail.com", "password": "Passw_123" }
    }
  });
  const tokenResponseJson = await loginResponse.json();
  authToken = 'Token ' + tokenResponseJson.user.token;
})

test.afterAll('Run after all tests', async () => {
  console.log("This is executed after all tests");
})

test('Get Tags', async ({ request }) => {
  const tagsResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags');
  const tagsResponseJson = await tagsResponse.json();

  expect(tagsResponse.status()).toBe(200);
  expect(tagsResponseJson.tags[0]).toEqual('Test');
  expect(tagsResponseJson.tags.length).toBe(10);

});

test('Get All Articles', async ({ request }) => {

  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0');
  const articlesResponseJson = await articlesResponse.json();


  expect(articlesResponse.status()).toBe(200);
  expect(articlesResponseJson.articles.length).toBeLessThanOrEqual(10);
  expect(articlesResponseJson.articlesCount).toEqual(10);

})

test('Create and delete Article', async ({ request }) => {


  const newArticleResponse = await request.post("https://conduit-api.bondaracademy.com/api/articles/", {
    data: {
      "article": {
        "title": "New Test From API - Playwright 8",
        "description": "This is a test article",
        "body": "One\nTwo\nThree",
        "tagList": [
          "tag1_dk"
        ]
      }
    },
    headers: {
      Authorization: authToken
    }
  })

  const newArticleResponseJson = await newArticleResponse.json();
  expect(newArticleResponse.status()).toBe(201);
  expect(newArticleResponseJson.article.title).toEqual("New Test From API - Playwright 8");

  const articleSlug = newArticleResponseJson.article.slug;

  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', {
    headers: {
      Authorization: authToken
    }
  });
  const articlesResponseJson = await articlesResponse.json();
  expect(articlesResponse.status()).toBe(200);
  expect(articlesResponseJson.articles[0].title).toEqual("New Test From API - Playwright 8");


  const deleteArticle = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${articleSlug}`, {
    headers: {
      Authorization: authToken
    }
  });

  expect(deleteArticle.status()).toBe(204);


})