import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import Share from 'react-native-share';
import {GetUser} from '../../../../../../reactQuery/users';
import {RouteStackParamList} from '../../../../../../types/navigation';

function ShareHook() {
  const {data} = GetUser();
  const [isModalAlert, setIsModalAlert] = useState(false);
  const handleModalAlert = () => setIsModalAlert(!isModalAlert);
  const navigation =
    useNavigation<StackNavigationProp<RouteStackParamList, 'Home'>>();
  const [copiedText, setCopiedText] = useState(false);
  const [urlGlobal, setUrlGlobal] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const copyToClipboard = () => {
    Clipboard.setString('' + urlGlobal);
    setCopiedText(true);

    // Después de 5 segundos, cambiar el estado de copiedText a false
    setTimeout(() => {
      setCopiedText(false);
    }, 5000);
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

  const handleShare = async () => {
    Share.open({
      title: 'Compartir enlace',
      type: 'url',
      url: urlGlobal
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  useEffect(() => {
    if (data && data.preview) {
      const url = data?.preview;
      const nuevaURL =
        url && url.replace('localhost:3000', 'on-tap-tawny.vercel.app');
      setUrlGlobal(nuevaURL);
    }
  }, []);
  return {
    data,
    isModalAlert,
    setIsModalAlert,
    handleModalAlert,
    copiedText,
    setCopiedText,
    urlGlobal,
    setUrlGlobal,
    handleBackPress,
    copyToClipboard,
    handleTabPress,
    handleShare
  };
}

export default ShareHook;
