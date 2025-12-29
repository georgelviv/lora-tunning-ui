import { useWifiSerial } from '@hooks/useWifiSerial';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { WifiSerialState } from '../models/app.models';

export default function RootComponent() {
  const {connect, status, disconnect} = useWifiSerial();
  let content: React.ReactNode = '';

  if (status === WifiSerialState.initial || status === WifiSerialState.connecting) {
    content = (
      <Button icon="wifi" mode="contained" onPress={connect}
        disabled={status === WifiSerialState.connecting}
        loading={status === WifiSerialState.connecting}>
        {status === WifiSerialState.connecting ? 'Connecting' : 'Connect'}
      </Button>
    )
  } else if (status === WifiSerialState.connected || status === WifiSerialState.disconnecting) {
    content = (
      <Button icon="close" mode="contained" onPress={disconnect}
        disabled={status === WifiSerialState.disconnecting}
        loading={status === WifiSerialState.disconnecting}>
        Disconnect
      </Button>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="displayLarge">Lora Tunning</Text>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 64,
    textAlign: 'center',
    color: '#006d6f',
    lineHeight: 80
  },
  container: {
    backgroundColor: '#eef2f6',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32
  }
})