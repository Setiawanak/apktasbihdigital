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

const RegistrationScreen = () => {
  {
    /* INISIALISASI CODE */
  }
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

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
            Anda Belum Memiliki Akun ?
          </Text>
          {/* TEKS SELAMAT DATANG */}
          <Text style={{color: '#FFFFFF'}}>
            Silahkan daftar terlebih dahulu dibawah ini :
          </Text>

          {/* TEXT INPUT YANG BERISI UNTUK MASUKAN NAMA ! */}
          <TextInput
            onChangeText={text => setName(text)}
            style={{
              backgroundColor: '#FFFFFF',
              paddingLeft: 10,
              borderRadius: 6,
              elevation: 2,
              marginTop: 20,
            }}
            placeholder="Masukan Nama Anda!"
            value={name}
          />

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
            placeholder="Masukan Password Anda!"
            value={Password}
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
            }}>
            <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 18}}>
              Register
            </Text>
          </TouchableOpacity>

          {/* TULISAN ATAU */}
          {/* <Text style={{
          color: '#FFFFFF', 
          textAlign: 'center', 
          marginTop:    15, 
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

          {/* <Text style={{
              color: '#FFFFFF', 
              fontWeight: 
              'bold', 
              }}>
             Belum Memiliki Akun? {' '} 
             <Text style={{color: '#1E71A3'}}>Register</Text>
        </Text> 
        
        <Text style={{
              color: '#1E71A3', 
              fontWeight: 
              'bold', 
              marginTop:20,
              textAlign: 'right',
              marginBottom: 20,
              }}>Lupa Password
        </Text>*/}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default RegistrationScreen;
