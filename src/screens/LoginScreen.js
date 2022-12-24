import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import {login} from '../api/call';
import {store} from '../context';
import {saveToken} from '../hooks';

const LoginScreen = () => {
  {
    /* INISIALISASI CODE */
  }
  const navigation = useNavigation();
  const {state, dispatch} = store();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    console.log(email, password);
    const data = await login({email, password});
    if (data) {
      await saveToken(data.id.toString());
      dispatch({type: 'LOGIN', payload: data});
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('/login');
  };

  return (
    <View style={{flex: 1}}>
      {/* STATUSBAR BIAR DIATAS BACKGROUND DENGAN WARNA LIGHT*/}
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent
      />

      {/* BACKGROUND */}
      <ImageBackground
        source={require('../images/tasbihbg.png')}
        style={{flex: 1, justifyContent: 'flex-end'}}>
        {/* KOTAK HITAM DIATAS BACKGROUND dengan bisa di Scroll */}
        <ScrollView
          style={{
            marginTop: 100,
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: 20,
            paddingTop: 20,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          {/* TEKS ASSSALAMUALAIKUM */}
          <Text style={{color: '#FFFFFF', fontSize: 25, fontWeight: 'bold'}}>
            ASSALAMUALAIKUM
          </Text>
          {/* TEKS SELAMAT DATANG */}
          <Text style={{color: '#FFFFFF'}}>
            Selamat Datang di Aplikasi Tasbih Digital
          </Text>

          {/* TEXT INPUT YANG BERISI UNTUK MASUKAN EMAIL ! */}
          <TextInput
            onChangeText={text => setEmail(text)}
            style={{
              backgroundColor: '#FFFFFF',
              paddingLeft: 10,
              borderRadius: 6,
              elevation: 2,
              marginTop: 20,
            }}
            placeholder="Masukan Email Anda!"
            value={email}
          />

          {/* TEXT INPUT YANG BERISI UNTUK MASUKAN PASSWORD ! */}
          <TextInput
            onChangeText={text => setPassword(text)}
            style={{
              backgroundColor: '#FFFFFF',
              paddingLeft: 10,
              borderRadius: 6,
              elevation: 2,
              marginTop: 20,
            }}
            secureTextEntry
            placeholder="Masukan Password Anda!"
            value={password}
          />

          {/* BUTTON LOGIN */}
          <TouchableOpacity
            style={{
              backgroundColor: '#0096FF',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              paddingVertical: 10,
              borderRadius: 6,
            }}
            onPress={handleSubmit}>
            <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 18}}>
              Login
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 100,
                marginTop: 20,
              }}>
              <Text
                style={{
                  color: '#1E71A3',
                  fontWeight: 'bold',

                  textAlign: 'center',
                }}>
                Lupa Password
              </Text>
            </TouchableOpacity>
          </View>

          {/* TULISAN ATAU */}
          {/* <Text
            style={{
              color: '#FFFFFF',
              textAlign: 'center',
              marginTop: 15,
              marginBottom: 15,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Atau
          </Text> */}

          {/* kotak LOGIN DENGAN GOOGLE (WARNA)*/}
          {/* <TouchableOpacity style ={{
          backgroundColor: '#6395EC', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginTop:       10,
          paddingVertical: 10,
          borderRadius:     6,
          flexDirection: 'row'
          }}>
          <Image 
          source={require(
            './src/images/logogoogle.png'
            )}
          style={{
            width:35, height: 35, marginLeft: 15
            }}
          />
          <View style={{
            flex:1, 
            justifyContent: 'center', 
            alignItems: 'center' }}>
            <Text style={{
              color: '#FFFFFF', 
              fontWeight: 
              'bold', 
              fontSize: 18
              }}>
             Login dengan Google
            </Text>
          </View>
        </TouchableOpacity> */}

          {/* kotak LOGIN DENGAN FACEBOOK (WARNA)*/}
          {/*<TouchableOpacity style ={{
          backgroundColor: '#6395EC', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginTop:       10,
          paddingVertical: 10,
          borderRadius:     6,
          flexDirection: 'row'
          }}>
          <Image 
          source={require(
            './src/images/logofacebook.png'
            )}
          style={{
            width:35, height: 35, marginLeft: 15
            }}
          />
          <View style={{
            flex:1, 
            justifyContent: 'center', 
            alignItems: 'center' }}>
            <Text style={{
              color: '#FFFFFF', 
              fontWeight: 
              'bold', 
              fontSize: 18
              }}>
             Login dengan Facebook
            </Text>
          </View>
        </TouchableOpacity> */}

          {/* Tombol untuk ke Register*/}
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
              Belum Memiliki Akun?{'   '}
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  color: '#1E71A3',
                  fontSize: 20,
                  alignItems: 'center',
                }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
