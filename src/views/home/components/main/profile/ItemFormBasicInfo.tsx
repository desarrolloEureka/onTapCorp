import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemForm from './ItemForm';
import {
    CareerDataFormValues,
    IndexDataForm,
    DataFormValues,
    EducationDataFormValues,
    handleDataProps,
    SocialDataForm,
    ProfessionalDataForm
} from '../../../../../types/profile';
import CustomModalAlert from './CustomModalAlert';
import { UserData } from '../../../../../types/user';

const ItemFormBasicInfo = ({
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
    handleModalAlertLimit,
    isModalAlertLimit,
    handleDeleteData,
}: {
    dataForm: SocialDataForm | ProfessionalDataForm;
    handleDataSet: (e: SocialDataForm | ProfessionalDataForm) => void;
    index: IndexDataForm;
    label?: string;
    labelArray:
    | DataFormValues[]
    | EducationDataFormValues[]
    | CareerDataFormValues[];
    value: any;
    itemDetail: number;
    isDetailOpen: boolean;
    icon?: string;
    social: boolean;
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
    handleModalAlertLimit: () => void;
    isModalAlertLimit: boolean;
    handleDeleteData: () => void;
}) => {
    return (
        <>
            <View style={{ height: labelArray.length > 1 ? 'auto' : 240, minHeight: 240, width: "100%", justifyContent: 'center', paddingTop: 20, paddingBottom: 20 }}>
                <View style={{ minHeight: 190, width: "100%", justifyContent: 'center', alignItems: 'center', backgroundColor: "#e9e9e9" }}>
                    <View style={{ height: 50, width: "95%", alignItems: 'flex-end', flexDirection: 'row' }}>
                        <View style={{ height: "100%", width: "60%", justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row' }}>
                            <View style={{ height: "75%", width: "65%", justifyContent: 'center', alignItems: 'center', backgroundColor: '#02af9b', borderRadius: 5 }}>
                                <Text style={{ fontSize: 13, color: 'white' }}>{value[0] === 'phones' ? "Teléfonos de Contacto" : 'Correos de Contacto'}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ height: "100%", width: "40%", justifyContent: 'center', flexDirection: 'row' }} onPress={() => {
                            if (value[0] === 'phones') {
                                handleAddData('phones');
                            } else if (value[0] === 'emails') {
                                handleAddData('emails');
                            }
                        }}>
                            <View style={{ height: "100%", width: "25%", alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name="plus-circle" size={20} color="#02AF9B" />
                            </View>
                            <View style={{ height: "100%", width: "75%", justifyContent: 'center' }}>
                                <Text style={{ fontSize: 11, color: "black" }}>{value[0] === 'phones' ? "Agregar otro teléfono" : "Agregar otro correo"}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {labelArray.map((val, key) => {
                        if (index == 'phones' || index == 'emails') {
                            const myValue = (user && user.profile
                                ? isProUser
                                    ? user.profile.professional
                                        ? user.profile.professional?.[index]
                                        : dataForm && dataForm[index]
                                    : user.profile.social
                                        ? user.profile?.social?.[index]
                                        : dataForm && dataForm[index]
                                : dataForm && dataForm[index]) as unknown as DataFormValues;

                            return (
                                <View key={key} style={{ height: 120, justifyContent: 'center', borderBottomWidth: key !== labelArray.length - 1 ? 2 : undefined, borderBlockColor: key !== labelArray.length - 1 ? '#d4d4d4' : undefined, marginTop: 10 }}>
                                    <ItemForm
                                        label={val.label!}
                                        handleSwitch={(e: any) => handleSwitch(e)}
                                        handleData={handleData}
                                        name={index}
                                        checked={val.checked}
                                        subindex={key}
                                        icon={val.icon}
                                        deleteAction={true}
                                        handleDeleteData={handleDeleteData}
                                        handleModalAlert={({ index, subindex }) =>
                                            handleModalAlert({ index, subindex })
                                        }
                                        myValue={myValue}
                                        index={index}
                                    />
                                </View>
                            );
                        }
                    })}
                </View>
            </View>
            <CustomModalAlert
                isModalAlert={isModalAlertLimit}
                handleModalAlert={() => handleModalAlertLimit()}
                title={"One Tap dice!"}
                description="No es posible agregar mas datos"
            />
        </>
    );
};

export default ItemFormBasicInfo;