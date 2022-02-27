import {TEST_ONLY_MOCK_API} from 'src/mocks/handlers';
import * as API from './index';

const mswTestResponse = {test: 'success', error: ''};

describe('API.get()', () => {
  it('should fetch JSON via HTTP GET', async () => {
    const res = await API.get(TEST_ONLY_MOCK_API);
    expect(res.status).toEqual(200);
    expect(res.data).toEqual(mswTestResponse);
  });

  it('should throw for 4xx errors', async () => {
    await expect(
      API.get(TEST_ONLY_MOCK_API, {
        headers: {'x-test-status-code': 400},
      }),
    ).rejects.toMatchObject({
      isAxiosError: true,
      response: {
        data: {test: 'statusCode'},
        status: 400,
      },
    });
  });

  it('should throw for 5xx errors', async () => {
    await expect(
      API.get(TEST_ONLY_MOCK_API, {
        headers: {'x-test-status-code': 500},
      }),
    ).rejects.toMatchObject({
      isAxiosError: true,
      response: {
        data: {test: 'statusCode'},
        status: 500,
      },
    });
  });
});

describe('API.post()', () => {
  it('should post JSON data via HTTP POST', async () => {
    const res = await API.post(TEST_ONLY_MOCK_API, null);
    expect(res.status).toEqual(201);
    expect(res.data).toEqual(mswTestResponse);
    expect(res.config.method).toEqual('post');
  });

  it('should allow sending custom Authentication headers', async () => {
    const authHeader = 'test-auth-header';

    const res = await API.post(TEST_ONLY_MOCK_API, null, {
      headers: {
        Authentication: authHeader,
      },
    });

    expect(res.status).toEqual(201);
  });
});

describe('API.put()', () => {
  it('should put JSON data via HTTP PUT', async () => {
    const res = await API.put(TEST_ONLY_MOCK_API, null);
    expect(res.status).toEqual(200);
    expect(res.data).toEqual(mswTestResponse);
    expect(res.config.method).toEqual('put');
  });
});

describe('API.patch()', () => {
  it('should patch JSON data via HTTP PATCH', async () => {
    const res = await API.patch(TEST_ONLY_MOCK_API, null);
    expect(res.status).toEqual(200);
    expect(res.data).toEqual(mswTestResponse);
    expect(res.config.method).toEqual('patch');
  });
});

describe('API.del()', () => {
  it('should delete JSON data via HTTP DELETE', async () => {
    const res = await API.del(TEST_ONLY_MOCK_API);
    expect(res.status).toEqual(200);
    expect(res.data).toEqual(mswTestResponse);
    expect(res.config.method).toEqual('delete');
  });
});
