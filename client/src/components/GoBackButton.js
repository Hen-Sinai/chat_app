import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../config/colors';
import { useNavigation } from '@react-navigation/native';

const GoBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" style={styles.container}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      marginRight: 8,
    //   padding
      color: colors.text,
      fontSize: 40
    },
});

export default GoBackButton;
