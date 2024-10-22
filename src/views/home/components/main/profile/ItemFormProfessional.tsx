import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    CareerDataFormValues,
    IndexDataForm,
    DataFormValues,
    EducationDataFormValues,
    DataForm,
    CareerSubIndexDataForm,
    ProfessionalDataForm,
    handleDataProps
} from '../../../../../types/profile';
import FormProfession from './FormProfession';
import CustomModalAlert from './CustomModalAlert';
import { UserData } from '../../../../../types/user';

const ItemFormProfessional = ({
    dataForm,
    handleDataSet,
    index,
    labelArray,
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
    dataForm: ProfessionalDataForm;
    handleDataSet: (e: ProfessionalDataForm) => void;
    index: IndexDataForm;
    labelArray:
    | DataFormValues[]
    | EducationDataFormValues[]
    | CareerDataFormValues[];
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
            <View style={{ height: labelArray.length > 1 ? 'auto' : 280, minHeight: 380, width: "100%", justifyContent: 'center', paddingTop: 20, paddingBottom: 20 }}>
                <View style={{ minHeight: 230, width: "100%", justifyContent: 'center', alignItems: 'center', backgroundColor: "#e9e9e9" }}>
                    <View style={{ height: 50, width: "95%", alignItems: 'flex-end', flexDirection: 'row' }}>
                        <View style={{ height: "100%", width: "40%", justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row' }}>
                            <View style={{ height: "75%", width: "98%", justifyContent: 'center', alignItems: 'center', backgroundColor: '#02af9b', borderRadius: 5 }}>
                                <Text style={{ fontSize: 13, color: 'white' }}>Trayectoria Profesional</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ height: "100%", width: "60%", justifyContent: 'center', flexDirection: 'row' }} onPress={() => { handleAddData('professional_career'); }} >
                            <View style={{ height: "100%", width: "20%", alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name="plus-circle" size={20} color="#02AF9B" />
                            </View>
                            <View style={{ height: "100%", width: "75%", justifyContent: 'center' }}>
                                <Text style={{ fontSize: 11, color: "black" }}>Agregar trayectoria profesional</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {labelArray.map((val, key) => {
                        const myValue = (user && user.profile
                            ? isProUser
                                ? user.profile.professional
                                    ? user.profile.professional?.[index]
                                    : dataForm && dataForm[index]
                                : dataForm && dataForm[index]
                            : dataForm && dataForm[index]) as unknown as DataFormValues;
                        return (
                            <View key={key} style={{ height: 245, justifyContent: 'center', flexDirection: 'row', borderBottomWidth: key !== labelArray.length - 1 ? 2 : undefined, borderBlockColor: key !== labelArray.length - 1 ? '#d4d4d4' : undefined, marginTop: 10 }}>
                                <View style={{ height: "95%", width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ height: "20%", width: "90%", alignItems: 'center', justifyContent: 'center' }}>
                                        <FormProfession
                                            label={'Empresa: '}
                                            handleSwitch={(e: any) => handleSwitch(e)}
                                            handleData={handleData}
                                            name={index}
                                            checked={val.checked}
                                            subindex={key}
                                            icon={val.icon}
                                            deleteAction={false}
                                            handleDeleteData={handleDeleteData}
                                            handleModalAlert={({ index, subindex }) =>
                                                handleModalAlert({ index, subindex })
                                            }
                                            myValue={myValue}
                                            index={index}
                                            withCheck={true}
                                            subLabel={'company' as CareerSubIndexDataForm}
                                        />
                                    </View>
                                    <View style={{ height: "20%", width: "90%", alignItems: 'center', justifyContent: 'center' }}>
                                        <FormProfession
                                            label={'Cargo: '}
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
                                            withCheck={false}
                                            subLabel={'position' as CareerSubIndexDataForm}
                                        />
                                    </View>
                                    <View style={{ height: "20%", width: "90%", alignItems: 'center', justifyContent: 'center' }}>
                                        <FormProfession
                                            label={'Fecha de inicio: '}
                                            handleSwitch={(e: any) => handleSwitch(e)}
                                            handleData={handleData}
                                            name={index}
                                            checked={val.checked}
                                            subindex={key}
                                            icon={val.icon}
                                            deleteAction={false}
                                            handleDeleteData={handleDeleteData}
                                            handleModalAlert={({ index, subindex }) =>
                                                handleModalAlert({ index, subindex })
                                            }
                                            myValue={myValue}
                                            index={index}
                                            withCheck={false}
                                            subLabel={'data_init' as CareerSubIndexDataForm}
                                        />
                                    </View>
                                    <View style={{ height: "20%", width: "90%", alignItems: 'center', justifyContent: 'center' }}>
                                        <FormProfession
                                            label={'Fecha finalización: '}
                                            handleSwitch={(e: any) => handleSwitch(e)}
                                            handleData={handleData}
                                            name={index}
                                            checked={val.checked}
                                            subindex={key}
                                            icon={val.icon}
                                            deleteAction={false}
                                            handleDeleteData={handleDeleteData}
                                            handleModalAlert={({ index, subindex }) =>
                                                handleModalAlert({ index, subindex })
                                            }
                                            myValue={myValue}
                                            index={index}
                                            withCheck={false}
                                            subLabel={'data_end' as CareerSubIndexDataForm}
                                        />
                                    </View>
                                    <View style={{ height: "20%", width: "90%", alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={{ color: "#02AF9B" }}>Trayectoria profesional</Text>
                                    </View>
                                </View>

                            </View>
                        );
                    })
                    }
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

export default ItemFormProfessional;