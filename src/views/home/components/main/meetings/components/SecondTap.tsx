import React from 'react';
import {View, TouchableOpacity, TextInput, FlatList, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {meetingsStyles} from '../styles/meetingsStyles';

type Props = {
  handleConfigSearch: () => void;
  handleShowDetail: (item: any) => void;
  setSearchText: (text: string) => void;
  searchText: string;
  data: any;
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
          justifyContent: 'space-around',
          height:"6%"
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
            cursorColor={'#396593'}
            placeholderTextColor="#a0a0a0"
            underlineColorAndroid="transparent"
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
          renderItem={({item}: {item: any}) => {
            return (
              <View style={meetingsStyles.item}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }}>
                  <Text style={meetingsStyles.text}>
                    {item?.timestamp.slice(0, 10)}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }}>
                  <Text style={meetingsStyles.text}>
                    {item?.companyNameToVisit}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }}>
                  <Text style={meetingsStyles.text}>
                    {item?.meetingStatusName}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <TouchableOpacity
                    style={meetingsStyles.detailContainer}
                    onPress={() => handleShowDetail(item)}>
                    <Icon name="remove-red-eye" size={20} color="#396593" />
                    <Text style={meetingsStyles.verText}>Detalle</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
}
