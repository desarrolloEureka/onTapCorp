'use client';
import { SafeAreaView } from 'react-native';
import {
  DataFormValues,
  SocialDataForm,
  handleDataNetworksProps,
  handleDataProps,
} from '../../../../../types/profile';
import { UserData } from '../../../../../types/user';
import ItemFormUrl from './ItemFormUrl';

const FormAddDataUser = ({
  isProUser,
  dataForm,
  handleDataSet,
  handleModalAlert,
  data,
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
  isDetailOpen: boolean;
  itemDetail: number;
  isProUser: boolean;
  dataForm: SocialDataForm;
  handleDataSet: (e: SocialDataForm) => void;
  handleModalAlert: ({
    index,
    subindex,
  }: {
    index: string;
    subindex: string;
  }) => void;
  data: [string, any][];
  handleData: ({
    name,
    text,
    subindex,
    key,
    currentDataRef,
  }: handleDataProps) => void;
  user: UserData;
  handleSwitch: (e: any) => void;
  handleAddData: (index: string) => void;
  handleModalAlertLimit: () => void;
  isModalAlertLimit: boolean;
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
    <SafeAreaView>
      {data.map((value, key) => {
        const index = value[0] as keyof typeof dataForm;
        const validation =
          value[0] == 'urlsCompany' ||
          value[0] == 'urlsCommercial';
        const labelArray: | DataFormValues[] = validation ? value[1] : null;


        console.log("labelArray ", labelArray);
        if (labelArray) {
          return value[0] == 'urlsCompany' || value[0] == 'urlsCommercial' ? (
            <ItemFormUrl
              key={key}
              dataForm={dataForm}
              handleDataSet={(e) => handleDataSet(e)}
              index={index}
              labelArray={labelArray}
              value={value}
              handleModalAlert={({ index, subindex }) =>
                handleModalAlert({ index, subindex })
              }
              isProUser={isProUser}
              handleData={handleData}
              user={user}
              handleSwitch={handleSwitch}
              handleAddData={handleAddData}
              handleDataNetworks={handleDataNetworks}
              setModalIcons={setModalIcons}
              itemUrlKey={itemUrlKey}
              itemUrlSelected={itemUrlSelected}
              handleModalIcons={handleModalIcons}
              isModalIcons={isModalIcons}
              handleDeleteData={handleDeleteData}
            />

          ) : null;

        }
      })}
    </SafeAreaView>
  );
};

export default FormAddDataUser;