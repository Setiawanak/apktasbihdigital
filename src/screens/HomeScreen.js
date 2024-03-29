import {
  View,
  TextInput,
  Text,
  useColorScheme,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
  Alert,
  Modal,
  Pressable,
  Linking,
} from 'react-native';
import {Switch} from 'react-native-switch';
import React, {useState} from 'react';
import {store} from '../context';
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EnIcon from 'react-native-vector-icons/Entypo';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import messaging from '@react-native-firebase/messaging';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import {API} from '../api/config';

const HomeScreen = ({navigation}) => {
  const menuList = [
    {
      nama: 'Membaca Alquran',
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

  // console.log(firestore().collection('Users').get());

  // inisialisasi state
  const {state, dispatch} = store();
  const [searchText, setSearchText] = useState('');
  const [tempList, setTempList] = useState(menuList);
  const [modalVisible, setModalVisible] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));

  console.log(state.user);
  // funtion filter searching menu
  function SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = menuList.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.nama ? item.nama.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setSearchText(text);
    setTempList(newData);
  }

  const checkToken = async () => {
    const fcm = await messaging().getToken();
    const body = {
      registrationToken: fcm,
      message: `Ini adalah pengingat untuk jam ${time.getHours()} : ${time.getMinutes()}`,
    };

    API.post('notif', body)
      .then(response => {
        console.log(response);
        setModalVisible(false);
      })
      .catch(error => {
        console.log(error);
        setModalVisible(false);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: state.darkMode ? '#181a20' : 'white',
      }}>
      <StatusBar backgroundColor="#181a20" barstyle="light-content" />
      <View
        style={{
          flex: 1,
          margin: 20,
        }}>
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <EnIcon
              name="menu"
              size={30}
              color={state.darkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>

          <View className="flex-row items-center space-x-2">
            <Switch
              value={state.darkMode}
              onValueChange={val =>
                dispatch({type: 'SET_DARK_MODE', payload: val})
              }
              activeText={'On'}
              inActiveText={'Off'}
              circleSize={20}
              circleBorderWidth={3}
              backgroundActive={'#F4F5F9'}
              backgroundInactive={'#181a20'}
              circleActiveColor={'#181a20'}
              circleInActiveColor={'#F4F5F9'}
              changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
              innerCircleStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }} // style for inner animated circle for what you (may) be rendering inside the circle
              outerCircleStyle={{}} // style for outer animated circle
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
              switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
              switchBorderRadius={20} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
            />

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <McIcon
                name="bell-ring-outline"
                size={30}
                color={state.darkMode ? 'white' : 'black'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://youtube.com')}>
              <EnIcon
                name="youtube"
                size={30}
                color={state.darkMode ? 'white' : 'black'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Image
          style={{
            width: 50,
            height: 50,
            color: '#1E71A3',
            marginTop: 30,
            AlignItems: 'right',
            marginBottom: 20,
          }}
          source={require('../images/photobulat.png')}
        />

        <Text
          style={{
            color: state.darkMode ? '#F4F5F9' : '#181a20',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: -70,
            textAlign: 'right',
            marginBottom: 20,
          }}>
          HI {state.user?.name} !
        </Text>
        <Text
          style={{
            color: state.darkMode ? '#F4F5F9' : '#181a20',
            fontSize: 15,
            textAlign: 'right',
            marginTop: -10,
            marginBottom: 20,
          }}>
          Mau melakukan apa hari ini ?
        </Text>
        <View>
          <TextInput
            onChangeText={text => SearchFilterFunction(text)}
            style={{
              color: state.darkMode ? '#181a20' : '#F4F5F9',
              fontWeight: 'bold',
              backgroundColor: state.darkMode ? '#F4F5F9' : '#181a20',
              width: 360,
              paddingLeft: 40,
              borderRadius: 10,
              elevation: 10,
              marginBottom: 20,
            }}
            placeholderTextColor="green"
            placeholder="Membaca Alqur'an, Bertasbih, Berdoa"
            value={searchText}
          />
          <Text
            style={{
              color: state.darkMode ? '#F4F5F9' : '#181a20',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            LIST MENU :
          </Text>
        </View>

        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            fontSize: 30,
          }}></View>
        <FlatGrid
          style={{
            marginTop: -20,
            flex: 1,
            textColor: state.darkMode ? '#F4F5F9' : '#181a20',
          }}
          itemDimension={130}
          spacing={50}
          data={tempList}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.path)}
              style={{
                backgroundColor: state.darkMode ? '#F4F5F9' : '#181a20',
                height: 150,
                justifyContent: 'center',
                spacing: 100,
                alignItems: 'center',
                width: 250,
                borderRadius: 15,
                elevation: 3,
              }}>
              <ImageBackground
                source={item.image}
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: state.darkMode ? '#181a20' : '#F4F5F9',
                  }}>
                  {item.nama}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}>
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              borderWidth: 1,
            }}>
            <Text
              style={{
                marginBottom: 20,
                textAlign: 'center',
                color: 'black',
                fontWeight: 'bold',
              }}>
              Buat Pengingat
            </Text>

            <Text style={{textAlign: 'center', color: 'black'}}>Atur jam</Text>
            <Pressable
              style={[
                {
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  backgroundColor: 'gray',
                  marginBottom: 10,
                },
                {},
              ]}
              onPress={() => setTimePicker(true)}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  paddingHorizontal: 10,
                }}>
                {time.getHours().toString()} : {time.getMinutes().toString()}
              </Text>
            </Pressable>
            {timePicker && (
              <DateTimePicker
                mode="time"
                value={time}
                is24Hour={true}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                style={{
                  width: 200,
                  height: 50,
                  marginTop: 20,
                }}
                onChange={(event, value) => {
                  setTime(value);
                  setTimePicker(false);
                }}
              />
            )}
            <Pressable
              style={[
                {
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  backgroundColor: '#2196F3',
                  marginVertical: 10,
                },
                {},
              ]}
              onPress={checkToken}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Submit
              </Text>
            </Pressable>
            <Pressable
              style={[
                {
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  backgroundColor: 'red',
                },
                {},
              ]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Batal
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

/*<Text
  style={{
    color: '#FFFFFF',
    fontWeight: 'bold',
  }}>
  Belum Memiliki Akun?{' '}
  <TouchableOpacity>
    <Text
      style={{
        color: '#1E71A3',
        fontSize: 20,
      }}>
      Register
    </Text>
  </TouchableOpacity>
</Text>;*/

/*class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{backgroundColor: '#F98441', flex: 1}}>
        <StatusBar backgroundColor="#F98441" barstyle="light-conten" />
        <Text>HomeScreen</Text>
        <TouchableOpacity onPress={() => dispatch({type: 'LOGOUT'})}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}*/

export default HomeScreen;
