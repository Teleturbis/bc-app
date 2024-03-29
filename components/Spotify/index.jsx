import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import { Button, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import * as tokenAction from '../../store/actions/token';
import * as songAction from '../../store/actions/topSongs';

const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function LoginScreen() {
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: 'dddfee2bb3974d6685977915f7d36970',
            scopes: [
                'user-read-currently-playing',
                'user-read-recently-played',
                'user-read-playback-state',
                'user-top-read',
                'user-modify-playback-state',
                'streaming',
                'user-read-email',
                'user-read-private',
            ],
            // In order to follow the "Authorization Code Flow"
            // to fetch token after authorizationEndpoint
            // this must be set to false
            usePKCE: false,
            redirectUri: 'exp://192.168.178.192:19000',
        },
        discovery
    );
    useEffect(() => {
        if (response?.type === 'success') {
            const { access_token } = response.params;
            setToken(access_token);
        }
    }, [response]);
    useEffect(() => {
        if (token) {
            axios(
                'https://api.spotify.com/v1/me/top/tracks?time_range=short_term',
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                }
            )
                .then((response) => {
                    dispatch(songAction.addTopSongs(response));
                })
                .catch((error) => {
                    console.log('error', error.message);
                });
            setTimeout(() => console.log(token), 500);
            dispatch(tokenAction.addToken(token));
        }
    });
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text
                style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '20%',
                }}
            >
                top song player
            </Text>
            <Button
                title="Login with Spotify"
                style={styles.button}
                onPress={() => {
                    promptAsync();
                }}
            />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    button: {
        width: 200,
        marginTop: 50,
    },
});
