import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Plantillas = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const images = [
    require('/src/images/fondo1.png'), // Asegúrate de que la ruta sea correcta
    require('/src/images/fondo2.png'), // Asegúrate de que la ruta sea correcta
  ];

  const handleGuardar = () => {
    if (selectedImageIndex !== null) {
      // Lógica para guardar la imagen seleccionada
      console.log(`Guardando imagen seleccionada: ${selectedImageIndex}`);
    } else {
      console.log('No se ha seleccionado ninguna imagen.');
    }
  };

  const handleImagePress = (index:any) => {
    setSelectedImageIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImagePress(index)}
            style={styles.imageContainer}
          >
            <Image source={image} style={styles.image} />
            {selectedImageIndex === index && (
              <View style={styles.radioButton}>
                <Text style={styles.radioButtonText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={handleGuardar} style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Guardar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 10, // Ajusta el margen entre las imágenes según tus preferencias
  },
  image: {
    width: 150,
    height: 300,
    resizeMode: 'cover',
  },
  radioButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonText: {
    color: 'white',
    fontSize: 12,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#62AD9B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Plantillas;




