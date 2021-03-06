import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist-immutable';
import { TextInput } from 'react-native';
import { StyleSheet } from './Theme';
import persistConfig from './Stores/persistConfig';
import ConfigureStore from './Stores/ConfigureStore';
import RootScreen from './Containers/Root';
import COLORS from './Theme/Colors';
import './Utils/disableWarning'; // Disable yellow box warnings
import './Theme/CustomTheme';


// set cursor color
TextInput.defaultProps.selectionColor = COLORS.primary;

// Create redux store with history
const initialState = {};
const store = ConfigureStore(initialState);
StyleSheet.build(); // you can add global style variables here

export default class App extends Component {
  state = {
    persisted: false,
  };

  renderApp = () => {
    const { persisted } = this.state;

    const app = (
      <Provider store={store}>
        <RootScreen />
      </Provider>
    );

    if (!persisted) {
      console.log('PERSISTING STORE. . .');
      persistStore(store, persistConfig, () => {
        this.setState({ persisted: true });
      });
      return null;
    }

    return app;
  };

  render() {
    return this.renderApp();
  }
}
