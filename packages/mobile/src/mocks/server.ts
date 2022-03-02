import {setupServer} from 'msw/node';

import {handlers} from './handlers';

// To run: server.listen();
export const server = setupServer(...handlers);
