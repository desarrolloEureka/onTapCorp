import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  View,
  Image,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


type Props = {};

const Documentos = ({}: Props) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E9E9E9'}}>
      <ImageBackground
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}
        source={require('../../images/background.png')}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{height: '7%', width: '100%'}}>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '18%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={handleBackPress}>
              <Icon name="arrow-back-ios" size={27} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{height: '93%', width: '100%'}}>
            <View style={{height: '10%', width: '100%'}}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <Text
                  style={{
                    fontFamily: 'Open Sans',
                    fontSize: 23,
                    fontWeight: '700',
                    lineHeight: 25,
                    letterSpacing: 0.03,
                    color: '#030124'
                  }}>
                  Documentos
                </Text>
              </View>
            </View>
            <View
              style={{
                height: '75%',
                width: '100%',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View
                style={{
                  minHeight: 200,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white'
                }}>
                <View
                  style={{
                    height: 40,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    // backgroundColor: 'red',
                    paddingLeft: 20
                  }}>
                  <View
                    style={{
                      height: '60%',
                      width: '40%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#396593',
                      borderRadius: 5
                    }}>
                    <Text style={{fontSize: 13, color: 'white'}}>
                      Comunicados Internos
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,
                    width: '90%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#9b9db3',
                    marginTop: 30
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Ionicons
                      name="document-attach-outline"
                      size={28}
                      color="#396593"
                    />
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: '85%',
                      alignItems: 'flex-start',
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black'
                      }}>
                      Políticas Y Procedimientos
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,
                    width: '90%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#9b9db3',
                    marginTop: 30,
                    marginBottom: 25
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Ionicons
                      name="document-attach-outline"
                      size={28}
                      color="#396593"
                    />
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: '85%',
                      alignItems: 'flex-start',
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black'
                      }}>
                      Día de la Familia
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  minHeight: 200,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white'
                }}>
                <View
                  style={{
                    height: 40,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    // backgroundColor: 'red',
                    paddingLeft: 20
                  }}>
                  <View
                    style={{
                      height: '60%',
                      width: '20%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#396593',
                      borderRadius: 5
                    }}>
                    <Text style={{fontSize: 13, color: 'white'}}>
                      Noticias
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,
                    width: '90%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#9b9db3',
                    marginTop: 30
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Ionicons
                      name="document-attach-outline"
                      size={28}
                      color="#396593"
                    />
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: '85%',
                      alignItems: 'flex-start',
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black'
                      }}>
                      Empleado del Mes
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,
                    width: '90%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#9b9db3',
                    marginTop: 30,
                    marginBottom: 25
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Ionicons
                      name="document-attach-outline"
                      size={28}
                      color="#396593"
                    />
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: '85%',
                      alignItems: 'flex-start',
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black'
                      }}>
                      Aumento Salarial
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Documentos;
