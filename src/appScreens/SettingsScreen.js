import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default SettingsScreen

const styles = StyleSheet.create({})