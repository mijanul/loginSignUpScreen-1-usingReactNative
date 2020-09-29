import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number } from 'prop-types';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';

export class FloatingTitleTextInputField extends Component {
  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    value: string.isRequired,
    updateMasterState: func.isRequired,
    keyboardType: string,
    titleActiveSize: number, // to control size of title when field is active
    titleInActiveSize: number, // to control size of title when field is inactive
    titleActiveColor: string, // to control color of title when field is active
    titleInactiveColor: string, // to control color of title when field is active
    textInputStyles: object,
    otherTextInputProps: object,
  }

  
  static defaultProps = {
    keyboardType: 'default',
    titleActiveSize: hp(2.3),
    titleInActiveSize: hp(2.3),
    titleActiveColor: '#9ca4ab',
    titleInactiveColor: '#9ca4ab',
    textInputStyles: {}, 
    otherTextInputAttributes: {},
  }

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
    }
  }

  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true });
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
      }).start();
    }
  }

  _handleBlur = () => {
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({ isFieldActive: false });
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
      }).start();
    }
  }

  _onChangeText = (updatedValue) => {
    const { attrName, updateMasterState } = this.props; 
    updateMasterState(attrName, updatedValue);
  }

  _returnAnimatedTitleStyles = () => {
    const { isFieldActive } = this.state;
    const {
      titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize
    } = this.props;
  
    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [hp(2.4), 0],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInactiveColor,
    }
  }

  render() {
    return (
      <View style = {Styles.container}>
        <Animated.Text
          style = {[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
        >
          {this.props.title}
        </Animated.Text>
        <TextInput
          value = {this.props.value}
          style = {[Styles.textInput, this.props.textInputStyles]}
          underlineColorAndroid = 'transparent'
          onFocus = {this._handleFocus}
          onBlur = {this._handleBlur}
          onChangeText = {this._onChangeText}
          keyboardType = {this.props.keyboardType}
          {...this.props.otherTextInputProps}
        />
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(8),
  },
  textInput: {
    fontSize: hp(2.3),
    marginTop: hp(2.3),
    color: 'black',
    fontWeight: '700'
  },
  titleStyles: {
    position: 'absolute',
    left: wp(1),
  }
})