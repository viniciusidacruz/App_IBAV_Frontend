import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IValuesProps } from './types';


export const setStorage = ({key,value}: IValuesProps) => {
    AsyncStorage.setItem(key, value)
}

export const getStorage = async (key: string) => {
    const value = await AsyncStorage.getItem(key)

    return value
}