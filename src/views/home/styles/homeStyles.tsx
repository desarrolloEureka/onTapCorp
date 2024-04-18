import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  head: {
    height: 150,
    width: '100%'
  },
  rootContainer: {
    flex: 1,
  },
  body: {
    height: 400
  },
  titleBody: {
    fontSize: 20,
    fontWeight: '700',
    color: '#396593',
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // Otros estilos según sea necesario
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },

  buttonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  icon: {
    backgroundColor: 'transparent',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#030124', // Puedes ajustar el color de la línea según tus preferencias
    marginVertical: 5, // Puedes ajustar el espacio vertical según tus preferencias
    width: '100%', // O ajusta el ancho según sea necesario
  },


  switchContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center', // Centra verticalmente los elementos
    justifyContent: 'space-between', // Espacio uniforme entre los elementos
    paddingHorizontal: 10,
    marginTop: 10,
  },
  switchWrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
  switchWrapper1: {
    backgroundColor: '#e74c3c', // Cambia el color de fondo según tus preferencias
    borderRadius: 20,
    padding: 20,

  },
  switchWrapper2: {
    backgroundColor: '#3498db', // Cambia el color de fondo según tus preferencias
    borderRadius: 5,
    padding: 10
  },
  switch: {
    transform: [{ scale: 1.5 }]
  },
  switchText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 10, // Radio para hacer el botón redondeado
    paddingVertical: 10, // Ajusta el espaciado vertical según tus necesidades
    paddingHorizontal: 30, // Ajusta el espaciado horizontal según tus necesidades
    alignItems: 'center', // Alinea el contenido al centro
    marginTop: 85,
  },

  buttonText: {
    fontFamily: 'Ubuntu',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: 0.03,
    textAlign: 'left',
    color: '#030124'
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  imageContainer: {
    width: 172,
    height: 222,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#02AF9B',
    marginTop: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10

  },
  buttonT: {
    height: "45%",
    width: "40%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextT: {
    fontSize: 12,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
    height: 80,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabnav: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  selectedText: {
    color: 'blue', // Puedes ajustar el color seleccionado según tus preferencias
    fontWeight: 'bold',
  },
});
