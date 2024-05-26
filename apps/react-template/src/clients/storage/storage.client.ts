import type IStorageClient from '@monorepo/shared/storage-client';

import createIndexedDBClient from '@monorepo/shared/storage-client/indexed-db';

import envConfig from '../../configs/env/env.config';

const storageClient: IStorageClient = createIndexedDBClient({
  name: envConfig.appPrefix,
});

export default storageClient;
