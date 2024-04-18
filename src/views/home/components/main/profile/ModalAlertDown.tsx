import React from 'react';
import { View, TouchableOpacity, Modal, Text } from 'react-native';

function ModalAlertDown({
    isModalAlert,
    handleModalAlert,
    handlePressModalYes,
    description,
    isDelete
}: {
    isModalAlert: boolean;
    handleModalAlert: (e: boolean) => void;
    handlePressModalYes: (e: boolean) => void;
    description: string;
    isDelete: boolean;
}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalAlert}
            onRequestClose={() => handleModalAlert(false)}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
                <View style={{ height: '100%', width: '100%', justifyContent: 'flex-end' }}>
                    <View style={{ height: '23%', width: '100%', backgroundColor: 'white', borderTopRightRadius: 25, borderTopLeftRadius: 25, justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ height: '55%', width: '65%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: '400', lineHeight: 22.98, letterSpacing: 0.03, textAlign: 'center', color: 'black' }}>
                                {description}
                            </Text>
                        </View>
                        <View style={{ height: '45%', width: '75%', flexDirection: 'row' }}>
                            <View style={{ height: '100%', width: '50%', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <TouchableOpacity style={{ height: '50%', width: '45%', backgroundColor: '#396593', borderRadius: 6, justifyContent: 'center', alignItems: 'center' }} onPress={() => handlePressModalYes(isDelete)}>
                                    <Text style={{ fontSize: 17, fontWeight: '300', lineHeight: 22.98, letterSpacing: 0.03, textAlign: 'center', color: 'white' }}>Si</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: '100%', width: '50%', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <TouchableOpacity style={{ height: '50%', width: '45%', backgroundColor: '#396593', borderRadius: 6, justifyContent: 'center', alignItems: 'center' }} onPress={() => handleModalAlert(false)}>
                                    <Text style={{ fontSize: 17, fontWeight: '300', lineHeight: 22.98, letterSpacing: 0.03, textAlign: 'center', color: 'white' }}>No</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </View>

            </View>
        </Modal>
    );
}

export default ModalAlertDown;
