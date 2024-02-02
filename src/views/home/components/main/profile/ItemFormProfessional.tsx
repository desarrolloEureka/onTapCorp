import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { profileStyles } from '../../../styles/profileStyles';
import SwitchGeneral from './SwitchGeneral';
import {
    CareerDataFormValues,
    IndexDataForm,
    DataFormValues,
    EducationDataFormValues,
    DataForm,
    CareerSubIndexDataForm
} from '../../../../../types/profile';
import ProfileHook from './hooks/ProfileHook';
import FormProfession from './FormProfession';

const ItemFormProfessional = ({
    dataForm,
    handleDataSet,
    handleSeeMore,
    index,
    label,
    labelArray,
    value,
    itemDetail,
    isDetailOpen,
    icon,
    social,
    handleModalAlert,
}: {
    dataForm: DataForm;
    handleDataSet: (e: DataForm) => void;
    handleSeeMore: (e: number) => void;
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
    handleModalAlert: ({ index, subindex }: { index: string, subindex: string }) => void;
}) => {
    const {
        handleSwitch,
        handleData,
        handleAddData,
        isModalAlertLimit,
        handleModalAlertLimit,
        handleDeleteData,
        user,
    } = ProfileHook({
        handleDataSet,
    });

    return (

        <View style={{ height: labelArray.length > 1 ? 'auto' : 280, minHeight: 380, width: "100%", justifyContent: 'center', paddingTop: 20 }}>
            <View style={{ minHeight: 230, width: "100%", justifyContent: 'center', backgroundColor: "#e9e9e9" }}>

                <View style={{ height: 40, width: "100%", alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ height: "100%", width: "55%", justifyContent: 'center', flexDirection: 'row' }} onPress={() => { handleAddData('professional_career', social) }} >
                        <View style={{ height: "100%", width: "20%", alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="plus-circle" size={20} color="#02AF9B" />
                        </View>
                        <View style={{ height: "100%", width: "75%", justifyContent: 'center' }}>
                            <Text style={{ fontSize: 11, color: "black" }}>Agregar trayectoria profesional</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                {
                    labelArray.map((val, key) => {
                        const myValue = (user && index == value[0]
                            ? user.profile[index]
                            : undefined) as unknown as DataFormValues;
                        return (
                            <View key={key} style={{ height: 245, justifyContent: 'center', flexDirection: 'row' }}>
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
                                            handleModalAlert={({ index, subindex }) => handleModalAlert({ index, subindex })}
                                            myValue={myValue}
                                            dataForm={dataForm}
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
                                            handleModalAlert={({ index, subindex }) => handleModalAlert({ index, subindex })}
                                            myValue={myValue}
                                            dataForm={dataForm}
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
                                            handleModalAlert={({ index, subindex }) => handleModalAlert({ index, subindex })}
                                            myValue={myValue}
                                            dataForm={dataForm}
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
                                            handleModalAlert={({ index, subindex }) => handleModalAlert({ index, subindex })}
                                            myValue={myValue}
                                            dataForm={dataForm}
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


                <TouchableOpacity style={{ height: 45, width: "100%", alignItems: 'center', justifyContent: 'center', borderTopColor: '#396593', borderTopWidth: 2 }} onPress={() => handleSeeMore(3)}>
                    <View style={{ height: "100%", width: "30%", alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <View style={{ height: "100%", width: "75%", alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: "#396593" }}>Ver más (2)</Text>
                        </View>
                        <View style={{ height: "100%", width: "25%", alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="angle-down" size={35} color="#396593" />
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        </View>

        /*    <View style={{ height: itemDetail === 4 && value[0] === 'professional_career' ? 920 : 310, width: "100%", justifyContent: 'center' }}>
               <View style={{ height: "90%", width: "100%", justifyContent: 'center', backgroundColor: "#e9e9e9" }}>
   
                   <View style={{ height: itemDetail === 4 && value[0] === 'professional_career' ? "6%" : "15%", width: "100%", alignItems: 'flex-end' }}>
                       <TouchableOpacity style={{ height: "100%", width: "55%", justifyContent: 'center', flexDirection: 'row' }} onPress={() => { handleAddData('professional_career', social) }} >
                           <View style={{ height: "100%", width: "20%", alignItems: 'center', justifyContent: 'center' }}>
                               <Icon name="plus-circle" size={20} color="#02AF9B" />
                           </View>
                           <View style={{ height: "100%", width: "75%", justifyContent: 'center' }}>
                               <Text style={{ fontSize: 11 }}>Agregar trayectoria profesional</Text>
                           </View>
                       </TouchableOpacity>
                   </View>
   
                   <View style={{ height: itemDetail === 4 && value[0] === 'professional_career' ? "88%" : "70%", width: "100%", justifyContent: 'center' }}>
   
                       {
                           labelArray.map((val, key) => {
                               const myValue = (user && index == value[0]
                                   ? user.profile[index]
                                   : undefined) as unknown as DataFormValues;
                               return (
                                   <View key={key} style={{ height: 235, justifyContent: 'center', flexDirection: 'row' }}>
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
                                                   handleModalAlert={({ index, subindex }) => handleModalAlert({ index, subindex })}
                                                   myValue={myValue}
                                                   dataForm={dataForm}
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
                                                   handleModalAlert={({ index, subindex }) => handleModalAlert({ index, subindex })}
                                                   myValue={myValue}
                                                   dataForm={dataForm}
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
                                                   handleModalAlert={({ index, subindex }) => handleModalAlert({ index, subindex })}
                                                   myValue={myValue}
                                                   dataForm={dataForm}
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
                                                   handleModalAlert={({ index, subindex }) => handleModalAlert({ index, subindex })}
                                                   myValue={myValue}
                                                   dataForm={dataForm}
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
   
                   <TouchableOpacity style={{ height: itemDetail === 4 && value[0] === 'professional_career' ? "6%" : "15%", width: "100%", alignItems: 'center', justifyContent: 'center', borderTopColor: '#396593', borderTopWidth: 2 }} onPress={() => handleSeeMore(4)}>
                       <View style={{ height: "100%", width: "30%", alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                           <View style={{ height: "100%", width: "75%", alignItems: 'center', justifyContent: 'center' }}>
                               <Text style={{ fontSize: 12, color: "#396593" }}>Ver más (2)</Text>
                           </View>
                           <View style={{ height: "100%", width: "25%", alignItems: 'center', justifyContent: 'center' }}>
                               <Icon name="angle-down" size={35} color="#396593" />
                           </View>
                       </View>
                   </TouchableOpacity>
               </View>
           </View > */
    );
};

export default ItemFormProfessional;