import {setupServer} from 'msw/native';

import {handlers} from './handlers';

// Note: This version of the server setup is using msw/native and we can use it to
// mock in a non-test environment
// To do it we only have to run this setup function in src/App.tsx

// To run: nativeServer.listen();
export default setupServer(...handlers);
