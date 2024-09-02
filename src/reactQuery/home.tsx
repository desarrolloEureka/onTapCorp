import {getAllTemplates, getAllCommunications} from '../firebase/generals';
import {useQuery} from '@tanstack/react-query';

const GetAllTemplates = () => {
  const query = useQuery({
    queryKey: ['templates'],
    queryFn: async () => await getAllTemplates(),
    refetchOnWindowFocus: false
  });
  return query;
};

const GetAllCommunications = () => {
  const query = useQuery({
    queryKey: ['communications'],
    queryFn: async () => await getAllCommunications(),
    refetchOnWindowFocus: false
  });
  return query;
};

export {GetAllTemplates, GetAllCommunications};
