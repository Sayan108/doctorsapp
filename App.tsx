/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Routes from './src/routes';
import { AxiosInterceptor } from './src/services/api.cilents';
function App(): React.JSX.Element {
  return (
    <AxiosInterceptor>
      <Routes />
    </AxiosInterceptor>
  );
}

export default App;
