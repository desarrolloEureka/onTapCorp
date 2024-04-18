import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {
  IndexDataForm,
  DataFormValues,
  DataForm,
  NetworksSubIndexDataForm,
  SocialDataForm,
  handleDataProps,
  handleDataNetworksProps,
} from '../../../../../types/profile';
import ProfileHook from './hooks/ProfileHook';
import FormUrl from './FormUrl';
import ModalIcons from './ModalIcons';
import { UserData } from '../../../../../types/user';
import ItemForm from './ItemForm';

const ItemFormUrl = ({
  dataForm,
  handleDataSet,
  index,
  labelArray,
  value,
  handleModalAlert,
  isProUser,
  handleData,
  user,
  handleSwitch,
  handleAddData,
  handleDataNetworks,
  setModalIcons,
  itemUrlKey,
  itemUrlSelected,
  handleModalIcons,
  isModalIcons,
  handleDeleteData,
}: {
  dataForm: SocialDataForm;
  handleDataSet: (e: SocialDataForm) => void;
  index: IndexDataForm;
  labelArray: | DataFormValues[];
  value: any;
  handleModalAlert: ({
    index,
    subindex,
  }: {
    index: string;
    subindex: string;
  }) => void;
  isProUser: boolean;
  handleData: ({
    name,
    text,
    subindex,
    key,
    currentDataRef,
  }: handleDataProps) => void;
  user: UserData;
  handleSwitch: (e: any) => void;
  handleAddData: (index: any) => void;
  handleDataNetworks: ({
    name,
    text,
    subindex,
    key,
  }: handleDataNetworksProps) => void;
  setModalIcons: (e: any) => void;
  itemUrlKey: number;
  itemUrlSelected: any;
  handleModalIcons: (item: any, key: any) => void;
  isModalIcons: boolean;
  handleDeleteData: () => void;
}) => {
  return (
    <View style={{ height: 'auto', minHeight: 200, width: '100%', justifyContent: 'center', marginTop: 20 }}>
      <View
        style={{ minHeight: 130, width: "100%", justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
        <View style={{ height: 50, width: "95%", alignItems: 'flex-end', flexDirection: 'row' }}>
          <View style={{ height: "100%", width: "65%", justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row' }}>
            <View style={{ height: "75%", width: "48%", justifyContent: 'center', alignItems: 'center', backgroundColor: '#396593', borderRadius: 5 }}>
              <Text style={{ fontSize: 13, color: 'white' }}>{index != 'urlsCommercial' ? 'Urls Empresa' : 'Area Comercial'}</Text>
            </View>
          </View>
        </View>

        {labelArray.map((val, key) => {
          if (index == 'urlsCompany' || index == 'urlsCommercial') {
            const myValue = (user && user.profile ? dataForm && dataForm[index] : null) as unknown as DataFormValues;
            return (
              <View key={key} style={{ height: 100, justifyContent: 'center', marginTop: 25 }}>
                <View style={{ height: '80%', width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ height: '80%', width: '95%', alignItems: 'center', justifyContent: 'center' }}>
                      <ItemForm
                        label={value[1][0].label + " " + (key + 1)}
                        handleSwitch={(e: any) => handleSwitch(e)}
                        handleData={handleData}
                        name={index}
                        checked={value[1].checked}
                        key={key}
                        icon={value[1][0].icon}
                        myValue={myValue}
                        index={index}
                        switchAction={index == 'urlsCommercial' ? true : false}
                      />
                    </View>
                  </View>
                </View>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};

export default ItemFormUrl;