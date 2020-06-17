/**
 * A simple SignalR chat client written in React Native
 * https://github.com/jonathanzufi/SignalR-react-native-client
**/

import React, { useEffect } from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View,
  Text, StatusBar, TextInput, TouchableOpacity,
  Dimensions, FlatList
} from 'react-native';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { setJSExceptionHandler } from 'react-native-exception-handler';

const errorHandler = (e, isFatal) => {
  console.log('Global error handler');
}
setJSExceptionHandler(errorHandler, true);

// This function defines how we'll render incoming messages in the message log
function MessageItem({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

function buttonEnabled(enabled) {
  if (enabled)
    return styles.buttonText_enabled;
  else
    return styles.buttonText_disabled;
}

const App: () => React$Node = () => {

  const hub_endpoint = 'https://signalrdemo.com/chatHub';

  const [user, onChangeUserText] = React.useState('');
  const [message, onChangeMessageText] = React.useState('');
  const [conn, setConn] = React.useState(null);
  const [messageLog, setMessageLog] = React.useState([]);
  const [connectionState, setConnectedStateText] = React.useState('');
  const [isConnected, setConnected] = React.useState(false);

  // Initialize the hub endpoint and set up routes for incoming events
  useEffect(() => {

    const connection = new HubConnectionBuilder()
      .withUrl(hub_endpoint)
      .configureLogging(LogLevel.Debug)
      .build();

    setConnectedStateText(`Trying to connect to ${hub_endpoint}`);

    connection
      .start()
      .then(() => {
        setConnectedStateText(`Connected to ${hub_endpoint}`);
        setConnected(true);
      })
      .catch(err => console.log(`Error starting the connection: ${err.toString()}`));

    connection.onclose(async () => {
      setConnectedStateText(`Disconnected from ${hub_endpoint}`);
      setConnected(false);
    });

    connection.on("ReceiveMessage", function (user, message) {
      setMessageLog(messageLog => [...messageLog.concat({
        id: Date.now().toString(),    // Give our flatlist keyExtractor something to key off
        user: user,
        message: message
      })]);
    });

    setConn(connection);

  }, []);


  return (
    <>
      <SafeAreaView>
        <View>
          <View style={styles.sectionContainer}>

            <Text style={styles.sectionTitle}>SignalR Demo</Text>
            <Text style={styles.connectedto}>{connectionState}</Text>

            <TextInput placeholder='Username' style={styles.fields}
              onChangeText={text => onChangeUserText(text)} value={user}
            />

            <TextInput placeholder='Message' style={styles.fields}
              onChangeText={text => onChangeMessageText(text)} value={message}
            />

            <View style={{ flex: 1, flexDirection: 'row' }}>

              <TouchableOpacity style={styles.button} onPress={() => {
                if (user.length === 0 || message.length === 0)
                  return;
                console.log(`Sending ${user}`);
                conn.invoke("SendMessage", `${user}`, `${message}`).catch(function (err) {
                  console.log('Error sending')
                });
                onChangeMessageText('');
              }}>
                <Text style={buttonEnabled(isConnected)}>Send</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.button} onPress={() => {
                onChangeUserText('');
                onChangeMessageText('');
                setMessageLog([]);
              }}>
                <Text style={buttonEnabled(isConnected)}>Clear</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.button} onPress={() => {
                conn
                  .start()
                  .then(() => {
                    console.log(`Connected to the hub endpoint: ${hub_endpoint}`)
                    setConnectedStateText('Connected to ' + hub_endpoint);
                    setConnected(true);
                  })
                  .catch(err => console.log(`Error starting the connection: ${err.toString()}`));

              }}>
                <Text style={buttonEnabled(!isConnected)}>Reconnect</Text>
              </TouchableOpacity>

            </View>

            <FlatList
              style={styles.messageList}
              data={messageLog}
              renderItem={({ item }) => <MessageItem title={'\u2B24 ' + item.user + ' says: ' + item.message} />}
              keyExtractor={item => item.id}
            />

          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: 'white'
  },
  connectedto: {
    fontSize: 10,
    fontStyle: 'italic'
  },
  fields: {
    marginTop: 20,
    paddingLeft: 10,
    fontSize: 15,
    height: 40,
    borderWidth: 1
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  button: {
    borderWidth: 2,
    borderColor: "#89AAFF",
    width: 109,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginRight: 20
  },
  buttonText_enabled: {
    fontSize: 20,
    color: 'black'
  },
  buttonText_disabled: {
    fontSize: 20,
    color: '#dfe1e6'
  },
  messagelogitem: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  messageList: {
    marginTop: 90
  }
});

export default App;
