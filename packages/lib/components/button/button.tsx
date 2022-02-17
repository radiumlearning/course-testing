import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export type ButtonProps = {
  children?: React.ReactNode | string;
};

export const Button: React.FC<ButtonProps> = ({children}) => {
  return (
    <TouchableOpacity>
      <View style={{padding: 10, borderRadius: 8, backgroundColor: '#749aee'}}>
        <Text>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};
