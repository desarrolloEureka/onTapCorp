import React from 'react';
import {View, TouchableOpacity, TextInput, FlatList, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {meetingsStyles} from '../styles/meetingsStyles';

export interface Cliente {
  id: string;
  fecha: string;
  nombre: string;
  estado: string;
}

type Props = {
  handleConfigSearch: () => void;
  handleShowDetail: () => void;
  setSearchText: (text: string) => void;
  searchText: string;
  data: Cliente[];
};

export default function SecondTap({
  handleConfigSearch,
  handleShowDetail,
  searchText,
  setSearchText,
  data
}: Props) {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          justifyContent: 'space-around'
        }}>
        <View style={meetingsStyles.searchConfig}>
          <TouchableOpacity
            style={meetingsStyles.searchConfigIcon}
            onPress={handleConfigSearch}>
            <Entypo
              style={{transform: [{rotate: '270deg'}]}}
              name="sound-mix"
              size={20}
              color="#396593"
            />
          </TouchableOpacity>
        </View>
        <View style={meetingsStyles.search}>
          <TextInput
            style={meetingsStyles.searchInput}
            placeholder="Buscar..."
            selectionColor={'#396593'}
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
          <TouchableOpacity style={meetingsStyles.searchButton}>
            <Fontisto name="search" size={20} color="#396593" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={meetingsStyles.containerTable}>
        <FlatList
          data={data}
          ListHeaderComponent={() => (
            <View style={meetingsStyles.header}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}>
                <Text style={meetingsStyles.headerText}>Fecha</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}>
                <Text style={meetingsStyles.headerText}>Cliente</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}>
                <Text style={meetingsStyles.headerText}>Estado</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Text style={meetingsStyles.headerText}></Text>
              </View>
            </View>
          )}
          renderItem={({item}: {item: Cliente}) => {
            return (
              <View style={meetingsStyles.item}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }}>
                  <Text style={meetingsStyles.text}>{item.fecha}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }}>
                  <Text style={meetingsStyles.text}>{item.nombre}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }}>
                  <Text style={meetingsStyles.text}>{item.estado}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <TouchableOpacity
                    style={meetingsStyles.detailContainer}
                    onPress={handleShowDetail}>
                    <Icon name="remove-red-eye" size={20} color="#396593" />
                    <Text style={meetingsStyles.verText}>Detalle</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 10,
            justifyContent: 'flex-end'
          }}>
          <TouchableOpacity>
            <Icon name="arrow-back-ios" size={20} color="#606060" />
          </TouchableOpacity>
          <Text style={{color: '#606060'}}>Pag 3/3</Text>
          <TouchableOpacity>
            <Icon name="arrow-forward-ios" size={20} color="#606060" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
