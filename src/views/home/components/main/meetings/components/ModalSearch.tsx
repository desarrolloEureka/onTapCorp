import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  showConfigSearch: boolean;
  handleConfigSearch: () => void;
};

function ModalSearch({showConfigSearch, handleConfigSearch}: Props) {
  return (
    showConfigSearch && (
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          backgroundColor: 'rgba(128, 128, 128, 0.2)'
        }}>
        <View
          style={{
            height: '50%',
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-start'
          }}>
          <View
            style={{
              height: '50%',
              width: '75%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <View
              style={{
                height: '100%',
                width: '95%',
                backgroundColor: 'white',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 15
              }}>
              <View
                style={{
                  height: '90%',
                  width: '90%'
                }}>
                <View
                  style={{
                    height: '15%',
                    width: '100%',
                    flexDirection: 'row'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '50%',
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: '#396593'
                      }}>
                      Filtrar por Estado
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      height: '100%',
                      width: '50%',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start'
                    }}
                    onPress={handleConfigSearch}>
                    <Ionicons name="close" size={25} color="#9C9C9C" />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    height: '60%',
                    width: '100%',
                    marginTop: 10
                  }}>
                  <View
                    style={{
                      height: '30%',
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 5
                    }}>
                    <TouchableOpacity
                      style={{
                        height: '100%',
                        width: '30%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 12,
                        borderWidth: 0,
                        borderColor: '#606060',
                        backgroundColor: '#396593',
                        elevation: 5
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'white'
                        }}>
                        Estado
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: '100%',
                        width: '30%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: '#606060',
                        backgroundColor: 'white',
                        elevation: 5
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'black'
                        }}>
                        Cliente
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: '100%',
                        width: '30%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 12,
                        borderWidth: 1,
                        backgroundColor: 'white',
                        borderColor: '#606060',
                        elevation: 5
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'black'
                        }}>
                        Fecha
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      height: '30%',
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginVertical: 5
                    }}>
                    <TouchableOpacity
                      style={{
                        height: '100%',
                        width: '30%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 12,
                        borderWidth: 1,
                        backgroundColor: 'white',
                        borderColor: '#606060',
                        elevation: 5
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'black'
                        }}>
                        Otro
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: '100%',
                        width: '30%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 12,
                        borderWidth: 1,
                        backgroundColor: 'white',
                        borderColor: '#606060',
                        elevation: 5
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'black'
                        }}>
                        Todos
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      height: '30%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 22
                    }}>
                    <TouchableOpacity
                      style={{
                        height: '100%',
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        backgroundColor: '#396593',
                        elevation: 5
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'white'
                        }}>
                        Buscar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  );
}

export default ModalSearch;
