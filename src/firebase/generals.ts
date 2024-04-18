import { Templates } from '../types/home';
import firestore from '@react-native-firebase/firestore';

export const getAllTemplates = async () => {
  const templatesData: Templates[] = [];
  const usersCollection = firestore().collection('templates');
  await usersCollection.get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc: any) => {
        const dataResult = doc.data() as Templates;
        templatesData.push({ ...dataResult, id: doc.id });
      });
    }).catch(error => {
      console.error('Error al obtener documentos:', error);
    });
  return templatesData;
};