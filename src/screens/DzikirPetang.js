import React, {
  Component,
  useState,
  UseState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
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
    arab: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    latin: '"Audzubillahiminasyaitonirojim bismillahirohmanirohim"',
    artinya: '"Aku berlindung kepada Allah dari godaan setan yang terkutuk"',
  },
  {
    id: '2',
    arab: ' اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ، لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ، لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ، مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ، يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ، وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلاَّ بِمَا شَاءَ، وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ، وَلَا يَئُودُهُ حِفْظُهُمَا، وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin:
      '"Allahu laa ilaa haillaa huwa hayyul qoyyuum, laa ta’khudzu sinatuu wa laa naum, lahuu maa fissamaawaati wamaa fil ardhi, mandzalladzii yasyfa’u ‘indahu illaa bi’idznihi ya’lamu maa baina aidiihim wa maa khalfahum, wa laa yukhiithuuna bi syai’im min ‘ilmihi illa bi maa syaa’, wa si’a kursiyyuhus samaawaati wal ardhi, wa laa yaudhuhu hifdzu humaa wa huwal aliyyul ‘adhiim."',
    artinya:
      '"Allah tidak ada Ilah (yang berhak diibadahi) melainkan Dia Yang Hidup Kekal lagi terus menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang ada di langit dan di bumi. Tidak ada y ang dapat memberi syafa’at di sisi Allah tanpa izin-Nya. Allah mengetahui apa-apa yang (berada) dihadapan mereka, dan dibelakang mereka dan mereka tidak mengetahui apa-apa dari Ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi Allah meliputi langit dan bumi. Dan Allah tidak merasa berat memelihara keduanya, Allah Mahatinggi lagi Mahabesar"',
  },
  {
    id: '3',
    arab: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم , قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    latin:
      '"Qul huwal laahu ahad Allah hus-samad lam yalid wa lam yoolad wa lam yakul-lahu kufuwan ahad (DIBACA 3X)"',
    artinya:
      '"Katakanlah: ’Aku berlindung kepada Rabb Yang Menguasai Subuh, dari kejahatan makhluk-Nya, dan dari kejahatan malam apabila telah gelap gulita, dan dari kejahatan wanita-wanita tukang sihir yang menghembus pada buhul-buhul, dan dari kejahatan pendengki bila ia dengki"',
  },
  {
    id: '4',
    arab: ' بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ , قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِن شَرِّ مَا خَلَقَ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ',
    latin:
      '"Qul a’uzuu bi rabbil-falaq min sharri ma khalaq wa min sharri ghasiqin iza waqab wa min sharrin-naffaa-thaati fil ‘uqad wa min shar ri haasidin iza hasad (DIBACA 3X)"',
    artinya:
      '"Katakanlah, Dia-lah Allah Yang Maha Esa. Allah adalah (Rabb) yang segala sesuatu bergantung kepada-Nya. Dia tidak beranak dan tidak pula diperanakkan. Dan tidak ada seorang pun yang setara dengan-Nya "',
  },
  {
    id: '5',
    arab: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ , قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَهِ النَّاسِ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَ النَّاسِ',
    latin:
      '"Qul a’uzu birabbin naas malikin naas Ilaahin naas min sharril was waasil khannaas Al lazee yuwas wisu fee sudoorin naas minal jinnati wan naas (DIBACA 3X)"',
    artinya:
      '"Katakanlah: ’Aku berlindung kepada Rabb (yang memelihara dan menguasai) manusia. Raja manusia. Sembahan (Ilah) manusia. Dari kejahatan (bisikan) setan yang biasa bersembunyi. Yang membisikkan (kejahatan) ke dalam dada-dada manusia. Dari golongan jin dan manusia"',
  },
  {
    id: '6',
    arab: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ للهِ، وَالْحَمْدُ للهِ، لَا إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُبِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُبِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُبِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    latin:
      '"Amsaynaa wa amsal mulku lillah walhamdulillah, laa ilaha illallah wahdahu laa syarika lah, lahul mulku walahul hamdu wa huwa ‘ala kulli syai-in qodir. Robbi as-aluka khoiro maa fii hadzihil lailah wa khoiro maa ba’dahaa, wa a’udzu bika min syarri maa fii hadzihil lailah wa syarri maa ba’dahaa. Robbi a’udzu bika minal kasali wa suu-il kibar. Robbi a’udzu bika min ‘adzabin fin naari wa ‘adzabin fil qobri.',
    artinya:
      '"Kami telah memasuki waktu petang dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada ilah (yang berhak disembah) kecuali Allah semata, tiada sekutu bagi-Nya. Milik Allah kerajaan dan bagi-Nya pujian. Dia-lah Yang Mahakuasa atas segala sesuatu.Wahai Rabbku, aku mohon kepada-Mu kebaikan di malam ini dan kebaikan sesudahnya. Aku berlindung kepadaMu dari kejahatan malam ini dan kejahatan sesudahnya. Wahai Rabbku, aku berlindung kepadaMu dari kemalasan dan kejelekan di hari tua. Wahai Rabbku, aku berlindung kepada-Mu dari siksaan di neraka dan siksaan di kubur"',
  },
  {
    id: '7',
    arab: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا،وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيْرُ',
    latin:
      '"Allahumma bika amsaynaa wa bika ash-bahnaa wa bika nahyaa wa bika namuutu wa ilaikal mashiir.',
    artinya:
      '"Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu petang, dan dengan rahmat dan pertolongan-Mu kami memasuki waktu pagi. Dengan rahmat dan pertolonganMu kami hidup dan dengan kehendakMu kami mati. Dan kepada-Mu tempat kembali (bagi semua makhluk)."',
  },
  {
    id: '8',
    arab: 'اَللَّهُمَّ أَنْتَ رَبِّيْ لاَ إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوْبَ إِلاَّ أَنْتَ',
    latin:
      '"Allahumma anta robbii laa ilaha illa anta, kholaqtanii wa anaa ‘abduka wa anaa ‘ala ‘ahdika wa wa’dika mas-tatho’tu. A’udzu bika min syarri maa shona’tu. Abu-u laka bi ni’matika ‘alayya wa abu-u bi dzambii. Fagh-firlii fainnahu laa yagh-firudz dzunuuba illa anta.',
    artinya:
      '"Ya Allah, Engkau adalah Rabbku, tidak ada ilah yang berhak disembah kecuali Engkau, Engkaulah yang menciptakanku. Aku adalah hamba-Mu. Aku akan setia pada perjanjianku pada-Mu (yaitu aku akan mentauhidkan-Mu) semampuku dan aku yakin akan janji-Mu (berupa surga untukku). Aku berlindung kepada-Mu dari kejelekan yang kuperbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku. Oleh karena itu, ampunilah aku. Sesungguhnya tiada yang mengampuni dosa kecuali Engkau"',
  },
  {
    id: '9',
    arab: 'اللَّهُمَّ عَافِنِى فِى بَدَنِى اللَّهُمَّ عَافِنِى فِى سَمْعِى اللَّهُمَّ عَافِنِى فِى بَصَرِى لاَ إِلَهَ إِلاَّ أَنْتَ ، اَللّٰھُمَّ اِنِّیْ اَعُوْذُبِکَ مِنَ الْکُفْرِ وَالْفَقْرِ ، اَللّٰھُمَّ اِنِّی اَعُوْذُ بِکَ مِنَ عَذَابِ الْقَبْرِ، لَا اِلَہَ اِلَّا اَنْتَ',
    latin:
      '"Allahumma ‘afini fi badani, allahumma ‘afini fi sam’i, allahumma ‘afini fi bashori la ilaha illa anta. Allahumma inni a‘udzubika minal kufri wal faqri wa a‘udzubika min ‘ adzabilqabri, laa ilaha illa anta.  (DIBACA 3X).',
    artinya:
      '"Ya Allah, selamatkan tubuhku (dari penyakit dan yang tidak aku inginkan), Ya Allah selamatkan pendengaranku (dari penyakit dan maksiat atau sesuatu yang tidak aku inginkan), Ya Allah selamatkan penglihatanku. Tiada Ilah (yang berhak diibadahi) kecuali engkau ya Allah. Sesungguhnya aku berlindung kepadaMU dari kekufuran dan kekafiran, Aku berlindung kepadaMu dari siksa kubur (tiada Ilah yang berhak diibadahi) kecuali Engkau"',
  },
  {
    id: '10',
    arab: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَاْلاَخِرَةِ، اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِيْ دِيْنِيْ وَدُنْيَايَ وَأَهْلِيْ وَمَالِيْ، اَللّٰهُمَّ اسْتُرْ عَوْرَاتِيْ وَاٰمِنْ رَوْعَاتِيْ ',
    latin:
      '"Allâhumma innî as-alukal ‘âfiyah fid dunyâ wal âkhirah, allâhumma innî as-alukal ‘afwa wal âfiyah fî dînî wadunyâya wa ahlî wa mâlî, allâhumma-stur ‘aurâtî wa âmin rau‘âtî.',
    artinya:
      '"“Ya Allah, aku memohon keselamatan di dunia dan akhirat. Ya Allah aku memohon kebajikan dan keselamatan dalam agama, dunia, keluarga, dan hartaku. Ya Allah, tutupilah auratku (aib dan sesuatu yang tidak layak dilihat orang) dan tenteramkanlah aku dari rasa takut…” (Imam Nawawi, "',
  },
  {
    id: '11',
    arab: 'اَللَّهُمَّ احْفَظْنِيْ مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِيْ، وَعَنْ يَمِيْنِيْ وَعَنْ شِمَالِيْ، وَمِنْ فَوْقِيْ، وَأَعُوْذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِيْ',
    latin:
      '"Allahummahfazh-nii mim bayni yadayya wa min kholfii wa ‘an yamiinii wa ‘an syimaalii wa min fawqii wa a’udzu bi ‘azhomatik an ughtala min tahtii.',
    artinya:
      '"“Ya Allah, peliharalah aku dari muka, belakang, kanan, kiri dan atasku. Aku berlindung dengan kebesaran-Mu, agar aku tidak disambar dari bawahku (oleh ular atau tenggelam dalam bumi dan lain-lain yang membuat aku jatuh)"',
  },
  {
    id: '12',
    arab: 'اللَّهُمَّ عَالِمَ الغَيبِ وَالشَّهَادَةِ فَاطِرَ السَمَاوَاتِ وَالأَرْضِ رَبَّ كُلَّ شَيءٍ وَمَلِيكَهُ أَشهَدُ أن لاَإِلَهَ إِلاَّ أنتَ أّعُوذُ بِكَ مِن شَرِّ نَفسِي وَمِن شَرِّ الشَّيطَانِ وَشِركِهِ وَأَن أَقتَرِفَ عَلَى نَفسِي سُوءًا أوْ أَجُرَّهُ إلى مُسلِمٍ',
    latin:
      '"Allahumma ‘aalimal ghoibi wasy syahaadah faathiross samaawaati wal ardh. robba kulli syai-in wa maliikahu Asyhadu alla ilaaha illaa anta a’udzubika  minsyarri nafsii wa min syarrisy syaithooni wa syirkih wa an aqtarifa ‘ala nafsii suu-an aw ajurrohu ilaa muslimin.',
    artinya:
      '"Ya Allah yang Maha Mengetahui sesuatu yang ghaib dan yang nyata, wahai rabb pencipta langit dan bumi, Rabb segala sesuatu dan yang merajainya, Aku bersaksi bahwa tiada ilah (yang berhak diibadahi dengan benar) kecuali Engkau, Aku berlindung kepadamu dari kejahatan diriku, kejahatan syaitan dan ajakannya menyekutukan Allah, dan (aku berlindungkepadamu) dari berbuat keburukan atas diriku, atau mendorong seorang muslim padanya (berbuat keburukan tersebut)."',
  },
  {
    id: '13',
    arab: 'بِسمِ اللَّهِ الَّذِي لاَيَضُرُّ مَعَ اسْمِهِ شَيءٌ فِي الأَرضِ وَلاَ في السَمَاءِ وَهُوَ السَّمِيعُ العَليمُ',
    latin:
      '"Bismillahilladzii laa yadhurru ma ‘asmihi syai-un fil ardhi wa laa fiss samaa’ wa huwas samii’ul a’liim(DIBACA 3X).',
    artinya:
      '"Dengan menyebut nama Allah yang dengan Namanya tidak ada sesuatupun yang dapat membahanyakan baik yang dibumi maupun dilangit, Dialah yang Maha Mendengar dan yang Maha Mengetahui.."',
  },
  {
    id: '14',
    arab: 'رَضِيتُ بِاللَّهِ رَبَّا وَبِالإِسْلاَمِ دِينًا وَبِمُحَمَّدٍ صَلَّى الله عَلَيهِ وَسَلَمَ نَبِيًّا',
    latin:
      '"Radhiitu billahi rabbaa wabil islaami diinaa wabimuhammadin sallahu alaihi wasalam (DIBACA 3X).',
    artinya:
      '"Aku ridho (rela) Allah sebagai rabbku, Islam sebagai agamaku, dan Muhammad ﷺ sebagai nabiku."',
  },
  {
    id: '15',
    arab: 'يَاحَيُّ يَاقَيُّومُ بِرَحْمَتِكَ أَسْتَغِيْثُ أَصْلِحْ لِي شَأْنِيْ كُلَّهُ وَلاَتَكِلنِي إلاَ نَفسِي طَرْفَةَ عَيْنٍ',
    latin:
      '"Yaa Hayyu Yaa Qoyyuum birahmatika astaghiitsu ash-lih lii syaniikullahu wa laa takilnii illaa nafsii thorfata ‘ainin..',
    artinya:
      '"Wahai Rabb yang Maha Hidup, yang Maha Berdiri sendiri (tidak butuh segala sesuatu), dengan rahmatmu aku meminta pertolongan, Perbaikilah segala keadaan dan urusanku, jangan Engkau serahkan aku kepada diriku meski sekejap mata sekalipun (tanpa mendapat pertolonganmu)."',
  },
  {
    id: '16',
    arab: 'أَمْسَيْنَا عَلَى فِطْرَةِ اْلإِسْلاَمِ وَعَلَى كَلِمَةِ اْلإِخْلاَصِ، وَعَلَى دِيْنِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ، حَنِيْفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِيْنَ',
    latin:
      '"Amsainaa ‘alaa fithrotil islam wa ‘alaa kalimatil ikhlas wa ‘alaa diini nabiyyinaa muhammad shallahu ‘alaihi wasallam wa ‘alaa millati abiinaa ibrohiim haniifam muslimaw wa maa kaana minal musyrikiin.',
    artinya:
      '"Di waktu petang kami berada di atas fitrah Islam, di atas kalimat ikhlas (syahadatain), di atas agama Nabi kita Muhammad صلى الله عليه وسلم, dan di atas agama ayah kami, Ibrahim, yang berdiri di atas jalan yang lurus, muslim dan tidak tergolong orang-orang musyrik."',
  },
  {
    id: '17',
    arab: 'لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرُ',
    latin:
      '"Laa ilaha illallah wahdahu laa syarika lah, lahul mulku walahul hamdu wa huwa ‘ala kulli syai-in qodiir (DIBACA 10X).',
    artinya:
      '"Tidak ada ilah yang berhak disembah selain Allah semata, tidak ada sekutu bagi-Nya. Bagi-Nya kerajaan dan segala pujian. Dia-lah yang berkuasa atas segala sesuatu."',
  },
  {
    id: '18',
    arab: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    latin: '"Subhaanallaahi wa bihamdih (DIBACA 100X)"',
    artinya:
      '"Ya Allah, sesungguhnya aku memohon kepadaMu ilmu yang bermanfaat, rizki yang halal dan amal yang diterima."',
  },
  {
    id: '19',
    arab: 'أَعُوْذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    latin:
      '"A’udzu bikalimaatillahit-taammaati min syarri maa kholaq.(DIBACA 3X)"',
    artinya:
      '"Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang diciptakan-Nya."',
  },
];

const DzikirPetang = () => {
  const {container, content} = darkModeColor();
  const sound = new Sound(
    require('../images/dzikirpetang.mp3'),
    Sound.MAIN_BUNDLE,
    error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    },
  );
  useEffect(() => {
    return () => sound.stop();
  }, []);
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
      <Text
        style={{
          color: content,
        }}>
        Artinya :
      </Text>
      <Text
        style={{
          color: content,
        }}>
        {item.artinya}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: container}]}>
      <View className="flex-row gap-3 justify-center items-center my-3">
        <Text className="text-lg font-bold text-black">Dzikir Petang</Text>
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
        <TouchableOpacity
          onPress={() => sound.stop(() => console.log('stop'))}
          style={{
            backgroundColor: '#6B6565',
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <Icon name="stop" size={20} color="#FFFFFF" />
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

export default DzikirPetang;
