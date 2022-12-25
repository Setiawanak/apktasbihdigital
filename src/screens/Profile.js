import React, {Component, useEffect, useState, UseState} from 'react';
import {
  View,
  TextInput,
  Text,
  useColorScheme,
  TouchableOpacity,
  StatusBar,
  Image,
  Share,
} from 'react-native';
import {Switch} from 'react-native-switch';
import {store} from '../context';
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getHistory} from '../api/call';
import {FlatList} from 'react-native-gesture-handler';
import EnIcon from 'react-native-vector-icons/Entypo';
import COLORS, {darkModeColor} from '../conts/colors';

const Profile = ({navigation}) => {
  const {state, dispatch} = store();
  const {container, content} = darkModeColor();
  const [data, setData] = useState([]);
  const getList = async () => {
    const history = await getHistory(state.user.id);

    setData(history);
  };

  useEffect(() => {
    getList();
  }, [navigation.isFocused()]);

  const onShare = async val => {
    try {
      const result = await Share.share({
        message: val,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: container}}>
      <StatusBar backgroundColor="#181a20" barstyle="light-content" />
      <View className="flex-row p-5 justify-between bg-[#181a20]">
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <EnIcon name="menu" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch({type: 'LOGOUT'})}>
          <EnIcon name="log-out" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: '#181a20',
          padding: 20,
        }}>
        {/* <TouchableOpacity>
            <Icon name="arrow-left" size={20} color="#FFFFFF" />
          </TouchableOpacity> */}
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              justifyContent: 'center',
              allignItems: 'center',
            }}>
            <Text
              style={{
                color: '#F4F5F9',
                fontSize: 28,
                fontWeight: 'bold',
                textAlign: 'left',
              }}>
              HI {state.user.nama_pentasbih} !
            </Text>
            <Text
              style={{
                color: '#F4F5F9',
                fontSize: 12,
                textAlign: 'left',
                marginBottom: 5,
              }}>
              Daftar History Tasbih kalian ketika direset akan masuk yang ada
              dibawah ini
            </Text>
          </View>

          {/* <View
              style={{
                justifyContent: 'center',
                allignItems: 'center',
              }}>
              <Switch
                value={state.darkMode}
                disabled={false}
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
                switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
              />
            </View> */}
        </View>
        <View style={{marginTop: 10, marginRight: 20}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View
                style={{
                  backgroundColor: '#1E71A3',
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                }}>
                <Icon name="hands" size={20} color="#FFFFFF" />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: 8,
                  fontSize: 15,
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontWeight: '700',
                  }}>
                  JANGAN LUPA BERDOA KEPADA ALLAH SWT !
                </Text>
              </View>
            </View>

            {/*        */}
          </View>
        </View>
      </View>

      <View
        style={{
          padding: 15,
          justifyContent: 'center',
          fontSize: 15,
        }}>
        <Text
          style={{
            color: content,
          }}>
          RIWAYAT BERRTASBIH (HISTORY) :
        </Text>
      </View>
      <FlatList
        data={data}
        ItemSeparatorComponent={<View className="my-2" />}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: COLORS.grey,
              height: 100,
              borderRadius: 15,
              elevation: 10,
              padding: 20,
              marginHorizontal: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Icon name="lightbulb" size={20} color="black" />
            </View>
            <View>
              <Text style={{fontSize: 18, color: 'black'}}>
                {item.tercapai}x bertasbih dari target {item.target}x
              </Text>
              <Text style={{fontWeight: '400', fontSize: 18, color: 'black'}}>
                {item.tanggal} - {item.waktu}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                onShare(
                  `${item.tercapai}x bertasbih dari target ${item.target}x, jam ${item.waktu} pada tanggal ${item.tanggal}`,
                )
              }>
              <Icon name="paper-plane" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Profile;
