import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from "../config/colors";
import LogoutButton from './LogoutButton';
import OptionButton from './OptionButton';
import GoBackButton from './GoBackButton';

const ChatsViewHeader = ({canGoBack, canGoToSettings}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {canGoBack? <GoBackButton /> : null}
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>Whatsapp</Text>
        </View>
        <View style={styles.buttonContainer}>
          {canGoToSettings? <OptionButton /> : null}
          <LogoutButton />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default ChatsViewHeader;
