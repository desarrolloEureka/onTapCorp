// import { Templates, Communications } from '../types/home';
import {collection, getDocs, query, where} from 'firebase/firestore';
import { dataBase} from '../firebase/firebaseConfig';

export const getAllTemplates = async () => {
  const templatesData: any[] = [];
  const templatesCollection = collection(dataBase, 'templates');
  try {
    const querySnapshot = await getDocs(templatesCollection);
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data();
      templatesData.push({...dataResult, uid: doc.id});
    });
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw error; // Opcional: lanzar el error para manejarlo en otro lugar
  }
  return templatesData;
};

export const getAllCommunications = async (
  collection2: string,
  idCompany: string
) => {
  const communicationsData: any[] = [];
  const communications = collection(dataBase, collection2);
  try {
    const q = query(communications, where('idCompany', '==', idCompany));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data();
      communicationsData.push({...dataResult, uid: doc.id});
    });
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw error; // Opcional: lanzar el error para manejarlo en otro lugar
  }
  return communicationsData;
};

export const getAllMeetings = async (collection2: string, employeeId: string) => {
  const meetingData: any[] = [];
  const meetings = collection(dataBase, collection2);
  try {
    const q = query(meetings, where('employeeId', '==', employeeId));
    const querySnapshot = await getDocs(q);
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
  const routesCollection = collection(dataBase, 'routes');
  const routesQuery = query(routesCollection, where('uid', 'in', routesIds));
  try {
    const querySnapshot = await getDocs(routesQuery);
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data();
      routeData.push({...dataResult, uid: doc.id});
    });
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw error; // Opcional: lanzar el error para manejarlo en otro lugar
  }
  return routeData;
};

