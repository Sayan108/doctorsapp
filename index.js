/**
 * @format
 */
import {store, persistor} from './src/redux';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {PaperProvider, Text} from 'react-native-paper';
import {theme} from './src/theme/theme';

const RNRedux = () => (
  <PaperProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </PaperProvider>
);
AppRegistry.registerComponent(appName, () => RNRedux);
