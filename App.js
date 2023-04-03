import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { MyButton, Spotify } from './components';

import tokenReducer from './store/reducers/token';
import songReducer from './store/reducers/topSongs';
import { useEffect } from 'react';

const rootReducer = combineReducers({
    token: tokenReducer,
    topSongs: songReducer,
});

const store = createStore(rootReducer);

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Spotify />
                <StatusBar style="auto" />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
