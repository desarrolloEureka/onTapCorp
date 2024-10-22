import {
  getAllTemplates,
  getAllCommunications,
  getAllMeetings,
  getAllRoutes
} from '../firebase/generals';
import {useQuery} from '@tanstack/react-query';

const GetAllTemplates = () => {
  const query = useQuery({
    queryKey: ['templates'],
    queryFn: async () => await getAllTemplates(),
    refetchOnWindowFocus: false
  });
  return query;
};

const GetAllCommunications = (
  collection: string,
  idCompany: string,
  activeTab: string
) => {
  const query = useQuery({
    queryKey: [collection, activeTab],
    queryFn: async () => await getAllCommunications(collection, idCompany),
    refetchOnWindowFocus: false
  });
  return query;
};

const GetAllMeetings = (
  collection: string,
  employeeId: string,
  activeTab: string
) => {
  const query = useQuery({
    queryKey: [collection, activeTab],
    queryFn: async () => await getAllMeetings(collection, employeeId),
    refetchOnWindowFocus: false
  });
  return query;
};

const GetAllRoutes = (routesIds: any[]) => {
  const query = useQuery({
    queryKey: [routesIds],
    queryFn: async () => await getAllRoutes(routesIds),
    refetchOnWindowFocus: false
  });
  return query;
};

export {GetAllTemplates, GetAllCommunications, GetAllMeetings, GetAllRoutes};
