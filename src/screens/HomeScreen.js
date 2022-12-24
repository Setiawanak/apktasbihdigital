import {
  View,
  TextInput,
  Text,
  useColorScheme,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import {Switch} from 'react-native-switch';
import React, {useState} from 'react';
import {store} from '../context';
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EnIcon from 'react-native-vector-icons/Entypo';

//onst [filter, setFilter] = useState('');

const HomeScreen = ({navigation}) => {
  const {state, dispatch} = store();
  const [isDark, setIsDark] = useState(state.darkMode);

  const menuList = [
    {
      nama: 'Membaca Alquran',
      image: require('../images/alquran.png'),
      path: 'Alquran',
    },
    {
      nama: 'Bertasbih',
      image: require('../images/tasbih.jpg'),
      path: 'Bertasbih',
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: state.darkMode ? '#181a20' : 'white',
      }}>
      <StatusBar backgroundColor="#181a20" barstyle="light-conten" />
      <View
        style={{
          flex: 1,
          margin: 20,
        }}>
        <View className="flex-row justify-between items-center mt-3">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <EnIcon name="menu" size={30} color="black" />
          </TouchableOpacity>

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
            color: isDark ? '#F4F5F9' : '#181a20',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: -70,
            textAlign: 'right',
            marginBottom: 20,
          }}>
          HI {state.user.nama_pentasbih} !
        </Text>
        <Text
          style={{
            color: isDark ? '#F4F5F9' : '#181a20',
            fontSize: 15,
            textAlign: 'right',
            marginTop: -10,
            marginBottom: 20,
          }}>
          Mau melakukan apa hari ini ?
        </Text>
        <View>
          <TextInput
            onChangeText={text => text}
            style={{
              color: isDark ? '#181a20' : '#F4F5F9',
              fontWeight: 'bold',
              backgroundColor: isDark ? '#F4F5F9' : '#181a20',
              width: 275,
              paddingLeft: 40,
              borderRadius: 10,
              elevation: 10,
              marginBottom: 20,
            }}
            placeholderTextColor="green"
            placeholder="Membaca Alqur'an, Bertasbih"
          />
        </View>

        <TextInput
          onChangeText={text => text}
          style={{
            backgroundColor: isDark ? '#F4F5F9' : '#181a20',
            width: 50,
            paddingLeft: 40,
            borderRadius: 10,
            marginLeft: 300,
            elevation: 300,
            marginTop: -70,
          }}
        />
        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            fontSize: 30,
          }}>
          <Text
            style={{
              color: isDark ? '#F4F5F9' : '#181a20',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            MENU :
          </Text>
        </View>
        <FlatGrid
          style={{
            marginTop: -30,
            flex: 1,
            textColor: isDark ? '#F4F5F9' : '#181a20',
          }}
          itemDimension={130}
          spacing={50}
          data={menuList}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.path)}
              style={{
                backgroundColor: isDark ? '#F4F5F9' : '#181a20',
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
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: isDark ? '#181a20' : '#F4F5F9',
                  }}>
                  {item.nama}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
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
