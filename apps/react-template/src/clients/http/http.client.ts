import type IHttpClient from '@monorepo/shared/http-client';

import createFetchHttpClient from '@monorepo/shared/http-client/fetch';

const httpClient: IHttpClient = createFetchHttpClient({
  baseUrl: '',
});

export default httpClient;
