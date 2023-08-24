import {View, Text, TextInput} from 'react-native';
import React from 'react';

import {style} from '../settlement/Style';
import { moderateScale } from '../components/Scale';

const Cash = (props: any) => {

  const {term, onTermChange, cash, state} = props;

  return (
    <View style={style.container}>
      <View
        style={{
          width: '20%',
        }}>
        <Text style={style.text}>{cash} </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: moderateScale(15),
            paddingTop: moderateScale(4),
            paddingRight: moderateScale(12),
          }}>
          X
        </Text>
      </View>
      <View style={style.View500}>
        <TextInput
          placeholder="0"
          keyboardType="numeric"
          style={style.textInput}
          value={term}
          onChangeText={onTermChange}
        />
      </View>
      <View
        style={{
          paddingLeft: moderateScale(10),
          paddingRight: moderateScale(10),
        }}>
        <Text style={style.text}> = </Text>
      </View>
      <View
        style={{
          width: '30%',
        }}>
        <Text style={style.text}>{state * cash}</Text>
      </View>
    </View>
  );
};

export default Cash;
