import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import tests from './test/index.test';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
tests();