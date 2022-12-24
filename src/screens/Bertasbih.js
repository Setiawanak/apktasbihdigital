import React, {Component, useState, UseState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  useColorScheme,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  Alert,
} from 'react-native';
import {Switch} from 'react-native-switch';
import {store} from '../context';
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EnIcon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Sound from 'react-native-sound';
import {reset} from '../api/call';

const Bertasbih = ({navigation}) => {
  const {state, dispatch} = store();
  const [switchValue, setSwitchValue] = useState(false);
  const [target, setTarget] = useState(0);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const listSound = [
    {
      id: 1,
      title: 'سبحان الله',
      sound: new Sound('subhannallah.mp3', Sound.MAIN_BUNDLE, error => {
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
  ];

  const [currentSound, setCurrentSound] = useState(listSound[0]);

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
    setCurrentTarget(currentTarget + 1);
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
              width: '25%',
            }}>
            <TouchableOpacity>
              <Switch
                value={switchValue}
                activeText={'On'}
                inActiveText={'Off'}
                onValueChange={val => setSwitchValue(val)}
                circleSize={20}
                containerStyle={{
                  borderColor: 'white',
                  borderWidth: 2,
                }}
                backgroundActive={'#F4F5F9'}
                backgroundInactive={'#181a20'}
                circleActiveColor={'#181a20'}
                circleInActiveColor={'#F4F5F9'}
                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }} // style for inner animated circle for what you (may) be rendering inside the circle
                outerCircleStyle={{}} // style for outer animated circle
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <EnIcon name="dots-three-horizontal" size={20} color="#FFFFFF" />
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
                  <Icon name="volume-mute" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
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
                  <Icon name="sticky-note" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* progress       */}
          </View>
          <View className="my-5 h-5 w-full bg-[#6B6565]">
            <View
              className="h-5 bg-[#cecece]"
              style={{
                width: `${(currentTarget / target) * 100}%`,
              }}></View>
          </View>

          <Text className="text-white text-xl text-center">
            Target : {target}
          </Text>

          <View className="justify-center items-center">
            <TouchableOpacity
              onPress={handleIncrement}
              className="w-48 h-48 bg-[#6B6565] my-4 rounded-full justify-center items-center">
              <Text className="text-white text-center" style={{fontSize: 80}}>
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
