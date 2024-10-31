/**
 * @format
 */
import {store, persistor} from './src/redux';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ActivityIndicator, PaperProvider, Text} from 'react-native-paper';
import {theme} from './src/theme/theme';
import {AxiosInterceptor} from './src/services/api.cilents';

const RNRedux = () => (
  <PaperProvider theme={theme}>
    <Provider store={store}>
      <PersistGate
        loading={
          <ActivityIndicator
            size="large"
            style={{marginTop: '65%', marginHorizontal: 10}}
          />
        }
        persistor={persistor}>
        <AxiosInterceptor>
          <App />
        </AxiosInterceptor>
      </PersistGate>
    </Provider>
  </PaperProvider>
);
AppRegistry.registerComponent(appName, () => RNRedux);
