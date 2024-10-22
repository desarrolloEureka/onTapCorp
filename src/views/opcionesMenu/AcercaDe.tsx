import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AcercaDe = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View
        style={{height: Platform.OS == 'android' ? '7%' : '10%', width: '100%'}}
      />
      <View style={{height: '7%', width: '100%'}}>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '18%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleBackPress}>
          <Icon name="arrow-back-ios" size={27} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{height: '93%', width: '100%'}}>
        <View style={{height: '35%', width: '100%'}}>
          <View
            style={{
              height: '35%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Open Sans',
                fontSize: 23,
                fontWeight: '700',
                lineHeight: 25,
                letterSpacing: 0.03,
                color: '#030124',
              }}>
              Acerca de
            </Text>
          </View>
          <View
            style={{
              height: '65%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: '100%',
                width: '60%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={styles.image}
                source={require('../../images/logoName.png')}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            height: '55%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: '95%',
              width: '90%',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                height: '20%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Open Sans',
                  fontSize: 18,
                  fontWeight: '300',
                  lineHeight: 25,
                  letterSpacing: 0.03,
                  textAlign: 'left',
                  color: '#030124',
                }}>
                One Tap Version 1.0.0
              </Text>
              <Text
                style={{
                  fontFamily: 'Open Sans',
                  fontSize: 18,
                  fontWeight: '300',
                  lineHeight: 25,
                  letterSpacing: 0.03,
                  textAlign: 'left',
                  color: '#030124',
                }}>
                2024-10-22
              </Text>
            </View>

            <View
              style={{
                height: '20%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Open Sans',
                  fontSize: 18,
                  fontWeight: '300',
                  color: '#030124',
                }}>
                Todos los derechos reservados
              </Text>
              <Text
                style={{
                  fontFamily: 'Open Sans',
                  fontSize: 18,
                  fontWeight: '300',
                  lineHeight: 25,
                  letterSpacing: 0.03,
                  textAlign: 'left',
                  color: '#030124',
                }}></Text>
            </View>

            <View
              style={{
                height: '20%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginBottom: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'Open Sans',
                  fontSize: 17,
                  fontWeight: '500',
                  lineHeight: 20,
                  letterSpacing: 0.03,
                  textAlign: 'center',
                  color: '#030124',
                }}>
                Powered By:
              </Text>
            </View>

            <View
              style={{
                height: '30%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../../images/logoEureka.png')}
                  style={{height: '80%', width: '100%'}}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default AcercaDe;
