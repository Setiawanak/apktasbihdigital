import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {darkModeColor} from '../conts/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Sound from 'react-native-sound';

const DATA = [
  {
    id: '1',
    arab: 'أَسْتَغْفِرُ اللهَ الْعَظِـيْمِ الَّذِيْ لَااِلَهَ اِلَّا هُوَ الْحَيُّ الْقَيُّوْمُ وَأَتُوْبُ إِلَيْه',
    latin:
      '"ASTAGHFIRULLAH HALADZIM, ALADZI LAAILAHA ILLAHUWAL KHAYYUL QOYYUUMU WA ATUUBU ILAIIH"',
  },
  {
    id: '2',
    arab: 'أَسْتَغْفِرُ اللهَ الْعَظِـيْمِ الَّذِيْ لَااِلَهَ اِلَّا هُوَ الْحَيُّ الْقَيُّوْمُ وَأَتُوْبُ إِلَيْهلَاإِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِيْ وَيُمِيْتُ وَهُوَ عَلَى كُلِّ شَيْئٍ قَدِيْر',
    latin:
      '"LAA ILAHA ILLALLAH WAKHDAHU LAA SYARIKA LAHU, LAHUL MULKU WALAHUL KHAMDU YUKHYIIY WAYUMIITU WAHUWA \'ALAA KULLI SYAI\'INNQODIIR"',
  },
  {
    id: '3',
    arab: 'وَالْحَمْدُ لِلهِ رَبِّ الْعَالَمِيْنَ, حَمْدًايُّوَافِيْ نِعَامَهُ وَيُكَافِيْ مَزِيْدَةْ يَارَبَّنَا لَكَ الْحَمْدُ كَمَا يَنْبَغِيْ لِجَلاَلِ وَجْهِكَ وَعَضِيْمِ للَّهُمَّ أَنْتَ السَّلاَمُ، وَمِنْكَ السَّلَامُ، وَإِلَيْكَ يَعُوْدُ السَّلَامُ فَحَيِّنَارَبَّنَا بِالسَّلَامِ وَاَدْخِلْنَا الْـجَنَّةَ دَارَ السَّلَامِ تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ يَا ذَاالْـجَلَالِ وَاْلإِكْرَام.',
    latin:
      '"ALLAHUMMA ANGTASSALAM, WAMINGKASSALAM, WA ILAYKA YA\'UUDUSSALAM FAKHAYYINA RABBANAA BISSALAAM WA-ADKHILNALJANNATA DAROSSALAAM TABAROKTA RABBANAA WATA\'ALAYTA YAA DZALJALAALI WAL IKRAAM"',
  },
  {
    id: '4',
    arab: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ. بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ. اَللهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَّلَانَوْمٌ، لَهُ مَافِي السَّمَاوَاتِ وَمَافِي اْلأَرْضِ مَن ذَا الَّذِيْ يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَابَيْنَ أَيْدِيْهِمْ وَمَاخَلْفَهُمْ وَلَا يُحِيْطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَآءَ، وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَاْلأَرْضَ وَلَا يَـؤدُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيْمُ',
    latin:
      "\"Allahu laa ilaaha illaa huwal hayyul qayyum. Laa ta'khudzuhuu sinatuw wa laa naum. Lahuu maa fis samaawaati wa maa fil ardh. Man dzal ladzii yasyfa'u 'indahuu illaa bi idznih. Ya'lamu maa bayna aidiihim wa maa khalfahum. Wa laa yuhiithuuna bi syai-im min 'ilmihii illaa bimaa syaa-a. Wasi'a kursiyyuhus samaawaati wal ardh walaa ya-uuduhuu hifzhuhumaa Wahuwal 'aliyyul 'azhiim.\"",
  },
  {
    id: '5',
    arab: 'سُبْحَانَ اللهِ',
    latin: '"SUBHANALLAH" 33x',
  },
  {
    id: '6',
    arab: 'الْحَمْدُلِله',
    latin: '"ALHAMDULILLAH" 33x',
  },
  {
    id: '7',
    arab: 'اللهُ اَكْبَر',
    latin: '"ALLAHU AKBAR" 33x',
  },
  {
    id: '8',
    arab: 'لَااِلٰهَ اِلَّا الله',
    latin: '"LAILAHA ILLALLAH" 33x',
  },
];

const DzikirSetSholat = () => {
  const {container, content} = darkModeColor();
  const sound = new Sound(
    require('../images/dzikirsetelahshalat.mp3'),
    Sound.MAIN_BUNDLE,
    error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    },
  );
  const onPlayPress = () => {
    sound.play(() => {
      console.log('Played');
    });
  };
  // const renderItem = ({item}) => <Item title={item.title} />;

  const Item = ({item}) => (
    <View
      style={[styles.item, {}]}
      className="space-y-3 border rounded-lg border-gray-500">
      <View className="flex-row gap-2 justify-between ">
        <Text
          style={{
            color: content,
          }}>
          {item.id}.
        </Text>
        <Text
          style={{
            color: content,
          }}
          className="text-xl">
          {item.arab}
        </Text>
      </View>
      <Text
        style={{
          color: content,
        }}>
        {item.latin}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: container}]}>
      <View className="flex-row gap-3 justify-center items-center my-3">
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
          onPress={() => sound.pause(() => console.log('paused'))}
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
      <FlatList data={DATA} renderItem={Item} keyExtractor={item => item.id} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  latin: {
    fontSize: 16,
  },
});

export default DzikirSetSholat;
