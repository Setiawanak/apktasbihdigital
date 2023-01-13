import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {darkModeColor} from '../conts/colors';

const BASE_URL = 'https://equran.id/api/';

const Alquran = ({navigation}) => {
  const {container, content} = darkModeColor();

  const [surah, setSurah] = useState([]);
  const [tempSurah, setTempSurah] = useState([]);

  const [searchText, setSearchText] = useState('');

  const Item = ({item}) => (
    <TouchableOpacity
      className="m-2 border p-5 rounded-xl border-gray-400"
      onPress={() =>
        navigation.navigate('DetailSurah', {
          url: `https://equran.id/api/surat/${item.nomor}`,
        })
      }>
      <View className="">
        <View className="flex justify-between">
          <Text
            className="text-xl font-bold "
            style={{
              color: content,
            }}>
            {item.nomor}
          </Text>
          <Text
            className="text-xl font-bold "
            style={{
              color: content,
            }}>
            {item.nama}
          </Text>
          <Text
            style={{
              color: content,
            }}
            className="text-xl font-bold">
            {item.nama_latin} - ({item.jumlah_ayat} Ayat)
          </Text>
          <Text
            style={{
              color: content,
            }}
            className="text-xl font-bold">
            Artinya : {item.arti}
          </Text>
        </View>
        <View></View>
      </View>
    </TouchableOpacity>
  );

  const getData = () => {
    axios
      .get(`${BASE_URL}surat`)
      .then(res => {
        setSurah(res.data);
        setTempSurah(res.data);
      })
      .catch(err => console.log(err.response));
  };

  function SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = tempSurah.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.nama_latin
        ? item.nama_latin.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setSearchText(text);
    setSurah(newData);
  }
  // function yang dijalanin compenent diakses (Ketika dibuka dan ditutup)
  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: container,
      }}>
      <View
        className="h-10 w-full  my-5"
        style={{
          backgroundColor: container,
        }}>
        <TextInput
          className="border rounded-2xl mx-4 px-3 bg-gray-200 py-2"
          style={{
            color: 'black',
          }}
          placeholder="Cari nama surah"
          value={searchText}
          onChangeText={text => SearchFilterFunction(text)}
        />
      </View>
      <FlatList
        data={surah}
        keyExtractor={(item, index) => index.toString()}
        renderItem={Item}
        contentContainerStyle={{
          backgroundColor: container,
        }}
      />
    </SafeAreaView>
  );
};

export default Alquran;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  wrapperNumber: {
    alignItems: 'center',
    margin: 5,
  },
  wrappersurah: {
    flexDirection: 'row',
    margin: 8,
  },
  wrapperNamesurah: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
});
