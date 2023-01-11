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
    title: `بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم

اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِيْنَ. حَمْدًا يُوَافِيْ نِعَمَهُ وَيُكَافِئُ مَزِيْدَهُ. يَا رَبَّنَا لَكَ الْحَمْدُ كَمَا يَنْبَغِيْ لِجَلاَلِ وَجْهِكَ الْكَرِيْمِ وَعَظِيْمِ سُلْطَانِكَ`,
    latin:
      "\"BISMILLAHIRRAHMAANIRRAHIIM. ALHAMDU LILLAAHI RABBIL 'AALAMIIN, HAMDAN YUWAAFII NI'AMAHU WAYUKAAFII MAZIIDAHU. YA RABBANAA LAKAL HAMDU KAMAA YAN BAGHHI LIJALAALI WAJHIKA WA'AZHIIMI SULTHAANIKA.\"",
  },
  {
    id: '2',
    title: 'اللهم صل على سيدنا محمد وعلى ال سيدنا محمد',
    latin:
      '"ALLAHUMMA SHALLI \'ALAA SAYYIDINAA MUHAMMADIN WA\'ALAA AALI SAYYIDINAA MUHAMMAD".',
  },
  {
    id: '3',
    title:
      'اَللَّهُمَّ رَبَّنَا تَـقَـبَّلْ مِنَّا صَلاَتَنَا وَصِيَا مَنَا وَرُكُوْ عَنَا وَسُجُوْدَنَا وَقُعُوْدَنَا وَتَضَرُّ عَنَا وَتَخَشُّوْ عَنَا وَتَعَبُّدَنَا وَتَمِّمْ تَقْصِيْرَ نَا يَا اَلله يَا رَبَّ الْعَا لَمِيْنَ',
    latin:
      "\"ALLAHUMMA RABBANAA TAQABBAL MINNAA SHALAATAANA WASHIYAAMANAA WARUKUU'ANAA WASUJUUDANAA WAQU'UUDANAA WATADLARRU'ANAA, WATAKHASYSYU'ANAA WATA'ABBUDANAA, WATAMMIM TAQSHIIRANAA YAA ALLAH YAA RABBAL'AALAMIIN\"",
  },
  {
    id: '4',
    title:
      'رَبَّنَا ضَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْ حَمْنَا لَنَكُوْ نَنَّ مِنَ الْخَا سِرِ يْنَ',
    latin:
      'RABBANA DZHALAMNAA ANFUSANAA WA-INLAMTAGHFIR LANA WATARHAMNAA LANAKUUNANNA MlNAL KHAASIRIIN',
  },
  {
    id: '5',
    title:
      'رَبَّنَا وَلاَ تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِ يْنَ مِنْ قَبْلِنَا',
    latin:
      '"RABBANAA WALAA TAHMIL\'ALAINAA ISHRAN KAMA HAMALTAHUL\'ALAL LADZIINA MIN QABLINAA."',
  },
  {
    id: '6',
    title:
      'رَبَّنَا وَلاَ تُحَمِّلْنَا مَا لاَ طَا قَتَا لَنَا بِهِ, وَاعْفُ عَنَّا وَاغْفِرْلَنَا وَارْحَمْنَا أَنْتَ مَوْلاَ نَا فَا نْصُرْنَا عَلَى الْقَوْمِ الْكَا فِرِيْنَ',
    latin:
      "\"RABBANAA WALAA TUHAMMILNAA MAALAA THAAQATA LANAA BIHII WA'FU'ANNAA WAGHFIR LANAA WARHAMNAA ANTA MAULAANAA FANSHURNAA 'ALAL QAUMIL KAAFIRIIN\"",
  },
  {
    id: '7',
    title:
      'رَبَّنَا لاَ تُزِغْ قُلُوْ بَنَا بَعْدَ إِذْ هَدَ يْتَنَا وَهَبْ لَنَا مِنْ لَّدُ نْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ',
    latin:
      '"RABBANAA LAA TUZIGH QULUUBANAA BA\'DA IDZHADAITANAA W\'AHABLANAA MIN LADUNKA RAHMATAN INNAKA ANTAL WAHHAAB"',
  },
  {
    id: '8',
    title:
      'رَبَّنَا غْفِرْلَنَا وَلِوَالِدِيْنَ وَلِجَمِيْعِ الْمُسْلِمِيْنَ وَالْمُسْلِمَاتِ وَالْمُؤْمِنِيْنَ وَالْمُؤْمِنَاتِ أَلْأَ حْيَآءِمِنْهُمْ وَاْلأَ مْوَاتِ, اِنَّكَ عَلَى قُلِّ ثَيْءٍقَدِيْرِ',
    latin:
      "\"RABBANAGHFIR LANAA WALIWAALIDINAA WALIJAMI'IL MUSLIMIIN WALMUSLIMAATI WAL MU'MINIINA WALMU'MINATI. AL AHYAA-I-MINHUM WAL AMWAATI, INNAKA ALAA KULI SYAI'N QADIIR\"",
  },
  {
    id: '9',
    title:
      'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي اْلآ خِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin:
      '"RABBANAA AATINAA FIDDUNYAA HASANATAN WAFIL AAKHIRATI HASANATAN WAQINAA ADZAABAN-NAAR"',
  },
  {
    id: '10',
    title: '    اللهم اغفر لنا ذنوبناوكفرعنا سيئاتنا وتوفنا مَعَ الْأَ بْرَارِ',
    latin:
      '"ALLAHUMMAGHFIRLANAA DZUNUUBANAA WAKAFFIR ANNAA SAYYIAATINAA WATAWAFFANAA MAALABRAARI"',
  },
  {
    id: '11',
    title:
      'سُبْحَانَ رَبِّكِ رَبِّ الْعِزَةِ عَمَّا يَصِفُوْنَ، وَسَلاَمٌ عَلَى الْمُرْ سَلِيْنَ، وَالْحَمْدُ لِلهِ رَبِّ الْعَالَمِيْنَ',
    latin:
      "\"SUBHAANA RABBIKA RABBIL I'ZZATI AMMAA YASHIFUUNA WASALAAMUN 'ALAL MURSALHNA WAL-HAMDU LILLAAHI RABBIL'AALAMIINA\"",
  },
];

const App = () => {
  const {container, content} = darkModeColor();
  const sound = new Sound(
    require('../images/doasetelahdzikir.mp3'),
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
      className="space-y-3  border rounded-lg border-gray-500">
      <View className="flex-row gap-2 justify-between">
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
          {item.title}
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
    fontSize: 32,
  },
  latin: {
    fontSize: 16,
  },
});

export default App;
