import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

import Voice from '@react-native-voice/voice';

function VoiceTest() {
  const [recognized, setRecognized] = useState('');
  const [volume, setVolume] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e);
    setRecognized('√');
  };

  const onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e);
    setEnd('√');
  };

  const onSpeechError = e => {
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = e => {
    console.log('onSpeechVolumeChanged: ', e);
    setVolume(e.value);
  };

  const _startRecognizing = async () => {
    _clearState();
    try {
      await Voice.start('id-ID');
      console.log('called start');
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
      console.log('called stop');
    } catch (e) {
      console.error(e);
    }
  };

  const _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
      console.log('Cancel Recog');
    } catch (e) {
      console.error(e);
    }
  };

  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
      console.log('destroy Recog');
    } catch (e) {
      console.error(e);
    }
    _clearState();
  };

  const _clearState = () => {
    setRecognized('');
    setVolume('');
    setError('');
    setEnd('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
      <Text style={styles.instructions}>
        Press the button and start speaking.
      </Text>
      <Text style={styles.stat}>{`Started: ${started}`}</Text>
      <Text style={styles.stat}>{`Recognized: ${recognized}`}</Text>
      <Text style={styles.stat}>{`Volume: ${volume}`}</Text>
      <Text style={styles.stat}>{`Error: ${error}`}</Text>
      <Text style={styles.stat}>Results</Text>
      {results.map((result, index) => {
        return (
          <Text key={`result-${index}`} style={styles.stat}>
            {result}
          </Text>
        );
      })}
      <Text style={styles.stat}>Partial Results</Text>
      {partialResults.map((result, index) => {
        return (
          <Text key={`partial-result-${index}`} style={styles.stat}>
            {result}
          </Text>
        );
      })}
      <Text style={styles.stat}>{`End: ${end}`}</Text>
      <TouchableHighlight onPress={_startRecognizing}>
        <Text>Button</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={_stopRecognizing}>
        <Text style={styles.action}>Stop Recognizing</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={_cancelRecognizing}>
        <Text style={styles.action}>Cancel</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={_destroyRecognizer}>
        <Text style={styles.action}>Destroy</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default VoiceTest;
