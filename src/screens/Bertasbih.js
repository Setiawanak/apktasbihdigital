import React, {
  Component,
  useState,
  UseState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import Voice from '@react-native-voice/voice';

import {
  View,
  TextInput,
  Text,
  useColorScheme,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  Dimensions,
  Vibration,
  Alert,
} from 'react-native';
import {Switch} from 'react-native-switch';
import {store} from '../context';
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EnIcon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Sound from 'react-native-sound';
import {reset} from '../api/call';

const {width, height} = Dimensions.get('window');

const Bertasbih = ({navigation}) => {
  const {state, dispatch} = store();
  const [switchValue, setSwitchValue] = useState(false);
  const [target, setTarget] = useState(0);
  const [subTarget, setSubTarget] = useState(0);

  const [currentTarget, setCurrentTarget] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [clickMode, setClickMode] = useState(false);

  const listSound = [
    {
      id: 1,
      title: 'سبحان الله',
      sound: new Sound('subhanallah.mp3', Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }),
    },
    {
      id: 2,
      title: 'الحمد لله',
      sound: new Sound('alhamdulillah.mp3', Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }),
    },
    {
      id: 3,
      title: 'الله أكبر',
      sound: new Sound('allahuakbar.mp3', Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }),
    },
    {
      id: 4,
      title: 'استغفر الله العظيم',
      sound: new Sound('allahuakbar.mp3', Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }),
    },
    {
      id: 5,
      title: 'لآإِلَهَ إِلاَّ الله',
      sound: new Sound('lailahaillallah.mp3', Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }),
    },
  ];

  const [currentSound, setCurrentSound] = useState(listSound[0]);
  const tickSound = new Sound('tick.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });

  useEffect(() => {
    async function get() {
      console.log(await Voice.isAvailable());
      console.log(await Voice.getSpeechRecognitionServices());
    }
    get();
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      currentSound.sound.stop();
    };
  }, []);

  const onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
  };

  const onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e);
  };

  const onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e);
  };

  const onSpeechError = e => {
    console.log('onSpeechError: ', e);
  };

  const onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    /*e.value.map(item => {
      console.log(item);
      if (
        item == 'subhanallah' ||
        item == 'alhamdulillah' ||
        item == 'allahuakbar'
      ) {
        setCurrentTarget(currentSound + 1);
      }
    }); */
    // setCurrentTarget(currentTarget + 1);
  };

  const onSpeechPartialResults = useCallback(e => {
    console.log('onSpeechPartialResults: ', e);
    //e.value.map(item => {
    if (e.value[0] !== '') {
      handleIncrement();
    }
    // });
    // setCurrentTarget(prev => prev + 1);
  }, []);

  const onSpeechVolumeChanged = e => {
    console.log('onSpeechVolumeChanged: ', e);
  };

  const _startRecognizing = async () => {
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
  };

  const handleNextSound = () => {
    currentSound.sound.stop();

    if (currentSound.id == 3) {
      return setCurrentSound(listSound[0]);
    }

    setCurrentSound(listSound.find(item => item.id == currentSound.id + 1));
  };

  const handlePrevSound = () => {
    currentSound.sound.stop();

    if (currentSound.id == 1) {
      return setCurrentSound(listSound[2]);
    }

    setCurrentSound(listSound.find(item => item.id == currentSound.id - 1));
  };

  const handleIncrement = () => {
    if (subTarget % target == 0) {
      Vibration.vibrate(1000);
      setSubTarget(0);
    }

    if (clickMode) {
      Vibration.vibrate(100);
    } else {
      tickSound.play();
    }

    setCurrentTarget(prev => prev + 1);
    setSubTarget(prev => prev + 1);
  };

  const handlePlaySound = () => {
    currentSound.sound.play();
  };

  const handleReset = async () => {
    const createHistory = await reset({
      target,
      tercapai: currentTarget,
      user_id: state.user.id,
    });
    setTarget(0);
    setCurrentTarget(0);
  };

  return (
    <View className="bg-[#181a20] flex-1">
      <View
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          padding: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '20%',
            }}>
            <TouchableOpacity onPress={() => setClickMode(prev => !prev)}>
              <MCIcon
                name={clickMode ? 'vibrate' : 'volume-high'}
                size={20}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'INFO CARA PEMAKAIAN DI BERDZIKIR :',
                  '↩️: UNTUK HAPUS SEMUA\n⏹ : UNTUK MENGHENTIKAN SUARA\n🎙️: UNTUK MENGHITUNG SUARA MEMAKAI VOICE\n▶️: UNTUK MEMULAI SUARA\n📝: UNTUK MEMULAI TARGET',
                )
              }>
              <MCIcon name="note-text-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View className="w-full bg-[#6B6565] h-14 my-3 px-5 rounded-full flex-row justify-between items-center">
            <TouchableOpacity onPress={handlePrevSound}>
              <EnIcon name="arrow-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <Text className="text-xl font-bold text-white -mt-2">
              {currentSound.title}
            </Text>

            <TouchableOpacity onPress={handleNextSound}>
              <EnIcon name="arrow-right" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View className="flex-row w-32 justify-between">
                <TouchableOpacity
                  onPress={handleReset}
                  style={{
                    backgroundColor: '#6B6565',
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                  }}>
                  <EvilIcon name="redo" size={50} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => currentSound.sound.stop()}
                  style={{
                    backgroundColor: '#6B6565',
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                  }}>
                  <Icon name="stop" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={_startRecognizing}
                style={{
                  backgroundColor: '#6B6565',
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                }}>
                <Icon name="microphone" size={30} color="white" />
              </TouchableOpacity>
              <View className="flex-row w-32 justify-between">
                <TouchableOpacity
                  onPress={handlePlaySound}
                  style={{
                    backgroundColor: '#6B6565',
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                  }}>
                  <Icon name="play" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={{
                    backgroundColor: '#6B6565',
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                  }}>
                  <MCIcon name="notebook-edit" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* progress       */}
          </View>
          <View className="my-5 h-5 w-full bg-[#6B6565]">
            <View
              className="h-5 bg-[#cecece]"
              style={{
                width: `${(subTarget / target) * 100}%`,
              }}></View>
          </View>

          <Text className="text-white text-xl text-center">
            Target : {subTarget} / {target}
          </Text>

          <View className="justify-center mt-10 items-center">
            <TouchableOpacity
              onPress={handleIncrement}
              className=" bg-[#6B6565] rounded-full justify-center items-center"
              style={{width: width - 20, height: width - 20}}>
              <Text className="text-white" style={{fontSize: 80}}>
                {currentTarget}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View className="p-5">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-lg font-bold">
              Atur target untuk hari ini
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <EnIcon name="cross" size={30} />
            </TouchableOpacity>
          </View>
          <View className="flex-row px-2 space-x-4 items-center">
            <TextInput
              onChangeText={text => setTarget(+text)}
              className="border  rounded-lg px-2"
              placeholder="Masukan Nama Anda!"
              value={target.toString()}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="rounded-2xl h-10 bg-green-600 justify-center items-center px-10">
              <Text className="text-lg text-white">Set Target</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Bertasbih;
