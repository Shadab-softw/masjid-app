/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {BASE_URL} from '../config';
import {createAction,RegisterAction} from '../util/createAction';
import {sleep} from '../util/sleep';
import CONSTANT from '../constants';
import {useDispatch} from 'react-redux';
import {loginAction} from '../screen/Login/action';
import {SignApi} from '../services/Auth';
import Snackbar from 'react-native-snackbar';

export function useAuth() {
    const [state, dispatch] = React.useReducer(
        (state, action) => {
            switch (action.type) {
                case 'SET_USER':
                    return {
                        ...state,
                        user: {...action.payload},
                    };
                case 'REMOVE_USER':
                    return {
                        ...state,
                        user: undefined,
                    };
                case 'SET_LOADING':
                    return {
                        ...state,
                        loading: action.payload,
                    };
                    case 'REGISTER_USET':{
                        return {
                            ...state,
                            assignUser:{...action.payload},
                        };
                    }
                default:
                    return state;
            }
        },
        {
            user: undefined,
            loading: true,
        },
    );

    const auth = React.useMemo(
        () => ({
            login: async (username, password, fcm_token) => {
                // console.log('hhh', username, password);
                var data = {
                    username,
                    password,
                    fcm_token,
                };
                // console.log(`http://community.sadathussain.com/api/login?username=${data.username}&password=${data.password}&fcm_token=${data.fcm_token}`)
                // var response = await fetch(`http://community.sadathussain.com/api/login?username=${data.username}&password=${data.password}&fcm_token=${data.fcm_token}`, {
                var response = await fetch(`http://app.altawheedjc.org/api/login?username=${data.username}&password=${data.password}&fcm_token=${data.fcm_token}`, {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                });
                var jsonResponse = await response.json();
                // console.log('jsonResponse', jsonResponse);

                if (jsonResponse.token !== undefined) {
                    dispatch(createAction('SET_USER', jsonResponse));
                    await AsyncStorage.setItem('user', JSON.stringify(jsonResponse.data));

                } else {
                    console.log(jsonResponse.error);
                }


            },
            directLogin: async () => {
                const data = {
                    isDirect: true,
                };
                dispatch(createAction('SET_USER', data));
                await AsyncStorage.setItem('user', JSON.stringify(data));

            },
            register: async (data) => {
                // console.log('register', data);

                const response = await SignApi(data);
                // console.log('response', response);

                if (response !== undefined) {
                    dispatch(RegisterAction('REGISTER_USET',response));
                    Snackbar.show({
                        text: response.message,
                        action: {
                            title: 'Ok',
                            textColor: 'white',
                            backgroundColor: 'green',
                        },
                    });


                } else {
                    Snackbar.show({
                        text: response.error,
                        action: {
                            title: 'wrong',
                            textColor: 'white',
                            backgroundColor: 'red',
                        },
                    });


                }
                return response;

                // if (jsonResponse.token !== undefined) {
                //     await AsyncStorage.setItem('user', JSON.stringify(jsonResponse));
                //     dispatch(createAction('SET_USER', jsonResponse));
                // } else {
                //     Snackbar.show({
                //         text: jsonResponse.message,
                //         action: {
                //             title: 'Ok',
                //             textColor: 'white'
                //         }
                //     });
                // }

                // await sleep(2000);

            },

            logout: async () => {
                await AsyncStorage.clear();
                await AsyncStorage.removeItem('user');
                dispatch(createAction('REMOVE_USER'));
            },

        })
    );

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            // console.log('user', user);
            if (user) {
                dispatch(createAction('SET_USER', JSON.parse(user)));
            }
            dispatch(createAction('SET_LOADING', false));

        });

    }, []);

    return {auth, state};
}
