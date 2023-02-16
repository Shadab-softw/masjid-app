import React, {useState, useEffect} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {FeatherIcon} from '../../constants/Icons';
import CONSTANT from '../../constants';
import {Checkbox} from 'antd';

const Textarea = ({
  plcholder,
  rightIcon,
  leftIcon,
  isSecure,
  onTextChange,
  onRightIconClick,
  errorMsg,
  style,
  textStyle,
  maxLengths,
  keyboardTypes,
  value,
}) => {
  const [width, setWidth] = useState('');
  useEffect(() => {}, []);

  return (
    <View style={[styles.root, style]}>
      <View style={styles.textContainer}>
        {leftIcon && (
          <View style={styles.leftIconstyle}>
            <FeatherIcon
              name={leftIcon}
              size={20}
              color={CONSTANT.App.colors.Icon_Color}
            />
          </View>
        )}

        <TextInput
          placeholder={plcholder}
          maxLength={maxLengths}
          value={value}
          secureTextEntry={isSecure ? true : false}
          placeholderTextColor={'#9D9D9D'}
          onChangeText={value => onTextChange(value)}
          style={[
            styles.textInput,
            {paddingLeft: leftIcon ? 30 : 10},
            textStyle,
          ]}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconClick} style={styles.rightIcon}>
            <FeatherIcon
              name={rightIcon}
              size={20}
              color={CONSTANT.App.colors.Icon_Color}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    backgroundColor: '#1a1d2e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 8,
    opacity: 0.9,
    marginBottom: 15,
  },
  errormsg: {
    marginLeft: 10,
    color: 'red',
  },

  textInput: {
    width: 315,
    height: 105,
    color: '#FFFFFF',
    fontSize: 17,
    marginLeft: 15,
    // color: CONSTANT.App.colors.i_superGrey,
  },
  leftIconstyle: {position: 'absolute', left: 10},
  rightIcon: {position: 'absolute', right: 15},
});

export default Textarea;
