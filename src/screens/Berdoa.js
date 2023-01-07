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
  const [tempList, setTempList] = useState(menuList);

  const [searchText, setSearchText] = useState('');
  const {state, dispatch} = store();
  const [switchValue, setSwitchValue] = useState(false);
  const [target, setTarget] = useState(0);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const menuList = [
    {
      nama: 'Doa Sehari hari',
      image: require('../images/alquran.png'),
      path: 'Alquran',
    },
    {
      nama: 'Berdzikir',
      image: require('../images/tasbih.png'),
      path: 'Bertasbih',
    },
    {
      nama: 'Berdoa',
      image: require('../images/berdoa.png'),
      path: 'Berdoa',
    },
    {
      nama: 'Test Voice',
      image: require('../images/setting.png'),
      path: 'TestVoice',
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
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '15%',
            }}>
            <TouchableOpacity>
              <EnIcon name="bell" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <EnIcon name="dots-three-horizontal" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Bertasbih;
