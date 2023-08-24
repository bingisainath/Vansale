import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  onPress: () => void;
  title: string;
}

const ButtonComponent: FC<Props> = props => {
  return (
    <TouchableOpacity style={styles.touchStyle} onPress={props.onPress}>
      <Text style={styles.textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchStyle: {
    width: '20%',
    height: 40,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 7,
    marginTop: 170,
    left:170
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ButtonComponent;
