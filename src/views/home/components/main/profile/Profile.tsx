import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import PhotoUser from './PhotoUser';
import { profileStyles } from '../../../styles/profileStyles';
import FormDataUser from './FormDataUser';
import FormAddDataUser from './FormAddDataUser';
import SwitchGeneral from './SwitchGeneral';
import { profile } from '../../../../../initialData/profileInitialData';
import { DataForm } from '../../../../../types/profile';
import ProfileHook from './hooks/ProfileHook';
import { Text } from 'react-native';
import LogOut from '../../../../../hooks/logOut/LogOut';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const navigation = useNavigation();
    const [dataForm, setDataForm] = useState<DataForm>(profile);
    const [isProUser, setIsProUser] = useState(true);
    const { logOut } = LogOut();


    const { handleSeeMore, itemDetail } = ProfileHook({
        dataForm,
        setDataForm,
    });

    const handleChangePassword = () => {
        navigation.navigate('ChangePassword');
    }

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={profileStyles.scrollViewContainer}>
                <PhotoUser />

                <View style={{ height: 100, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <SwitchGeneral
                        label={"hola"}
                    />
                </View>

                <View style={{ height: 100, width: "100%", justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ height: "100%", width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ height: "45%", width: "75%", justifyContent: 'center', alignItems: 'center', backgroundColor: "#62ac9b", borderRadius: 25 }} onPress={handleChangePassword}>
                            <Text style={{ color: "white", fontSize: 13 }}>Cambiar Contraseña</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: "100%", width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ height: "45%", width: "75%", justifyContent: 'center', alignItems: 'center', backgroundColor: "#62ac9b", borderRadius: 25 }} onPress={logOut}>
                            <Text style={{ color: "white", fontSize: 13 }}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <FormDataUser
                    dataForm={dataForm}
                    isProUser={isProUser}
                /*  handleDataSet={(e) => handleDataSet(e)} */
                />

                <FormAddDataUser
                    dataForm={dataForm}
                    isProUser={isProUser}
                    handleSeeMore={handleSeeMore}
                    itemDetail={itemDetail}
                />

            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
