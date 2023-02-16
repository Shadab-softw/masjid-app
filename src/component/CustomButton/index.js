/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import CONSTANT from '../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const CustomButton = ({ variant, title, onPress, style, textStyle, socialIcon, rightIcon }) => {

    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                style={[{
                    // width: '100%',
                    backgroundColor: variant === 'filled' ? CONSTANT.App.colors.Icon_Color : 'transparent',
                    borderRadius: 10,
                    borderWidth: variant === 'outlined' ? 1 : 0,
                    borderColor: variant === 'outlined' ? CONSTANT.App.colors.i_red : '',
                    padding: 12,
                    justifyContent: 'center',
                    alignItems: 'center'
                }, style]}
            >
                <Text style={[{
                    color: variant === 'outlined' ? CONSTANT.App.colors.Icon_Color : '#fff',
                    fontSize: 20,
                    // fontWeight:'bold'
                }, textStyle]}>{title}</Text>
            </TouchableOpacity>
            {socialIcon &&
                <>
                    <TouchableOpacity
                        onPress={onPress}
                        style={[{
                            // width: '100%',
                            backgroundColor: variant === 'filled' ? CONSTANT.App.colors.Icon_Color : 'transparent',
                            borderRadius: 10,
                            borderWidth: variant === 'outlined' ? 1 : 0,
                            borderColor: variant === 'outlined' ? CONSTANT.App.colors.i_red : '',
                            padding: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }, style]}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome name={rightIcon} size={20} color={CONSTANT.App.colors.Icon_Color} />

                            <Text style={[{
                                color: variant === 'outlined' ? CONSTANT.App.colors.Icon_Color : '#fff',
                                fontSize: 20,
                            }, textStyle]}>{title}</Text>

                        </View>
                    </TouchableOpacity>

                </>
            }

        </>

    )
}



export default CustomButton