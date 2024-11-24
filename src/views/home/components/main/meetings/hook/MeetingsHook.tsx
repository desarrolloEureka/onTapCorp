import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  GetUser,
  SendDataUpdateInfo,
  SendDataInitialInfo,
  SendDataLocation
} from '../../../../../../reactQuery/users';
import {useState} from 'react';

type Props = {};

const MeetingsHook = (props?: Props) => {
  const {data} = GetUser();

  const [activeTab, setActiveTab] = useState('tab1');
  const [searchText, setSearchText] = useState('');
  const [showConfigSearch, setShowConfigSearch] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [isLoadingSendData, setIsLoadingSendData] = useState(false);
  const [isDataSuccess, setIsDataSuccess] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [alertGPSOff, setAlertGPSOff] = useState(false);

  const navigation = useNavigation<StackNavigationProp<any, 'Home'>>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleConfigSearch = () => setShowConfigSearch(!showConfigSearch);

  const handleFilterChange = (filter: any) => {
    setSelectedFilter(filter);
  };

  const handleShowDetail = (meeting: any) => {
    setSelectedMeeting(meeting);
    setShowModalDetail(!showModalDetail);
  };

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

  const handleSendInitialInfo = async (dataInitial: any) => {
    const userId = data?.uid;
    if (!userId) {
      return;
    }
    try {
      const isSendDataProfile = await SendDataInitialInfo(userId, dataInitial);
      if (isSendDataProfile?.success) {
        return isSendDataProfile?.uid?.toString();
      } else {
        console.log('ERROR =>', isSendDataProfile?.error);
      }
    } catch (error) {
      console.log('CATCH ERROR =>', error);
    }
  };

  const handleSendUpdateInfo = async (
    documentId: string,
    dataUpdate: any,
    save: boolean
  ) => {
    const userId = data?.uid;
    if (!userId) {
      setIsLoadingSendData(false);
      return;
    }
    save && setIsLoadingSendData(true);
    try {
      const isSendDataProfile = await SendDataUpdateInfo(
        userId,
        documentId,
        dataUpdate
      );
      if (isSendDataProfile?.success) {
        if (save) {
          setIsDataSuccess(true);
        } else {
          setIsDataSuccess(false);
        }
        return isSendDataProfile?.uid?.toString();
      } else {
        setIsDataSuccess(false);
        console.log('ERROR =>', isSendDataProfile?.error);
      }
    } catch (error) {
      console.log('CATCH ERROR =>', error);
    } finally {
      setIsLoadingSendData(false);
    }
  };

  const handleSendLocation = async (
    latitude: string,
    longitude: string,
    subject: string,
    timestamp: string
  ) => {
    const userId = data?.uid;
    const companyId = data?.idCompany;
    if (!userId) {
      return;
    }
    try {
      const isSendDataProfile = await SendDataLocation(
        companyId,
        userId,
        latitude,
        longitude,
        subject,
        timestamp
      );
      if (isSendDataProfile?.success) {
        return isSendDataProfile?.uid?.toString();
      } else {
        console.log('ERROR =>', isSendDataProfile?.error);
      }
    } catch (error) {
      console.log('CATCH ERROR =>', error);
    }
  };

  const handleAlertGPS = () =>
    setAlertGPSOff(!alertGPSOff);

  return {
    user: data,
    handleTabPress,
    handleBackPress,
    activeTab,
    setActiveTab,
    searchText,
    setSearchText,
    handleConfigSearch,
    showConfigSearch,
    handleFilterChange,
    selectedFilter,
    handleShowDetail,
    selectedMeeting,
    showModalDetail,
    handleSendInitialInfo,
    handleSendUpdateInfo,
    isLoadingSendData,
    isDataSuccess,
    handleSendLocation,
    setAlertGPSOff,
    handleAlertGPS,
    alertGPSOff,
  };
};

export default MeetingsHook;
