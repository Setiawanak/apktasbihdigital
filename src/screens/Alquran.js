import {StyleSheet, Text, FlatList, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Axios} from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';

const BASE_URL = 'https://api.quran.sultanlab.id/';

const Alquran = () => {
  const [surah, setSurah] = useState([]);
  const renderItem = ({item}) => <Item title={item.title} />;

  const getData = async () => {
    try {
      axios.get(`${BASE_URL}surah`).then(res => {
        //console.log(res.data.data);
        setSurah(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        data={surah}
        renderItem={(item, index) => {
          <TouchableOpacity style={styles.wrappersurah}>
            <Text style={styles.wrapperNumber}>{item.item.number}</Text>
            <View style={styles.wrapperNameSurah}>
              <View>
                <Text style={{fontSize: 16}}>
                  {item.item.name.transilation.id}
                </Text>
                <Text>
                  {item.item.revelation.id} - {item.item.numberVerses} Ayat{' '}
                </Text>
              </View>
              <Text style={{fontSize: 20}}>{item.item.name.Short}</Text>;
            </View>
          </TouchableOpacity>;
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
