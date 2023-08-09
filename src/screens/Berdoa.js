import React, {Component, useState, UseState, useRef, useEffect} from 'react';
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
  Alert,
  ImageBackground,
} from 'react-native';
import {Switch} from 'react-native-switch';
import {store} from '../context';
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EnIcon from 'react-native-vector-icons/Entypo';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Sound from 'react-native-sound';
import {reset} from '../api/call';

const Berdoa = ({navigation}) => {
  const [tempList, setTempList] = useState(menuList);

  const [searchText, setSearchText] = useState('');
  const {state, dispatch} = store();
  const [switchValue, setSwitchValue] = useState(false);
  const [target, setTarget] = useState(0);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const menuList = [
    {
      nama: 'Dzikir Pagi',
      image: require('../images/dzikirpagi.png'),
      path: 'DzikirPagi',
    },
    {
      nama: 'Dzikir Petang',
      image: require('../images/dzikirpetang.png'),
      path: 'DzikirPetang',
    },
    {
      nama: 'Dzikir Setelah Shalat',
      image: require('../images/dzikirsetshalat.png'),
      path: 'Dzikir',
    },
    {
      nama: 'Doa Setelah Dzikir',
      image: require('../images/doasetdzikir.png'),
      path: 'DoaDzikir',
    },
    {
      nama: 'Doa Harian',
      image: require('../images/doaharian.png'),
      path: 'DoaHarian',
    },
  ];

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
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '15%',
            }}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Menu List Berdoa',
                  '1: Dzikir Setelah Shalat\n2: Doa Setelah Dzikir\n3: Doa harian :',
                )
              }>
              <MCIcon name="information-outline" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <FlatGrid
          style={{
            textColor: state.darkMode ? '#F4F5F9' : '#181a20',
          }}
          spacing={25}
          data={menuList}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.path)}
              style={{
                backgroundColor: state.darkMode ? '#F4F5F9' : '#181a20',
                height: 150,
                justifyContent: 'center',
                alignItems: 'center',
                width: 150,
                borderRadius: 15,
                elevation: 3,
              }}>
              <ImageBackground
                source={item.image}
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: state.darkMode ? '#181a20' : '#F4F5F9',
                  }}>
                  {item.nama}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Berdoa;
