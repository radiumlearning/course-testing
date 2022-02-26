import React from 'react';
import {Button as LibButton} from '@rn-testing-class/lib/components/button';

import {Text} from '@radium/core.uiweb.text';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          <Text>React native Text</Text>
          <LibButton>Workspace Button</LibButton>
        </a>
      </header>
    </div>
  );
};

export default App;
