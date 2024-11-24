import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GetUser } from '../../../../../../reactQuery/users';
import { RouteStackParamList } from '../../../../../../types/navigation';
import { useState, useEffect } from 'react';
import { GetAllRoutes } from '../../../../../../reactQuery/home';

type Props = {};

const daysMap: { [key: string]: string } = {
  sundayRoute: 'Domingo',
  mondayRoute: 'Lunes',
  tuesdayRoute: 'Martes',
  wednesdayRoute: 'Miércoles',
  thursdayRoute: 'Jueves',
  fridayRoute: 'Viernes',
  saturdayRoute: 'Sábado',
};

const days = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const processRoutes = (data: any, routes: any) => {
  if (!routes || !data) return [];
  const filteredRoutes: any[] = [];
  const days = Object.keys(daysMap);

  days.forEach(day => {
    const routeId = data[day];
    const routeDetails = routes.find((route: any) => route.uid === routeId);

    filteredRoutes.push({
      [day]: routeId,
      dayName: daysMap[day],
      routeDetails: routeDetails || null,
    });
  });

  return filteredRoutes;
};

const getCurrentDateFormatted = (dayName: string) => {
  const date = new Date();
  const todayIndex = new Date().getDay();
  const dayIndex = days.indexOf(dayName);

  // Calcular días para avanzar
  const daysToAdd = dayIndex >= todayIndex ? dayIndex - todayIndex : 7 - (todayIndex - dayIndex);
  date.setDate(date.getDate() + daysToAdd);

  const dayNumber = date.getDate();
  const monthName = monthNames[date.getMonth()];

  return `Ruta ${dayName} ${dayNumber} de ${monthName}`;
};

const currentDayIndex = new Date().getDay();

const RoadsHook = (props?: Props) => {
  const navigation = useNavigation<StackNavigationProp<RouteStackParamList, 'Home'>>();
  const { data } = GetUser();
  const [alertGPSOff, setAlertGPSOff] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const routeDetails = selectedOption?.routeDetails;
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [routeStarted, setRouteStarted] = useState(false);
  const [isLoadingFirebase, setIsLoadingFirebase] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAlertGPS = () =>
    setAlertGPSOff(!alertGPSOff);

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

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const routes = GetAllRoutes([
    data?.mondayRoute,
    data?.tuesdayRoute,
    data?.wednesdayRoute,
    data?.thursdayRoute,
    data?.fridayRoute,
    data?.saturdayRoute,
    data?.sundayRoute,
  ])?.data;

  const filteredRoutes = processRoutes(data, routes);
  const data2 = [
    { titulo: 'Nombre de Ruta', texto: routeDetails?.routeName || 'N/A' },
    { titulo: 'Zona', texto: routeDetails?.zoneName || 'N/A' },
    { titulo: 'Jefe Ruta', texto: routeDetails?.routeManager || 'N/A' },
    {
      titulo: 'Tiempo estimado',
      texto: routeDetails?.estimatedHours && routeDetails?.estimatedMinutes ?
        `${routeDetails?.estimatedHours} Horas ${routeDetails?.estimatedMinutes} Minutos`
        : 'N/A',
    },
  ];

  if (routeDetails?.addresses) {
    routeDetails.addresses.forEach((direccion: any, index: any) => {
      data2.push({ titulo: `Dirección ${index + 1}`, texto: direccion });
    });
  }

  const displayStartTime = () => {
    if (startTime) {
      return new Date(startTime).toLocaleString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }
  };

  const displayEndTime = () => {
    if (endTime) {
      return new Date(endTime).toLocaleString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }
  };

  const calculateDuration = () => {
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const duration = end.getTime() - start.getTime();

      const hours = Math.floor(
        (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.ceil((duration % (1000 * 60 * 60)) / (1000 * 60));

      return `${hours} hora${hours !== 1 ? 's' : ''} y ${minutes} minuto${minutes !== 1 ? 's' : ''
        }`;
    }
    return '0 horas y 0 minutos';
  };

  const origin = {
    latitude: routeDetails?.geolocations[0]?.coords?.lat,
    longitude: routeDetails?.geolocations[0]?.coords?.lng,
  };
  const destination = {
    latitude:
      routeDetails?.geolocations[routeDetails.geolocations.length - 1]?.coords
        ?.lat,
    longitude:
      routeDetails?.geolocations[routeDetails.geolocations.length - 1]?.coords
        ?.lng,
  };
  const waypoints = routeDetails?.geolocations
    ?.slice(1, -1)
    .map((loc: any) => ({
      latitude: loc.coords.lat,
      longitude: loc.coords.lng,
    }));

  useEffect(() => {
    if (filteredRoutes.length > 0 && !selectedOption) {
      setSelectedOption(filteredRoutes[currentDayIndex]);
    }
  }, [filteredRoutes]);

  useEffect(() => {
    const fetchRouteState = async () => {
      try {
        const data = await AsyncStorage.getItem('@route');
        const data2 = await AsyncStorage.getItem('@startTime2');
        if (data !== null) {
          setRouteStarted(JSON.parse(data));
          setStartTime(JSON.parse(data2));
        }
      } catch (error) {
        console.error('Error al recuperar el estado de la ruta:', error);
      }
    };

    fetchRouteState();
  }, []);

  return {
    user: data,
    handleTabPress,
    handleBackPress,
    setAlertGPSOff,
    handleAlertGPS,
    alertGPSOff,
    routeStarted,
    isLoadingFirebase,
    setIsLoadingFirebase,
    setRouteStarted,
    setStartTime,
    setEndTime,
    routeDetails,
    origin,
    destination,
    waypoints,
    setIsOpen,
    isOpen,
    selectedOption,
    filteredRoutes,
    handleSelect,
    getCurrentDateFormatted,
    data2,
    daysMap,
    currentDayIndex,
    displayStartTime,
    displayEndTime,
    calculateDuration,


  };
};

export default RoadsHook;
