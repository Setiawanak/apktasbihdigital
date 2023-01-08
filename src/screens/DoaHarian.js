import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {darkModeColor} from '../conts/colors';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DetailSurah = ({route}) => {
  const [ayat, setAyat] = useState([]);
  const [loading, setLoading] = useState(true);
  const {container, content} = darkModeColor();
  let [audio, setAudio] = useState(null);
  Sound.setCategory('Playback');
  const Item = ({item}) => (
    <View className="m-2 border border-gray-400 p-5 rounded-xl">
      <View className="">
        <View className="">
          <Text
            style={{
              color: content,
            }}
            className="text-xl font-bold">
            {item.nomor}
          </Text>
          <Text
            style={{
              color: content,
            }}
            className="text-xl font-bold">
            {item.ar}
          </Text>
          <Text
            style={{
              color: content,
            }}
            className="text-xl font-bold">
            {item.tr}
          </Text>
          <Text
            style={{
              color: content,
            }}
            className="text-xl font-bold"></Text>
          <Text
            style={{
              color: content,
            }}
            className="text-xl font-bold">
            {item.idn}
          </Text>
        </View>
        <View></View>
      </View>
    </View>
  );
  const getData = () => {
    axios
      .get(route.params.url)
      .then(res => {
        console.log(res);
        setAyat(res.data);
        setAudio(
          new Sound(res.data.audio, undefined, error => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }
          }),
        );
        setLoading(false);
      })
      .catch(err => {
        console.log(err.response);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading)
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );

  const onPlayPress = () => {
    console.log(audio);
    audio.play(() => {
      console.log('Played');
    });
  };

  return (
    <SafeAreaView
      className="flex-1 pt-5"
      style={{
        backgroundColor: container,
      }}>
      <View className="flex-row justify-evenly items-center">
        <Text className="text-lg font-bold text-black">{ayat.nama_latin}</Text>
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={onPlayPress}
            style={{
              backgroundColor: '#6B6565',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Icon name="play" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => audio.pause(() => console.log('paused'))}
            style={{
              backgroundColor: '#6B6565',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Icon name="pause" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={ayat.ayat}
        keyExtractor={(item, index) => index}
        renderItem={Item}
      />
    </SafeAreaView>
  );
};

export default DetailSurah;
