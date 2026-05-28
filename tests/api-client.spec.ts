import { test } from '../utils/fixtures-api-client';

test('first api test', async ({ apiClient}) => {
    apiClient
        .url('https://conduit-api.bondaracademy.com/api')
        .path('/articles')
        .query({ limit: 10, offset: 0 })
        .headers({ Authorization: 'Token 12345' })
        .body({ article: { title: 'Test Article' } });
})