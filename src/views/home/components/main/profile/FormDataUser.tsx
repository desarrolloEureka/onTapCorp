import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { profileStyles } from '../../../styles/profileStyles';
import ItemForm from './ItemForm';
import ProfileHook from './hooks/ProfileHook';
import {
    CareerDataFormValues,
    DataForm,
    DataFormValues,
    EducationDataFormValues,
    UrlDataFormValues,
    handleDataProps
} from '../../../../../types/profile';
import TextAreaForm from './TextAreaForm';

const FormDataUser = ({
    isProUser,
    handleDataSet,
}: {
    isProUser: boolean;
    dataForm: DataForm;
    handleDataSet: (e: DataForm) => void;
}) => {
    const { handleSwitch, handleData, data, user, dataForm } = ProfileHook({
        handleDataSet,
    });

    return (
        <SafeAreaView>
            {data.map((value, key) => {
                const index = value[0] as keyof typeof dataForm;
                const labelArray:
                    | DataFormValues[]
                    | EducationDataFormValues[]
                    | CareerDataFormValues[] =
                    value[0] == 'phones' ||
                        value[0] == 'education' ||
                        value[0] == 'emails' ||
                        value[0] == 'urls' ||
                        value[0] == 'professional_career'
                        ? value[1]
                        : null;

                if (!labelArray) {
                    if (isProUser) {
                        if (
                            value[0] == 'professional_profile' ||
                            value[0] == 'other_competencies' ||
                            value[0] == 'skills' ||
                            value[0] == 'languages' ||
                            value[0] == 'achievements_recognitions'
                        ) {
                            const myValue =
                                user && index == value[0]
                                    ? user.profile[index]?.text
                                    : undefined;
                            const myValue1 = (user && index == value[0]
                                ? user.profile[index]
                                : undefined) as unknown as DataFormValues;
                            return (
                                <TextAreaForm
                                    label={value[1].label}
                                    handleSwitch={(e: any) => handleSwitch(e)}
                                    handleData={handleData}
                                    name={index}
                                    checked={value[1].checked}
                                    key={key}
                                    icon={value[1].icon}
                                    value={myValue}
                                    myValue={myValue1}
                                    dataForm={dataForm}
                                    index={index}
                                />
                            );
                        } else {
                            const myValue = (user && index == value[0]
                                ? user.profile[index]
                                : undefined) as unknown as DataFormValues;
                            return (
                                <ItemForm
                                    label={value[1].label}
                                    handleSwitch={(e: any) => handleSwitch(e)}
                                    handleData={handleData}
                                    name={index}
                                    checked={value[1].checked}
                                    key={key}
                                    icon={value[1].icon}
                                    value={value[1].text}
                                    myValue={myValue}
                                    dataForm={dataForm}
                                    index={index}
                                />
                            );
                        }
                    } else {
                        const myValue = (user && index == value[0]
                            ? user.profile[index]
                            : undefined) as unknown as DataFormValues;
                        return value[1].social == true ? (
                            <ItemForm
                                label={value[1].label}
                                handleSwitch={(e: any) => handleSwitch(e)}
                                handleData={handleData}
                                name={index}
                                checked={value[1].checked}
                                key={key}
                                icon={value[1].icon}
                                myValue={myValue}
                                dataForm={dataForm}
                                index={index}
                            />
                        ) : null;
                    }
                }
            })}
        </SafeAreaView>
    );
};

export default FormDataUser;