import Axios, {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import _get from 'lodash/get';
import {BASE_API_URL} from '@rn-testing-class/lib/config/mobile';

interface DefaultErrorResponse {
  error?: string;
  error_description?: string;
}

interface DefaultErrorResponse {
  code?: string;
  message?: string;
}

type ErrorCodes = any;

export type APIError<T = DefaultErrorResponse> = AxiosError<T>;
export type APIResponse<T> = AxiosResponse<T>;
export type APIPromise<T> = AxiosPromise<T>;

/* istanbul ignore next */
export const getAPIErrorCode = (error: APIError): ErrorCodes | undefined =>
  _get(error, 'response.data.error');

// Cycles through the typical API error properties to find the message
/* istanbul ignore next */
export const getAPIErrorMessage = (error: APIError): string | undefined => {
  return _get(
    error,
    'response.data.error_description',
    _get(error, 'response.data.message'),
  );
};

export const getClient = async (config: AxiosRequestConfig) => {
  const axios = Axios.create({
    headers: {},
    baseURL: BASE_API_URL,
    timeout: 30000,
  });

  return axios(config);
};

export const get = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): AxiosPromise<T> => getClient({url, method: 'get', ...config});

/**
 * Fetch plain text from a URL
 */
/* istanbul ignore next */
export const getText = <T = string>(
  url: string,
  config?: AxiosRequestConfig,
): AxiosPromise<T> => {
  if (!url) throw new Error('No URL providecd to getText()');
  return getClient({
    url,
    method: 'get',
    headers: {
      'Content-Type': 'text/plain',
    },
    ...config,
  });
};

export const patch = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): AxiosPromise<T> =>
  getClient({
    url,
    data,
    method: 'patch',
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
    ...config,
  });

export const post = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): AxiosPromise<T> => getClient({url, data, method: 'post', ...config});

export const put = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): AxiosPromise<T> => getClient({url, data, method: 'put', ...config});

export const del = <T = unknown>(
  url: string,
  data?: unknown,
): AxiosPromise<T> => getClient({url, data, method: 'delete'});
