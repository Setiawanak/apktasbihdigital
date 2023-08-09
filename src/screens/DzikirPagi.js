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
    arab: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرُ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِيْ هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْ هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوْذُ بِكَ مِنَ الْكَسَلِ وَسُوْءِ الْكِبَرِ، رَبِّ أَعُوْذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.',
    latin:
      '"Ash-bahnaa wa ash-bahal mulku lillah walhamdulillah, laa ilaha illallah wahdahu laa syarika lah, lahul mulku walahul hamdu wa huwa ‘ala kulli syai-in qodir. Robbi as-aluka khoiro maa fii hadzal yaum wa khoiro as u ’dahu, wa a’udzu bika min syarri maa fii hadzal yaum wa syarri as u ’dahu. Robbi a’udzu bika minal kasali as u-il kibar. Robbi a’udzu bika min ‘adzabin fin naari wa ‘adzabin fil qobri."',
    artinya:
      '"Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji hanya milik Allah. Tidak ada ilah yang berhak diibadahi dengan benar kecuali Allah Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya pujian. Dia-lah Yang Mahakuasa atas segala sesuatu. Wahai Rabb, aku mohon kepada-Mu kebaikan di hari ini dan kebaikan sesudahnya. Aku berlindung kepada-Mu dari kejahatan hari ini dan kejahatan sesudahnya. Wahai Rabb, aku berlindung kepada-Mu dari kemalasan dan kejelekan di hari tua. Wahai Rabb, aku berlindung kepada-Mu dari siksaan di Neraka dan siksaan di kubur"',
  },
  {
    id: '7',
    arab: 'اَللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوْتُ وَإِلَيْكَ النُّشُوْرُ',
    latin:
      '"Allahumma bika ash-bahnaa wa bika amsaynaa wa bika nahyaa wa bika namuutu wa ilaikan nusyuur."',
    artinya:
      '"Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu pagi, dan dengan rahmat dan pertolongan-Mu kami memasuki waktu sore. Dengan rahmat dan kehendak-Mu kami hidup dan dengan rahmat dan kehendak-Mu kami mati. Dan kepada-Mu kebangkitan (bagi semua makhluk)"',
  },
  {
    id: '8',
    arab: 'اَللَّهُمَّ أَنْتَ رَبِّيْ لاَ إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوْبَ إِلاَّ أَنْتَ',
    latin:
      '"Allahumma anta robbii laa ilaha illa anta, kholaqtanii wa anaa ‘abduka wa anaa ‘ala ‘ahdika wa wa’dika mas-tatho’tu. A’udzu bika min syarri maa shona’tu. Abu-u laka bi ni’matika ‘alayya wa abu-u bi dzambii. Fagh-firlii fainnahu laa yagh-firudz dzunuuba illa anta."',
    artinya:
      '"Ya Allah, Engkau adalah Rabb-ku, tidak ada Ilah (yang berhak diibadahi dengan benar) kecuali Engkau, Engkau-lah yang menciptakanku. Aku adalah hamba-Mu. Aku akan setia pada perjanjianku dengan-Mu semampuku. Aku berlindung kepada-Mu dari kejelekan (apa) yang kuperbuat. Aku mengakui nikmat-Mu (yang diberikan) kepadaku dan aku mengakui dosaku, oleh karena itu, ampunilah aku. Sesungguhnya tidak ada yang dapat mengampuni dosa kecuali Engkau"',
  },
  {
    id: '9',
    arab: 'اَللَّهُمَّ عَافِنِيْ فِيْ بَدَنِيْ، اَللَّهُمَّ عَافِنِيْ فِيْ سَمْعِيْ، اَللَّهُمَّ عَافِنِيْ فِيْ بَصَرِيْ، لاَ إِلَـٰهَ إِلاَّ أَنْتَ. اَللَّهُمَّ إِنِّي أَعُوْذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوْذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لاَ إِلَـٰهَ إِلاَّ أَنْتَ',
    latin:
      '"Allaahumma ‘aafinii fii badanii, allaahumma ‘aafinii fii sam’ii, allaahumma ‘aafinii fii bashorii, laa ilaaha illaa anta. Allaahumma innii a’uudzu bika minal kufri wal faqr, wa a’uudzu bika min ‘adzaabil qobr, laa ilaaha illaa anta. (DIBACA 3X)"',
    artinya:
      '"Ya Allah, selamatkanlah tubuhku (dari penyakit dan dari apa yang tidak aku inginkan). Ya Allah, selamatkanlah pendengaranku (dari penyakit dan maksiat atau dari apa yang tidak aku inginkan). Ya Allah, selamatkanlah penglihatanku, tidak ada Ilah yang berhak diibadahi dengan benar kecuali Engkau. Ya Allah, sesungguhnya aku berlindung kepada-Mu dari kekufuran dan kefakiran. Aku berlindung kepada-Mu dari siksa kubur, tidak ada Ilah yang berhak diibadahi dengan benar kecuali Engkau"',
  },
  {
    id: '10',
    arab: 'اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَاْلآخِرَةِ، اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِيْنِيْ وَدُنْيَايَ وَأَهْلِيْ وَمَالِيْ اللَّهُمَّ اسْتُرْ عَوْرَاتِى وَآمِنْ رَوْعَاتِى. اَللَّهُمَّ احْفَظْنِيْ مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِيْ، وَعَنْ يَمِيْنِيْ وَعَنْ شِمَالِيْ، وَمِنْ فَوْقِيْ، وَأَعُوْذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِيْ',
    latin:
      '"Allahumma innii as-alukal ‘afwa wal ‘aafiyah fid dunyaa wal aakhiroh. Allahumma innii as-alukal ‘afwa wal ‘aafiyah fii diinii wa dun-yaya wa ahlii wa maalii. Allahumas-tur ‘awrootii wa aamin row’aatii. Allahummahfazh-nii mim bayni yadayya wa min kholfii wa ‘an yamiinii wa ‘an syimaalii wa min fawqii wa a’udzu bi ‘azhomatik an ughtala min tahtii."',
    artinya:
      '"Ya Allah, sesungguhnya aku memohon kebajikan dan keselamatan di dunia dan akhirat. Ya Allah, sesungguhnya aku memohon kebajikan dan keselamatan dalam agama, dunia, keluarga dan hartaku. Ya Allah, tutupilah auratku (aib dan sesuatu yang tidak layak dilihat orang) dan tentramkan-lah aku dari rasa takut. Ya Allah, peliharalah aku dari depan, belakang, kanan, kiri dan dari atasku. Aku berlindung dengan kebesaran-Mu, agar aku tidak disambar dari bawahku (aku berlindung dari dibenamkan ke dalam bumi)"',
  },
  {
    id: '11',
    arab: 'اَللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَاْلأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيْكَهُ، أَشْهَدُ أَنْ لاَ إِلَـهَ إِلاَّ أَنْتَ، أَعُوْذُ بِكَ مِنْ شَرِّ نَفْسِيْ، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِيْ سُوْءًا أَوْ أَجُرُّهُ إِلَى مُسْلِمٍ',
    latin:
      '"Allahumma ‘aalimal ghoybi wasy syahaadah faathiros samaawaati wal ardh. Robba kulli syai-in wa maliikah. Asyhadu alla ilaha illa anta. A’udzu bika min syarri nafsii wa min syarrisy syaythooni wa syirkihi, wa an aqtarifa ‘alaa nafsii suu-an aw ajurruhu ilaa muslim"',
    artinya:
      '"Ya Allah Yang Mahamengetahui yang ghaib dan yang nyata, wahai Rabb Pencipta langit dan bumi, Rabb atas segala sesuatu dan Yang Merajainya. Aku bersaksi bahwa tidak ada Ilah yang berhak diibadahi dengan benar kecuali Engkau. Aku berlindung kepada-Mu dari kejahatan diriku, syaitan dan ajakannya menyekutukan Allah (aku berlindung kepada-Mu) dari berbuat kejelekan atas diriku atau mendorong seorang muslim kepadanya"',
  },
  {
    id: '12',
    arab: 'بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي اْلأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيْعُ الْعَلِيْمُ',
    latin:
      '"Bismillahilladzi laa yadhurru ma’asmihi syai-un fil ardhi wa laa fis samaa’ wa huwas samii’ul ‘aliim.(DIBACA 3X)"',
    artinya:
      '"Dengan Menyebut Nama Allah, yang dengan Nama-Nya tidak ada satu pun yang membahayakan, baik di bumi maupun di langit. Dia-lah Yang Maha Mendengar dan Maha Mengetahui"',
  },
  {
    id: '13',
    arab: 'رَضِيْتُ بِاللهِ رَبًّا، وَبِاْلإِسْلاَمِ دِيْنًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    latin:
      '"Rodhiitu billaahi robbaa wa bil-islaami diinaa, wa bi-muhammadin shallallaahu ‘alaihi wa sallama nabiyya. (DIBACA 3X)"',
    artinya:
      '"Aku rela (ridha) Allah sebagai Rabb-ku (untukku dan orang lain), Islam sebagai agamaku dan Muhammad Shallallahu alaihi wassallam sebagai Nabiku (yang diutus oleh Allah)"',
  },
  {
    id: '14',
    arab: 'يَا حَيُّ يَا قَيُّوْمُ بِرَحْمَتِكَ أَسْتَغِيْثُ، أَصْلِحْ لِيْ شَأْنِيْ كُلَّهُ وَلاَ تَكِلْنِيْ إِلَى نَفْسِيْ طَرْفَةَ عَيْنٍ',
    latin:
      '"Yaa Hayyu Yaa Qoyyum, bi-rohmatika as-taghiits, wa ash-lih lii sya’nii kullahu wa laa takilnii ilaa nafsii thorfata ‘ain."',
    artinya:
      '"Wahai Rabb Yang Maha hidup, Wahai Rabb Yang Maha berdiri sendiri (tidak butuh segala sesuatu) dengan rahmat-Mu aku meminta pertolongan, perbaikilah segala urusanku dan jangan diserahkan (urusanku) kepada diriku sendiri meskipun hanya sekejap mata (tanpa mendapat pertolongan dari-Mu)"',
  },
  {
    id: '15',
    arab: 'أَصْبَحْنَا عَلَى فِطْرَةِ اْلإِسْلاَمِ وَعَلَى كَلِمَةِ اْلإِخْلاَصِ، وَعَلَى دِيْنِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ، حَنِيْفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِيْنَ',
    latin:
      '"Ash-bahnaa ‘ala fithrotil islaam wa ‘alaa kalimatil ikhlaash, wa ‘alaa diini nabiyyinaa Muhammadin shallallahu ‘alaihi wa sallam, wa ‘alaa millati abiina Ibraahiima haniifam muslimaaw wa maa kaana minal musyrikin"',
    artinya:
      '"Di waktu pagi kami berada diatas fitrah agama Islam, kalimat ikhlas, agama Nabi kami Muhammad Shallallahu alaihi wassallam dan agama ayah kami, Ibrahim, yang berdiri di atas jalan yang lurus, muslim dan tidak tergolong orang-orang musyrik"',
  },
  {
    id: '16',
    arab: 'لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرُ.',
    latin:
      '"Laa ilaha illallah wahdahu laa syarika lah, lahul mulku walahul hamdu wa huwa ‘ala kulli syai-in qodiir. (Dibaca pagi 1 atau 10 atau 100 kali)"',
    artinya:
      '"Tidak ada Ilah yang berhak diibadahi dengan benar selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala puji. Dan Dia Mahakuasa atas segala sesuatu"',
  },
  {
    id: '17',
    arab: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
    latin:
      '"Subhaanallaahi wa bihamdihi ‘adada kholqih, wa ridhoo nafsih, wa zinata ‘arsyih, wa midaada kalimaatih (Dibaca 3x)"',
    artinya:
      '"Maha Suci Allah, aku memuji-Nya sebanyak makhluk-Nya, sesuai keridhaan-Nya, seberat timbangan arasy-Nya dan sebanyak tinta (yang menulis) kalimat-Nya."',
  },
  {
    id: '18',
    arab: 'اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلاً مُتَقَبَّلاً',
    latin:
      '"Allaahumma innii as-aluka ‘ilman naafi‘an, wa rizqon thoyyiban, wa ‘amalan mutaqobbalan (Dibaca 3x)"',
    artinya:
      '"Ya Allah, sesungguhnya aku memohon kepadaMu ilmu yang bermanfaat, rizki yang halal dan amal yang diterima."',
  },
  {
    id: '19',
    arab: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    latin: '"Subhaanallaahi wa bihamdih (DIBACA 100X)"',
    artinya:
      '"Ya Allah, sesungguhnya aku memohon kepadaMu ilmu yang bermanfaat, rizki yang halal dan amal yang diterima."',
  },
  {
    id: '20',
    arab: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوْبُ إِلَيْهِ',
    latin: '"Astaghfirullaaha wa atuubu ilaih (DIBACA 100X)"',
    artinya: '"Aku memohon ampun kepada Allah dan bertaubat kepadaNya."',
  },
];

const DzikirPagi = () => {
  const {container, content} = darkModeColor();
  const sound = new Sound(
    require('../images/dzikirpagi.mp3'),
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
        <Text className="text-lg font-bold text-black">Dzikir Pagi</Text>
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

export default DzikirPagi;
