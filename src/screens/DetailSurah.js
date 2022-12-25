import {View, Text, FlatList, SafeAreaView, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {darkModeColor} from '../conts/colors';

const DetailSurah = ({route}) => {
  const [ayat, setAyat] = useState([]);
  const [loading, setLoading] = useState(true);
  const {container, content} = darkModeColor();

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
        setAyat(res.data.ayat);
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

  return (
    <SafeAreaView
      className="flex-1 pt-5"
      style={{
        backgroundColor: container,
      }}>
      <FlatList
        data={ayat}
        keyExtractor={(item, index) => index}
        renderItem={Item}
      />
    </SafeAreaView>
  );
};

export default DetailSurah;
