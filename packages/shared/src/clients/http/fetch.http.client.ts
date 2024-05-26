import type { RequestOptions } from './http.client.interface';
import type IHttpClient from './http.client.interface';

import urlcat from 'urlcat';

export type FetchHttpClientOptions = {
  baseUrl: string;
};

export default function createFetchHttpClient(options: FetchHttpClientOptions): IHttpClient {
  const { baseUrl } = options;

  async function DELETE<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    return fetch(urlcat(baseUrl, url, searchParams), {
      headers,
      method: 'DELETE',
      ...(signal ? { signal } : {}),
    }).then((resp) => resp.json());
  }

  async function GET<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    return fetch(urlcat(baseUrl, url, searchParams), {
      headers,
      method: 'GET',
      ...(signal ? { signal } : {}),
    }).then((resp) => resp.json());
  }

  async function PATCH<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] ?? 'multipart/form-data';

      return fetch(urlcat(baseUrl, url, searchParams), {
        body,
        headers,
        method: 'PATCH',

        ...(signal ? { signal } : {}),
      }).then((resp) => resp.json());
    }

    headers['Content-Type'] = headers['Content-Type'] ?? 'application/json';

    return fetch(urlcat(baseUrl, url, searchParams), {
      body: JSON.stringify(json),
      headers,
      method: 'PATCH',
      ...(signal ? { signal } : {}),
    }).then((resp) => resp.json());
  }

  async function POST<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] ?? 'multipart/form-data';

      return fetch(urlcat(baseUrl, url, searchParams), {
        body,
        headers,
        method: 'POST',

        ...(signal ? { signal } : {}),
      }).then((resp) => resp.json());
    }

    headers['Content-Type'] = headers['Content-Type'] ?? 'application/json';

    return fetch(urlcat(baseUrl, url, searchParams), {
      body: JSON.stringify(json),
      headers,
      method: 'POST',
      ...(signal ? { signal } : {}),
    }).then((resp) => resp.json());
  }

  async function PUT<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] ?? 'multipart/form-data';

      return fetch(urlcat(baseUrl, url, searchParams), {
        body,
        headers,
        method: 'PUT',

        ...(signal ? { signal } : {}),
      }).then((resp) => resp.json());
    }

    headers['Content-Type'] = headers['Content-Type'] ?? 'application/json';

    return fetch(urlcat(baseUrl, url, searchParams), {
      body: JSON.stringify(json),
      headers,
      method: 'PUT',
      ...(signal ? { signal } : {}),
    }).then((resp) => resp.json());
  }

  return {
    delete: DELETE,
    get: GET,
    patch: PATCH,
    post: POST,
    put: PUT,
  };
}
