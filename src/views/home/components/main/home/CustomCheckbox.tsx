import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { TemplateData } from '../../../../../types/user';
import { SendTemplateSelected } from '../../../../../reactQuery/users';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useQueryClient } from '@tanstack/react-query';
import CustomModalLoading from '../profile/CustomModalLoading';

const CustomCheckbox = ({
    uid,
    value,
    checked,
}: {
    uid?: string;
    value: any;
    templates?: TemplateData[];
    checked: boolean;
}) => {
    const queryClient = useQueryClient();
    const [isLoadingSendData, setIsLoadingSendData] = useState(false);

    const handleSelectTemplate = async () => {
        let fakeDataClone = []
        setIsLoadingSendData(true);
        fakeDataClone = [({
            id: value.id,
            checked: true,
        })];
        if (uid) {
            await SendTemplateSelected(uid, fakeDataClone, queryClient);
            await setIsLoadingSendData(false);
        }
    };

    return (
        <>
            <TouchableOpacity
                onPress={handleSelectTemplate}
                disabled={checked}
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
                <Ionicons
                    name={checked ? 'radio-button-on-outline' : 'radio-button-off-outline'}
                    size={19}
                    color={'#030124'}
                />
            </TouchableOpacity>
            <CustomModalLoading
                isLoadingSendData={isLoadingSendData}
            />
        </>
    );
};

export default CustomCheckbox;