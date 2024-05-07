import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {meetingsStyles} from '../styles/meetingsStyles';
import Checkbox from './CheckboxGroup';
import CheckboxGroup from './CheckboxGroup';

type Props = {};

const FirstTap = (props: Props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 5
      }}>
      <View
        style={{
          height: 280,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
        }}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            height: '100%',
            width: '90%'
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginTop: 15,
              height: 20,
              width: '100%'
            }}>
            <Text style={{color: 'black', fontSize: 13}}>02/06/2024</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              height: 60,
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: '#9b9db3',
              marginTop: 15
            }}>
            <View>
              <View
                style={{
                  alignItems: 'center'
                }}>
                <Text style={meetingsStyles.label}>Cliente</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 5
                }}>
                <Ionicons name="person-outline" size={28} color="#396593" />
              </View>
            </View>

            <View
              style={{
                width: '85%',
                alignItems: 'center'
              }}>
              <TextInput
                selectionColor={'#396593'}
                cursorColor={'#396593'}
                style={meetingsStyles.inputBox}
                placeholderTextColor="#000000"
                underlineColorAndroid="transparent"
                onChangeText={(text: any) => {}}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              height: 60,
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: '#9b9db3',
              marginTop: 15
            }}>
            <View>
              <View
                style={{
                  paddingTop: 15,
                  alignItems: 'center'
                }}>
                <Text style={meetingsStyles.label}>Asunto</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 5
                }}>
                <AntDesign name="file1" size={25} color="#396593" />
              </View>
            </View>

            <View
              style={{
                width: '85%',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <TextInput
                selectionColor={'#396593'}
                style={meetingsStyles.inputBox}
                placeholderTextColor="#000000"
                underlineColorAndroid="transparent"
                onChangeText={(text: any) => {}}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              height: 60,
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: '#9b9db3',
              marginTop: 15
            }}>
            <View>
              <View
                style={{
                  paddingTop: 15,
                  alignItems: 'center'
                }}>
                <Text style={meetingsStyles.label}>Correo</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 5
                }}>
                <Fontisto name="email" size={28} color="#396593" />
              </View>
            </View>

            <View
              style={{
                width: '85%',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <TextInput
                keyboardType="email-address"
                selectionColor={'#396593'}
                style={meetingsStyles.inputBox}
                placeholderTextColor="#000000"
                underlineColorAndroid="transparent"
                onChangeText={(text: any) => {}}
              />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginTop: 15,
          height: 650,
          width: '90%'
        }}>
        <View
          style={{
            flexDirection: 'row'
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#030124',
              height: 40,
              width: 150
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Ionicons name="play" size={28} color="white" />
            </View>
            <View
              style={{
                width: 100,
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}>
              <Text style={{color: 'white', fontSize: 11}}>
                Iniciar Reunión
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingHorizontal: 15
            }}>
            <Text style={{color: 'black', fontSize: 13}}>10:00 am</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#888888',
              height: 40,
              width: 150
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Ionicons name="stop" size={28} color="white" />
            </View>
            <View
              style={{
                width: 100,
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}>
              <Text style={{color: 'white', fontSize: 11}}>
                Finalizar Reunión
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingHorizontal: 15
            }}>
            <Text style={{color: 'black', fontSize: 13}}>11:30 am</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: 80,
            width: '100%'
          }}>
          <Text style={{color: '#030124', fontSize: 14}}>
            Tiempo total reunión: 1 hora y 30 minutos
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: 20,
            width: '100%'
          }}>
          <Text style={{color: '#396593', fontSize: 14, fontWeight: '500'}}>
            Resumen de Reunión
          </Text>
        </View>

        <CheckboxGroup options={['Llamar', 'Concretado', 'No concretado']} />

        <View
          style={{
            backgroundColor: 'white',
            height: 300,
            width: '100%',
            borderRadius: 20,
            justifyContent: 'flex-start',
            alignItems: 'center',
            elevation: 5,
            marginVertical: 20
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              height: 50,
              width: '100%',
              paddingLeft: 20
            }}>
            <Text style={{color: '#396593', fontSize: 16, fontWeight: '500'}}>
              Observaciones:
            </Text>
          </View>
          <View
            style={{
              marginBottom: 10,
              height: 230,
              width: '90%'
            }}>
            <TextInput
              selectionColor={'#396593'}
              cursorColor={'#396593'}
              multiline={true}
              numberOfLines={8}
              placeholder="Escribe tus comentarios aquí..."
              style={{
                height: 230,
                textAlignVertical: 'top',
                fontSize: 16,
                padding: 10
              }}
            />
          </View>
        </View>

        <View
          style={{
            height: 90,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-end'
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#396593',
              height: 40,
              width: '40%',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 5,
              borderRadius: 20
            }}>
            <Text style={{color: 'white', fontSize: 16}}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          height: 100,
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 20
        }}></View>
    </ScrollView>
  );
};

export default FirstTap;
