import { useCallback, useEffect, useState } from 'react';
import {
  DataFormSorted,
  DataFormValues,
  IndexDataForm,
  UrlDataFormValues,
  handleDataProps,
  handleDataNetworksProps,
  NetworksSubIndexDataForm,
  SocialDataForm,
} from '../../../../../../types/profile';
import { profile } from '../../../../../../initialData/profileInitialData';
import { GetUser, SendDataUserProfile } from '../../../../../../reactQuery/users';
import { validateEmail, validatePhoneNumber } from '../../../../../../globals/validateData';

const ProfileHook = ({
  handleDataSet,
  isProUser
}: {
  handleDataSet?: (e: SocialDataForm) => void;
  isProUser: boolean;
}) => {
  const { data, error } = GetUser();
  const [dataForm, setDataForm] = useState<SocialDataForm>(profile.social);
  const [objectDataSort, setObjectDataSort] = useState<[string, any][]>([]);
  const [allChecked, setAllChecked] = useState(false);
  const [isModalAlertLimit, setIsModalAlertLimit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isSuccessDelete, setSuccessDelete] = useState(false);
  const [isModalIcons, setModalIcons] = useState(false);
  const [itemUrlSelected, setItemUrlSelected] = useState([]);
  const [itemUrlKey, setItemUrlKey] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState(0);

  /* Delete items */
  const [itemDelete, setItemDelete] = useState<
    { index: string; subindex: string } | {}
  >();

  const [isDataSuccess, setIsDataSuccess] = useState(false);
  const [isDataError, setIsDataError] = useState(false);
  const [isDataLoad, setIsDataLoad] = useState(false);
  const [noDeleted, setNoDeleted] = useState(false);
  const [isEmailPhoneRight, setisEmailPhoneRight] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [flag, setFlag] = useState(false);

  /* Propios */
  const [isLoadingSendData, setIsLoadingSendData] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);

  const handleSendProfile = async (isProUser: boolean) => {

  };

  const handleModalAlert = (itemDelete: { index: string; subindex: string }) => {
    if (!isModalAlert) {
      setItemDelete(itemDelete);
    } else {
      setItemDelete('');
    }
    setIsModalAlert(!isModalAlert);
  };

  const handleSuccessDelete = () => {
    setSuccessDelete(!isSuccessDelete);
  };

  const handleModalIcons = (item: any, key: any) => {
    setItemUrlSelected(item ? item : []);
    setItemUrlKey(key);
    setModalIcons(!isModalIcons);
  };

  const handleModalAux = () => {
    setIsModalAlert(!isModalAlert);
    setNoDeleted(!noDeleted);
  };

  const handleSwitch = ({
    currentDataRef,
    checked,
    name,
    subindex
  }: {
    currentDataRef?: any;
    checked?: boolean;
    name?: string
    subindex?: number
  }) => {
    const isChecked = checked;
    const dataFormClone = { ...dataForm };
    const index = name as keyof typeof dataFormClone;

  };

  const fillFields = (
    index: IndexDataForm,
    key: number,
    text: string,
    subindexUrl?: NetworksSubIndexDataForm
  ) => {
    const dataFormClone = { ...dataForm };

    setDataForm(dataFormClone);
    setIsDataLoad(true);
  };

  const handleDataNetworks = ({
    name,
    text,
    subindex,
    key,
  }: handleDataNetworksProps) => {
    const dataFormClone = { ...dataForm };
    const index = name as keyof typeof dataFormClone;
    key != undefined && subindex && fillFields(index, key, text, subindex);
    setTimeout(() => {
      setModalIcons(!isModalIcons);
    }, 500);
  };

  const handleData = ({
    name,
    text,
    subindex,
    key,
    currentDataRef,
  }: handleDataProps) => {
    const dataFormClone = { ...dataForm };
    const index = name as keyof typeof dataFormClone;
    /* if (
      index == 'name' ||
      index == 'nit' ||
      index == 'profession' ||
      index == 'occupation' ||
      index == 'address'
    ) {
      dataFormClone[index]!.text = text;
      currentDataRef.current.text = text;
      setDataForm(dataFormClone);
      setIsDataLoad(true);
    } else {
      if (index == 'phones' || index == 'emails') {
        const dataAux = dataFormClone[index];
        if (dataAux && key != undefined) {
          dataAux[key].text = text;
          currentDataRef.current.length > 0 &&
            (currentDataRef.current[key].text = text);
          dataAux && setDataForm(dataFormClone);
        }
        setIsDataLoad(true);
      } else if (
        index == 'urls' &&
        (subindex == 'name' || subindex == 'url' || subindex == 'icon') &&
        key != undefined
      ) {
        currentDataRef.current[key][subindex] = text;
        fillFields(index, key, text, subindex);
      }
    } */
  };

  const handleDeleteData = () => {
    setIsDataLoad(false);
    const index =
      itemDelete && 'index' in itemDelete ? itemDelete['index'] : undefined;
    const subindex =
      itemDelete && 'subindex' in itemDelete
        ? itemDelete['subindex']
        : undefined;
    const dataFormClone = { ...dataForm };
    const dataAux: any = dataFormClone[index as keyof typeof dataForm];
    if (
      dataAux?.length > 1 &&
      Array.isArray(dataAux) &&
      subindex !== undefined
    ) {
      dataAux.splice(parseInt(subindex, 10), 1); // Elimina el elemento en la posición subindex
      setDataForm(dataFormClone);

      setTimeout(() => {
        setIsModalAlert(false);
        setSuccessDelete(true);
      }, 500);
    } else {
      setNoDeleted(true);
    }
  };

  const handleAddData = (index: string) => {
    const dataFormClone = { ...dataForm };
    /*  if (index == 'phones' || index == 'emails' || index == 'urls') {
       const count = dataFormClone?.[index]?.length;
       if (index === 'phones') {
         if ((count != null || count != undefined) && count < 3) {
           if (count === 0) {
             dataFormClone.phones = [
               {
                 label: "Teléfono",
                 text: '',
                 checked: true,
                 principal: false,
                 social: true,
                 professional: true,
                 icon: 'LocalPhoneOutlinedIcon',
                 order: 9,
               },
             ];
           } else {
             dataFormClone[index]?.unshift({
               label: dataFormClone[index]![0].label,
               text: '',
               checked: true,
               principal: false,
               social: true,
               professional: true,
               icon: 'LocalPhoneOutlinedIcon',
               order: 9,
             });
           }
         } else {
           setIsModalAlertLimit(true);
         }
       }
 
       if (index === 'emails') {
         if ((count != null || count != undefined) && count < 3) {
           if (count === 0) {
             dataFormClone.phones = [
               {
                 label: "Correo",
                 text: '',
                 checked: true,
                 principal: false,
                 social: true,
                 professional: true,
                 icon: 'EmailOutlinedIcon',
                 order: 10,
               },
             ];
           } else {
             dataFormClone[index]?.unshift({
               label: dataFormClone[index]![0].label,
               text: '',
               checked: true,
               principal: false,
               social: true,
               professional: true,
               icon: 'EmailOutlinedIcon',
               order: 10,
             });
           }
         } else {
           setIsModalAlertLimit(true);
         }
       }
       if (index === 'urls') {
         //if ((count != null || count != undefined) && count < 3) {
         if (count === 0) {
           dataFormClone.urls = [
             {
               label: 'urls',
               name: '',
               url: '',
               icon: '',
               checked: true,
               principal: false,
               social: true,
               professional: true,
               order: 13,
             },
           ];
         } else {
           dataFormClone[index]?.unshift({
             label: dataFormClone[index]![0].label,
             name: '',
             url: '',
             icon: '',
             checked: true,
             principal: false,
             social: true,
             professional: true,
             order: 13,
           });
         }
       }
       setDataForm(dataFormClone);
     } */
  };

  const handleModalAlertLimit = () => {
    setIsModalAlertLimit(false);
  }

  const checkedItems = (
    data: DataFormValues[],
    value: string,
    checked?: boolean,
    label?: string
  ) => {
    data.map((el) => {
      el.checked = checked;
      el.label = label ?? el.label;
    });
    return [value, data];
  };

  const checkedItem = (
    data: DataFormValues,
    value: string,
    checked?: boolean,
    label?: string
  ) => {
    data.checked = checked;
    data.label = label ?? data.label;
    return [value, data];
  };

  const validLabel = useCallback(
    (key: string) => {
      let label = '';
      switch (key) {
        case 'name':
          label = "Nombres";
          break;
        case 'nit':
          label = "NIT";
          break;
        case 'sector':
          label = "Sector";
          break;
        case 'phone':
          label = "Teléfono";
          break;
      }
      return label;
    },
    []
  );

  const handleSwitchAll = (val: any) => {
    setSwitchValue(!switchValue);
    const isChecked = val?.checked;
    const dataFormClone = { ...dataForm };
    const items = Object.entries(dataFormClone);

    const newData = items.map((value) => {
      if (value[0] == 'phones' || value[0] == 'emails') {
        const data = value[1] as DataFormValues[];
        return checkedItems(data, value[0], !isChecked);
      } else if (value[0] == 'urls') {
        const data = value[1] as UrlDataFormValues[];
        return checkedItems(data, value[0], !isChecked);
      } else {
        const data = value[1] as DataFormValues;
        return checkedItem(data, value[0], !isChecked);
      }
    });

    const dataFormChecked = Object.fromEntries(newData);
    handleDataSet && handleDataSet(dataFormChecked);
    setAllChecked(true);
  };

  useEffect(() => {
    const data = Object.entries(dataForm as DataFormSorted).sort((a, b) => {
      const aa = a[1].length ? a[1][0].order : a[1].order;
      const bb = b[1].length ? b[1][0].order : b[1].order;
      return aa - bb;
    });
    setObjectDataSort(data);
  }, [dataForm, isProUser]);

  useEffect(() => {
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
    }, 1000);
  }, [dataForm]);

  useEffect(() => {
    let myDataForm = null;
    if (data?.profile) {
      myDataForm = data.profile.social ?? profile.social;
    } else {
      myDataForm = profile.social;
    }
    myDataForm && setDataForm(myDataForm);
  }, [data, isProUser]);



  useEffect(() => {
    if (dataForm?.name?.label == '') {
      const dataFormClone = { ...dataForm };
      const items = Object.entries(dataFormClone);
      const newData = items.map((value) => {
        if (value[0] == 'phones') {
          const data = value[1] as DataFormValues[];
          return checkedItems(
            data,
            value[0],
            false,
            "Telefono"
          );
        } else if (value[0] == 'emails') {
          const data = value[1] as DataFormValues[];
          return checkedItems(
            data,
            value[0],
            false,
            "Correo"
          );
        } else if (value[0] == 'urls') {
          const data = value[1] as UrlDataFormValues[];
          return checkedItems(
            data,
            value[0],
            false,
            "urls"
          );
        } else {
          const data = value[1] as DataFormValues;
          const label = validLabel(value[0]);
          return checkedItem(data, value[0], false, label);
        }
      });
      const dataFormChecked = Object.fromEntries(newData);
      handleDataSet && handleDataSet(dataFormChecked);
    }
  }, [dataForm, handleDataSet, validLabel]);

  useEffect(() => {
    if (allChecked && dataForm) {
      const dataFormClone = { ...dataForm };
      handleDataSet && handleDataSet(dataFormClone);
      setAllChecked(false);
    }
  }, [allChecked, dataForm, handleDataSet]);

  return {
    handleSwitch,
    handleData,
    handleDataNetworks,
    handleAddData,
    handleSwitchAll,
    data: objectDataSort,
    handleDeleteData,
    handleModalAux,
    handleModalAlert,
    isModalAlertLimit,
    isDetailOpen,
    itemDetail,
    isModalOpen,
    isModalAlert,
    isSuccessDelete,
    itemDelete,
    isDataSuccess,
    setIsDataSuccess,
    isDataError,
    setIsDataError,
    user: data,
    isDataLoad,
    dataForm,
    setDataForm,
    handleSendProfile,
    setIsModalAlert,
    handleSuccessDelete,
    switchValue,
    setSwitchValue,
    isLoadingSendData,
    setIsLoadingSendData,
    isModalIcons,
    setModalIcons,
    handleModalIcons,
    itemUrlSelected,
    itemUrlKey,
    status,
    isEmailPhoneRight,
    setisEmailPhoneRight,
    noDeleted,
    handleModalAlertLimit
  };
};

export default ProfileHook;