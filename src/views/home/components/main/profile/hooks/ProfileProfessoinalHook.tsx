import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  CareerDataFormValues,
  CareerSubIndexDataForm,
  DataFormSorted,
  DataFormValues,
  EducationDataFormValues,
  EducationSubIndexDataForm,
  IndexDataForm,
  NetworksSubIndexDataForm,
  ProfessionalDataForm,
  UrlDataFormValues,
  handleDataNetworksProps,
  handleDataProps,
} from '../../../../../../types/profile';
import { profile } from '../../../../../../initialData/profileInitialData';
import { GetUser, SendDataUserProfile } from '../../../../../../reactQuery/users';
import { validateEmail, validatePhoneNumber } from '../../../../../../globals/validateData';

const ProfileProfessionalHook = ({
  handleDataSet,
  isProUser,
}: {
  handleDataSet?: (e: ProfessionalDataForm) => void;
  isProUser: boolean;
}) => {
  const { data, error } = GetUser();
  const [dataForm, setDataForm] = useState<ProfessionalDataForm>(
    profile.professional
  );
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
    const userId = data?.uid;
    const emails = dataForm?.emails?.map(email => email.text);
    const phones = dataForm?.phones?.map(phone => phone.text);
    const urls = dataForm?.urls?.map(urls => urls);
    const education = dataForm?.education?.map(education => education);
    const professionalCareer = dataForm?.professional_career?.map(
      proCareer => proCareer
    );

    /* if (emails) {
      const isEmailValid = emails.every((email) => validateEmail(email as string));
      if (!isEmailValid) {
        setStatus("El correo no es valido ó no se pueden dejar espacios en blanco");
        setisEmailPhoneRight(true);
        return;
      }
    }

    if (phones) {
      const isPhoneValid = phones.every((phone) => validatePhoneNumber(phone as string));
      if (!isPhoneValid) {
        setStatus("El teléfono no es valido ó no se pueden dejar espacios en blanco");
        setisEmailPhoneRight(true);
        return;
      }
    }

    if (urls) {
      const allObjectsFilled = dataForm?.urls?.every(obj => obj.name !== "" && obj.url !== "" && obj.icon !== "");
      if (!allObjectsFilled) {
        setStatus("No se pueden dejar espacios en blanco en urls");
        setisEmailPhoneRight(true);
        return;
      }
    } 

    if (isProUser && education) {
      const allObjectsFilled = dataForm?.education?.every(obj => obj.title !== "" && obj.institution !== "" && obj.year !== "");
      if (!allObjectsFilled) {
        setStatus("No se pueden dejar espacios en blanco en educación");
        setisEmailPhoneRight(true);
        return;
      }
    }

    if (isProUser && professionalCareer) {
      const allObjectsFilled = dataForm?.professional_career?.every(obj => obj.company !== "" && obj.position !== "" && obj.data_init !== "" && obj.data_end !== "");
      if (!allObjectsFilled) {
        setStatus("No se pueden dejar espacios en blanco en trayectoria");
        setisEmailPhoneRight(true);
        return;
      }
    }
    */

    setIsLoadingSendData(true);
    if (userId) {
      const isSendDataProfile = await SendDataUserProfile(userId, dataForm, isProUser);
      if (isSendDataProfile?.success) {
        setIsDataError(false);
        setIsDataSuccess(true);
        setIsLoadingSendData(false);
      } else {
        setIsDataError(true);
        setIsDataSuccess(false);
        setIsLoadingSendData(false);
      }
    } else {
      setIsLoadingSendData(false);
    }
  };

  const handleModalAlertLimit = () => {
    setIsModalAlertLimit(!isModalAlertLimit);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalAlert = (itemDelete: {
    index: string;
    subindex: string;
  }) => {
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

  const handleSeeMore = (numItem: number) => {
    if (itemDetail != 0) {
      setItemDetail(0);
    } else {
      setItemDetail(numItem);
    }
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
    if (
      index != 'phones' &&
      index != 'education' &&
      index != 'emails' &&
      index != 'professional_career' &&
      index != 'urls' &&
      (dataFormClone[index]?.label != 'phones' ||
        dataFormClone[index]?.label != 'education' ||
        dataFormClone[index]?.label != 'emails' ||
        dataFormClone[index]?.label != 'professional_career' ||
        dataFormClone[index]?.label != 'urls')
    ) {
      dataFormClone[index]!.checked = !isChecked;
      setDataForm(dataFormClone);
    } else {
      let dataAux = dataFormClone[index] as DataFormValues[];
      if (dataAux && subindex != undefined) {
        dataAux[subindex].checked = !isChecked;
        currentDataRef.current.length > 0 &&
          (currentDataRef.current[subindex].checked = !isChecked);
        setDataForm(dataFormClone);
      }
    }
  };

  const fillFields = (
    index: IndexDataForm,
    key: number,
    text: string,
    subindexEducation?: EducationSubIndexDataForm,
    subindexCareer?: CareerSubIndexDataForm,
    subindexUrl?: NetworksSubIndexDataForm
  ) => {
    const dataFormClone = { ...dataForm };
    dataFormClone && index == 'education' && subindexEducation
      ? (dataFormClone[index]![key][subindexEducation] = text)
      : index == 'professional_career'
        ? subindexCareer && (dataFormClone[index]![key][subindexCareer] = text)
        : index == 'urls' &&
        subindexUrl &&
        (dataFormClone[index]![key][subindexUrl] = text);

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
    key != undefined &&
      subindex &&
      fillFields(index, key, text, undefined, undefined, subindex);
      
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
    if (
      index != 'phones' &&
      index != 'emails' &&
      index != 'education' &&
      index != 'professional_career' &&
      index != 'urls'
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
        index == 'education' &&
        (subindex == 'title' ||
          subindex == 'year' ||
          subindex == 'institution') &&
        key != undefined
      ) {
        currentDataRef.current[key][subindex] = text;
        fillFields(index, key, text, subindex);
      } else if (
        index == 'professional_career' &&
        (subindex == 'company' ||
          subindex == 'data_end' ||
          subindex == 'data_init' ||
          subindex == 'position') &&
        key != undefined
      ) {
        currentDataRef.current[key][subindex] = text;
        fillFields(index, key, text, undefined, subindex);
      } else if (
        index == 'urls' &&
        (subindex == 'name' || subindex == 'url' || subindex == 'icon') &&
        key != undefined
      ) {
        currentDataRef.current[key][subindex] = text;
        fillFields(index, key, text, undefined, undefined, subindex);
      }
    }
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
    if (
      index == 'phones' ||
      index == 'education' ||
      index == 'emails' ||
      index == 'urls' ||
      index == 'professional_career'
    ) {
      const count = dataFormClone?.[index]?.length;

      if (index === 'phones') {
        if ((count != null || count != undefined) && count < 3) {
          if (count === 0) {
            dataFormClone.phones = [
              {
                label: "labelPhone",
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
      if (index === 'education') {
        if ((count != null || count != undefined) && count < 3) {
          if (count === 0) {
            dataFormClone.education = [
              {
                label: "Formación académica",
                title: '',
                institution: '',
                year: '',
                checked: true,
                principal: false,
                social: false,
                professional: true,
                icon: '',
                order: 11,
              },
            ];
          } else {
            dataFormClone[index]?.unshift({
              label: dataFormClone[index]![0].label,
              title: '',
              institution: '',
              year: '',
              checked: true,
              principal: false,
              social: false,
              professional: true,
              icon: '',
              order: 11,
            });
          }
        } else {
          setIsModalAlertLimit(true);
        }
      }
      if (index === 'professional_career') {
        if ((count != null || count != undefined) && count < 3) {
          if (count === 0) {
            dataFormClone.professional_career = [
              {
                label: "Trayectoria Profesional",
                company: '',
                position: '',
                data_init: '',
                data_end: '',
                checked: true,
                principal: false,
                social: false,
                professional: true,
                icon: '',
                order: 12,
              },
            ];
          } else {
            dataFormClone[index]?.unshift({
              label: dataFormClone[index]![0].label,
              company: '',
              position: '',
              data_init: '',
              data_end: '',
              checked: true,
              principal: false,
              social: false,
              professional: true,
              icon: '',
              order: 12,
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
              social: false,
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
            social: false,
            professional: true,
            order: 13,
          });
        }
      }
      setDataForm(dataFormClone);
    }
  };

  const checkedItems = (
    data: DataFormValues[] | EducationDataFormValues[] | CareerDataFormValues[],
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
          label = "Telefono";
          break;
        case 'address':
          label = "Dirección";
          break;
        case 'company':
          label = "Empresa";
          break;
        case 'position':
          label = "Cargo";
          break;
        case 'professional_profile':
          label = "Perfil Profesional";
          break;
        case 'other_competencies':
          label = "Otras Competencias";
          break;
        case 'skills':
          label = "Habilidades";
          break;
        case 'languages':
          label = "Idiomas";
          break;
        case 'achievements_recognitions':
          label = "Logros y reconocimientos";
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
      } else if (value[0] == 'education') {
        const data = value[1] as EducationDataFormValues[];
        return checkedItems(data, value[0], !isChecked);
      } else if (value[0] == 'professional_career') {
        const data = value[1] as CareerDataFormValues[];
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
    //this flag rerender the main component to show the data on fields
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
    }, 200);
  }, [dataForm]);

  useEffect(() => {
    if (dataForm.name?.label == '') {
      const dataFormClone = { ...dataForm };
      const items = Object.entries(dataFormClone);
      const newData = items.map((value) => {
        if (value[0] == 'phones') {
          const data = value[1] as DataFormValues[];
          return checkedItems(
            data,
            value[0],
            false,
            "Teléfono"
          );
        } else if (value[0] == 'emails') {
          const data = value[1] as DataFormValues[];
          return checkedItems(
            data,
            value[0],
            false,
            "Correo"
          );
        } else if (value[0] == 'education') {
          const data = value[1] as EducationDataFormValues[];
          return checkedItems(
            data,
            value[0],
            false,
            "Formación académica"
          );
        } else if (value[0] == 'professional_career') {
          const data = value[1] as CareerDataFormValues[];
          return checkedItems(
            data,
            value[0],
            false,
            "Trayectoria Profesional"
          );
        } else if (value[0] == 'urls') {
          const data = value[1] as UrlDataFormValues[];
          return checkedItems(data, value[0], false, 'urls');
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
    let myDataForm = null;
    if (data?.profile) {
      myDataForm = data.profile.professional ?? profile.professional;
    } else {
      myDataForm = profile.professional;
    }
    myDataForm && setDataForm(myDataForm);
  }, [data, isProUser]);

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
    handleModal,
    handleModalAlert,
    handleSuccessDelete,
    handleSeeMore,
    isDetailOpen,
    itemDetail,
    isModalOpen,
    isModalAlert,
    isSuccessDelete,
    itemDelete,
    isModalAlertLimit,
    handleModalAlertLimit,
    handleSendProfile,
    isDataSuccess,
    setIsDataSuccess,
    isDataError,
    setIsDataError,
    user: data,
    isDataLoad,
    dataForm,
    setDataForm,
    noDeleted,
    isModalIcons,
    setModalIcons,
    handleModalIcons,
    itemUrlSelected,
    itemUrlKey,
    status,
    isEmailPhoneRight,
    setisEmailPhoneRight,
    isLoadingSendData,
    setIsLoadingSendData,
    switchValue,
    setSwitchValue
  };
};

export default ProfileProfessionalHook;
