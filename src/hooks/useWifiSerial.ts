import { WifiSerialState } from '@models/app.models';
import { useCallback, useState } from 'react';

const WS_URL = 'ws://192.168.4.1/ws';

export const useWifiSerial = () => {
  const [status, setStatus] = useState<WifiSerialState>(WifiSerialState.initial);

  let ws: WebSocket | null;
  const connect = useCallback(() => {
    ws = new WebSocket(WS_URL);

    setStatus(WifiSerialState.connecting);

    ws.onopen = () => {
      console.log('WifiSerialService connected')
      setStatus(WifiSerialState.connected);
    };

    ws.onerror = (err) => {
      console.error('WifiSerialService error', err);
      setStatus(WifiSerialState.error);
    };

    ws.onclose = () => {
      console.warn('WifiSerialService disconnected');
      setStatus(WifiSerialState.disconnected)
    };

    ws.onmessage = (message) => {
      console.log(message);
    }

  }, []);

  const disconnect = useCallback(() => {
    setStatus(WifiSerialState.disconnecting);
    if (ws) {
      ws.close();
      ws = null;
    }

    setStatus(WifiSerialState.disconnected);
  }, []);

  return {
    connect, status, disconnect
  }
}