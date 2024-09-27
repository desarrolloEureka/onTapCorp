// import { Templates, Communications } from '../types/home';
import firestore from '@react-native-firebase/firestore';

export const getAllTemplates = async () => {
  const templatesData: any[] = [];
  const usersCollection = firestore().collection('templates');
  await usersCollection.get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc: any) => {
        const dataResult = doc.data() as any;
        templatesData.push({ ...dataResult, id: doc.id });
      });
    }).catch(error => {
      console.error('Error al obtener documentos:', error);
    });
  return templatesData;
};

export const getAllCommunications = async (collection: string, idCompany: string) => {
  const communicationsData: any[] = [];
  const communications = firestore().collection(collection);
  try {
    const querySnapshot = await communications.where('idCompany', '==', idCompany).get();
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as any;
      communicationsData.push({ ...dataResult, uid: doc.id });
    });
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw error; // Opcional: lanzar el error para manejarlo en otro lugar
  }
  return communicationsData;
};

export const getAllMeetings = async (collection: string, employeeId: string) => {
  const meetingData: any[] = [];
  const meetings = firestore().collection(collection);
  try {
    const querySnapshot = await meetings.where('employeeId', '==', employeeId).get();
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as any;
      meetingData.push({ ...dataResult, uid: doc.id });
    });
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw error; // Opcional: lanzar el error para manejarlo en otro lugar
  }
  return meetingData;
};

export const getAllRoutes = async (routesIds: any []) => {
  const routeData: any[] = [];
  const routes = firestore().collection('routes');
  try {
    const querySnapshot = await routes.where('uid', 'in', routesIds).get();
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as any;
      routeData.push({ ...dataResult, uid: doc.id });
    });
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw error; // Opcional: lanzar el error para manejarlo en otro lugar
  }
  return routeData;
};

