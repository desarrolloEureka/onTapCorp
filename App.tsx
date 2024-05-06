import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { RouteStackParamList } from './src/types/navigation';
import HomeScreen from './src/views/home/Home';
import Plantillas from './src/views/home/components/main/home/Plantillas';
import PreviewTemplate from './src/views/home/components/main/home/PreviewTemplate';
import Meetings from './src/views/home/components/main/meetings/Meetings';
import ChangePassword from './src/views/home/components/main/profile/ChangePassword';
import ProfileScreen from './src/views/home/components/main/profile/Profile';
import ProfileProfessionalScreen from './src/views/home/components/main/profile/ProfileProfessional';
import Roads from './src/views/home/components/main/roads/Roads';
import ShareQR from './src/views/home/components/main/share/ShareQR';
import Login from './src/views/login/Login';
import OnboardingOne from './src/views/onboardings/OnboardigndOne';
import OnboardingInicioSesion from './src/views/onboardings/OnboardingInicioSesion';
import OnboardingThree from './src/views/onboardings/OnboardingThree';
import OnboardingTwo from './src/views/onboardings/OnboargindTwo';
import Splash from './src/views/onboardings/Splash';
import AcercaDe from './src/views/opcionesMenu/AcercaDe';
import Politicas from './src/views/opcionesMenu/Politicas';
import Terminos from './src/views/opcionesMenu/Terminos';
import RecoveryPassword from './src/views/recovery/components/main/RecoveryPassword';

const Stack = createNativeStackNavigator<RouteStackParamList>();

// Crea una instancia de QueryClient
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName="Splash">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="PreviewTemplate" component={PreviewTemplate} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="ProfileProfessional"
            component={ProfileProfessionalScreen}
          />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="OnboardingOne" component={OnboardingOne} />
          <Stack.Screen name="OnboardingTwo" component={OnboardingTwo} />
          <Stack.Screen name="OnboardingThree" component={OnboardingThree} />
          <Stack.Screen
            name="OnboardingInicioSesion"
            component={OnboardingInicioSesion}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="RecoveryPassword" component={RecoveryPassword} />
          <Stack.Screen name="AcercaDe" component={AcercaDe} />
          <Stack.Screen name="Terminos" component={Terminos} />
          <Stack.Screen name="Politicas" component={Politicas} />
          <Stack.Screen name="Plantillas" component={Plantillas} />
          <Stack.Screen name="Meetings" component={Meetings} />
          <Stack.Screen name="Roads" component={Roads} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="ShareQR" component={ShareQR} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
