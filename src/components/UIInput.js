import React from 'react';
import { 
  Text, 
  View,
  TextInput
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { GlobalStyle, HeaderStyle, UIInputStyle } from './GlobalStyle';

export const UIInput = ({
  label = null,
  value = null,
  placeholder,
  onTextChange,
  contentContainerStyle = {}
}) => (
    <View style={[UIInputStyle.container, {backgroundColor: "transparent", marginTop: moderateScale(10)}, contentContainerStyle]}>
      <Text style={[GlobalStyle.text, {fontSize: moderateScale(14), marginBottom: moderateScale(5)}]}>
        {label}
      </Text>
      <View style={UIInputStyle.textInputView}>
        <TextInput 
          placeholder={placeholder}
          value={String(value)}
          onChangeText={(text) => onTextChange(text)}
          style={{
            // color: "#fff"
          }}
        />
      </View>
    </View>
);

// export default UIInput;
