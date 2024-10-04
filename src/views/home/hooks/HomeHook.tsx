import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {Alert, BackHandler} from 'react-native';
import LogOut from '../../../hooks/logOut/LogOut';
import {GetAllTemplates, GetAllCommunications} from '../../../reactQuery/home';
import {
  GetUser,
  SendInactiveUser,
  SendTemplateSelected
} from '../../../reactQuery/users';

const HomeHook = () => {
  const {data} = GetUser();
  const templates = GetAllTemplates();
  const circulares = GetAllCommunications('circular', data?.idCompany, '');
  const eventos = GetAllCommunications('events', data?.idCompany, '');
  const politicas = GetAllCommunications('policy', data?.idCompany, '');
  const forms = GetAllCommunications('forms', data?.idCompany, '');
  const news = GetAllCommunications('news', data?.idCompany, '');
  const communications = [
    {title: 'Circulares', items: circulares?.data},
    {title: 'Eventos', items: eventos?.data},
    {title: 'Politicas', items: politicas?.data},
    {title: 'Formularios y solicitudes', items: forms?.data},
    {title: 'Noticias', items: news?.data}
  ];
  const queryClient = useQueryClient();
  const {logOut} = LogOut();
  const [isAlertProfileSocial, setIsAlertProfileSocial] = useState(false);
  const [isModalAlertBg, setIsModalAlertBg] = useState(false);
  const [isLoadingSendData, setIsLoadingSendData] = useState(false);
  const [copiedText, setIscopiedText] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any, 'Home'>>();
  const handleAlertProfileSocial = (status: boolean) =>
    setIsAlertProfileSocial(!isAlertProfileSocial);
  const handleModalAlertBg = (status: boolean) =>
    setIsModalAlertBg(!isModalAlertBg);

  const [alertSwitchOff, setAlertSwitchOff] = useState(false);
  const handleAlertSwitch = (status: boolean) =>
    setAlertSwitchOff(!alertSwitchOff);

  const [alertLogOut, setAlertLogOut] = useState(false);
  const handleAlertLogOut = (status: boolean) => setAlertLogOut(!alertLogOut);

  const [alertDelte, setAlertDelte] = useState(false);
  const handleAlertDelete = (status: boolean) => setAlertDelte(!alertDelte);

  const handleNavigatePreview = async () => {
    // if (data?.profile?.social) {
    // if (template) {
    navigation.navigate('PreviewTemplate');
    // } else {
    //   setIsModalAlertBg(true);
    // }
    // } else {
    //   setIsAlertProfileSocial(true);
    // }
  };

  const copyToClipboard = () => {
    const url = data?.preview;
    Clipboard.setString('' + url);
    setIscopiedText(true);
    setTimeout(() => {
      setIscopiedText(false);
    }, 5000);
  };

  //Funcion navegacion tabNav
  const handleTabPress = (tabName: string) => {
    if (tabName === 'Profile') {
      navigation.navigate('Profile');
    } else if (tabName === 'Meetings') {
      navigation.navigate('Meetings');
    } else if (tabName === 'Roads') {
      navigation.navigate('Roads');
    } else if (tabName === 'ShareQR') {
      navigation.navigate('ShareQR');
    } else {
      navigation.navigate('Home');
    }
  };

  //Funcion selecionar plantilla(CheckBox)
  const selectTemplate = async (value: any) => {
    let fakeDataClone = [];
    setIsLoadingSendData(true);
    fakeDataClone = [
      {
        id: value.id,
        checked: true
      }
    ];
    if (data?.uid) {
      await SendTemplateSelected(data?.uid, fakeDataClone, queryClient);
      await setIsLoadingSendData(false);
    }
  };

  const handlePressModalYes = async (type: boolean) => {
    if (data) {
      if (type === true) {
        const resUpdate = await SendInactiveUser(data?.uid);
        if (resUpdate === true) {
          Alert.alert('', 'Se eliminó correctamente la cuenta');
          logOut();
        } else {
          Alert.alert(
            '',
            'Ocurrió un error y no fue posible eliminar la cuenta. Por favor, inténtalo de nuevo.'
          );
        }
      } else {
        setAlertLogOut(false);
        logOut();
      }
    }
  };

  const onBackPress = () => {
    const index = navigation.getState().index;
    if (index < 2) {
      BackHandler.exitApp();
      return true;
    }
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );
    return () => subscription.remove();
  });

  return {
    templates: templates.data,
    communications: communications,
    copiedText,
    user: data,
    isModalAlertBg,
    handleModalAlertBg,
    handleAlertProfileSocial,
    isLoadingSendData,
    copyToClipboard,
    handleNavigatePreview,
    selectTemplate,
    isAlertProfileSocial,
    handleTabPress,
    alertSwitchOff,
    handleAlertSwitch,
    setAlertSwitchOff,
    alertLogOut,
    setAlertLogOut,
    handleAlertLogOut,
    alertDelte,
    setAlertDelte,
    handleAlertDelete,
    handlePressModalYes
  };
};

export default HomeHook;
