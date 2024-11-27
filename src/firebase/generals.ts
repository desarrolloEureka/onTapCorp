import {dataBase} from '../firebase/firebaseConfig';

export const getAllTemplates = async () => {
  const templatesData: any[] = [];
  try {
    const templatesCollection = await dataBase.collection('templates').get();

    templatesCollection.forEach(doc => {
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
  idCompany: string,
) => {
  const communicationsData: any[] = [];
  try {
    const querySnapshot = await dataBase
      .collection(collection2)
      .where('idCompany', '==', idCompany)
      .get();
    querySnapshot.forEach(doc => {
      const dataResult = doc.data();
      communicationsData.push({...dataResult, uid: doc.id});
    });
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw error;
  }
  return communicationsData;
};

export const getAllMeetings = async (
  collection2: string,
  employeeId: string,
) => {
  const meetingData: any[] = [];
  try {
    const querySnapshot = await dataBase
      .collection(collection2)
      .where('employeeId', '==', employeeId)
      .get();
    querySnapshot.forEach(doc => {
      const dataResult = doc.data();
      meetingData.push({...dataResult, uid: doc.id});
    });
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw error;
  }
  return meetingData
};

export const getAllRoutes = async (routesIds: string[]) => {
  const routeData: any[] = [];
  try {
    const querySnapshot = await dataBase
      .collection('routes')
      .where('uid', 'in', routesIds)
      .get();
    querySnapshot.forEach(doc => {
      const dataResult = doc.data();
      routeData.push({...dataResult, uid: doc.id});
    });
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw error;
  }
  return routeData;
};
