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

const BASE_URL = 'https://doa-doa-api-ahmadramadhan.fly.dev';

const DoaHarian = ({navigation}) => {
  const {container, content} = darkModeColor();

  const [surah, setSurah] = useState([]);
  const [tempSurah, setTempSurah] = useState([]);

  const [searchText, setSearchText] = useState('');

  const Item = ({item}) => (
    <View className="m-2 border border-gray-400 p-5 rounded-xl">
      <View className="">
        <View className="flex-row w-full justify-between mb-4">
          <Text
            style={{
              color: content,
            }}
            className="text-2xl font-bold">
            {item.id}
          </Text>
          <Text
            style={{
              color: content,
            }}
            className="text-2xl font-bold">
            {item.doa}
          </Text>
        </View>

        <Text
          style={{
            color: content,
          }}
          className="text-2xl my-3">
          {item.ayat}
        </Text>

        <Text
          style={{
            color: content,
          }}
          className="text-lg my-3">
          ({item.latin} )
        </Text>

        <Text
          style={{
            color: content,
          }}
          className="text-xl ">
          Artinya:
        </Text>

        <Text
          style={{
            color: content,
          }}
          className="text-xl ">
          {item.artinya}
        </Text>
        <View></View>
      </View>
    </View>
  );

  const getData = () => {
    axios
      .get(`${BASE_URL}/api`)
      .then(res => {
        console.log(res.data);
        setSurah(res.data);
        setTempSurah(res.data);
      })
      .catch(err => console.log(err.response));
  };

  function SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = tempSurah.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.doa ? item.doa.toUpperCase() : ''.toUpperCase();
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
          placeholderTextColor="black"
          placeholder="Cari doa harian"
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

export default DoaHarian;

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
