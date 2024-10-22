import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import ItemForm from './ItemForm';
import {
  DataFormValues,
  SocialDataForm,
  handleDataProps
} from '../../../../../types/profile';
import {UserData} from '../../../../../types/user';

const FormDataUser = ({
  handleDataSet,
  dataForm,
  data,
  handleData,
  user,
  handleSwitch
}: {
  dataForm: SocialDataForm;
  handleDataSet: (e: SocialDataForm) => void;
  isProUser: boolean;
  data: [string, any][];
  handleData: ({
    name,
    text,
    subindex,
    key,
    currentDataRef
  }: handleDataProps) => void;
  user: UserData;
  handleSwitch: (e: any) => void;
}) => {
  return (
    <SafeAreaView>
      {data.map((value, key) => {
        const index = value[0] as keyof typeof dataForm;
        if (
          index == 'name' ||
          index == 'nit' ||
          index == 'phone' ||
          index == 'address'
        ) {
          console.log('value', value);
          const myValue = (user && user.profile
            ? user.profile?.social?.[index]
            : dataForm && dataForm[index]) as unknown as DataFormValues;
          return (
            <View style={{backgroundColor: 'white'}} key={key}>
              {key === 0 ? (
                <View
                  style={{
                    height: 60,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 15
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '96%',
                      justifyContent: 'center'
                    }}>
                    <View
                      style={{
                        height: '65%',
                        width: '32%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#396593',
                        borderRadius: 5
                      }}>
                      <Text style={{color: 'white'}}> Datos Empresa</Text>
                    </View>
                  </View>
                </View>
              ) : null}
              <ItemForm
                label={value[1].label}
                handleSwitch={(e: any) => handleSwitch(e)}
                handleData={handleData}
                name={index}
                checked={value[1].checked}
                key={key}
                icon={value[1].icon}
                myValue={myValue}
                index={index}
              />
            </View>
          );
        }
      })}
    </SafeAreaView>
  );
};

export default FormDataUser;
