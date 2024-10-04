import React, {useState, useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {SendTemplateSelected} from '../../../../../reactQuery/users';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useQueryClient} from '@tanstack/react-query';
import CustomModalLoading from '../profile/CustomModalLoading';

const CustomCheckbox = ({
  uid,
  value,
  setTemplateSelect,
  templates,
  checked
}: {
  uid?: string;
  value: any;
  setTemplateSelect?: (e: any) => void;
  templates?: any[];
  checked: boolean;
}) => {
  const queryClient = useQueryClient();
  const [isLoadingSendData, setIsLoadingSendData] = useState(false);

  const handleSelectTemplate = async () => {
    setIsLoadingSendData(true);
    const userId = uid;
    const newCheckedState = !checked;
    if (newCheckedState) {
      setTemplateSelect && setTemplateSelect(value);
    }
    const fakeDataClone = templates ? [...templates] : [];
    const templateIndex = fakeDataClone.findIndex(
      template => template.id === value.uid
    );

    if (templateIndex === -1) {
      const dataSend = [
        {
          id: value.uid,
          checked: newCheckedState
        }
      ];
      console.log('dataSend', dataSend);
      uid && (await SendTemplateSelected(uid, dataSend, queryClient));
      setIsLoadingSendData(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleSelectTemplate}
        disabled={checked}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Ionicons
          name={
            checked ? 'radio-button-on-outline' : 'radio-button-off-outline'
          }
          size={19}
          color={'#030124'}
        />
      </TouchableOpacity>
      <CustomModalLoading isLoadingSendData={isLoadingSendData} />
    </>
  );
};

export default CustomCheckbox;
