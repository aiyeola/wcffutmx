import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import App2 from './NewApp';
import configureStore from './redux/store';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import * as serviceWorker from "./serviceWorker";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App2 />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     const NextApp = require('./NewApp').default;
//     ReactDOM.render(
//       <Provider store={store}>
//         <NextApp />
//       </Provider>,
//       document.getElementById('root')
//     );
//   });

//   module.hot.accept('./redux/reducers', () => {
//     const nextRootReducer = require('./redux/reducers').default;
//     store.replaceReducer(nextRootReducer);
//   });
// }

if (module.hot) {
  module.hot.accept();
}

// serviceWorker.registerServiceWorker()
