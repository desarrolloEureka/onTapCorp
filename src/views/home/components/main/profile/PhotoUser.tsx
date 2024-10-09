import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, Image, SafeAreaView, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  MediaType
} from 'react-native-image-picker';
import {GetUser, GetArea, SendDataImage} from '../../../../../reactQuery/users';
import {UserData} from '../../../../../types/user';
import {profileStyles} from '../../../styles/profileStyles';

const PhotoUser = ({name, isProUser}: {name?: string; isProUser: boolean}) => {
  const user = GetUser();
  const data = user.data;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImagePro, setSelectedImagePro] = useState<string | null>(null);
  const [area, setArea] = useState<any>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      const data = await GetArea(user.data.selectedArea);
      setArea(data);
    };
    user.data && fetchCompanyData();
  }, [user.data]);

  useEffect(() => {
    // Recuperar la imagen almacenada en AsyncStorage al cargar el componente
    const fetchAsyncStorageImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem('selectedImage');
        const storedImagePro = await AsyncStorage.getItem('selectedImagePro');
        if (storedImage) {
          setSelectedImage(storedImage);
        }
        if (storedImagePro) {
          setSelectedImagePro(storedImagePro);
        }
      } catch (error: any) {
        console.error(
          'Error al recuperar la imagen desde AsyncStorage:',
          error.message
        );
      }
    };

    fetchAsyncStorageImage();
  }, []);

  const openImagePicker = async () => {
    try {
      const options: ImageLibraryOptions = {
        mediaType: 'photo' as MediaType,
        includeBase64: true,
        quality: 1,
        maxWidth: 300,
        maxHeight: 300
      };

      const result = await launchImageLibrary(options);

      if (result.didCancel || result.errorMessage) {
        Alert.alert(
          '',
          'El usuario canceló la selección o hubo un error. Inténtalo de nuevo'
        );
        return;
      }

      const asset = result.assets && result.assets[0];
      if (asset && asset.uri && asset.base64 && data && data?.uid) {
        if (isProUser === true) {
          setSelectedImagePro(asset.uri);
          await AsyncStorage.setItem('selectedImagePro', asset.uri);
        } else {
          setSelectedImage(asset.uri);
          await AsyncStorage.setItem('selectedImage', asset.uri);
        }

        await SendDataImage(
          isProUser,
          data?.uid,
          `data:${asset.type};base64,${asset.base64}`
        );
      } else {
        Alert.alert(
          '',
          'La selección de imagen no es válida. Inténtalo de nuevo.'
        );
      }
    } catch (error: any) {
      console.error('Error al abrir la galería:', error.message);
      Alert.alert('', 'Error al abrir la galería. Inténtalo de nuevo.');
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <View
          style={{
            height: 245,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5
          }}>
          <View
            style={{
              height: '70%',
              width: '45%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <View
              style={{
                height: '90%',
                aspectRatio: 1 / 1,
                backgroundColor: '#030124',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100
              }}>
              {data?.ImageProfile ? (
                <Image
                  style={{borderRadius: 100, aspectRatio: 1 / 1, height: '85%'}}
                  source={{uri: data?.ImageProfile}}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  style={{borderRadius: 100, aspectRatio: 1 / 1, height: '85%'}}
                  source={require('./../../../../../images/default.png')}
                />
              )}
            </View>
          </View>
          <View style={{height: '20%'}}>
            <View style={profileStyles.borderTargetName}>
              <Text style={[profileStyles.textName, {paddingHorizontal: 30}]}>
                Hola {data.firstName[0]} {data.lastName[0] ?? ''}
              </Text>
            </View>
          </View>
          <View style={{height: '10%', width: '45%', alignItems: 'center'}}>
            <View
              style={{
                height: '95%',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
              <Text
                style={{color: '#396593', fontSize: 15, fontWeight: 'normal'}}>
                Area {area?.areaName}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PhotoUser;
