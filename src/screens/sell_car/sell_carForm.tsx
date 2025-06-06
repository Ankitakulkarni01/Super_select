import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { launchImageLibrary } from 'react-native-image-picker';

const SellCarForm = () => {
  const [photo, setPhoto] = useState(null);

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      (response) => {
        if (response?.assets?.length > 0) {
          setPhoto(response.assets[0]);
        } else if (response?.errorMessage) {
          Alert.alert('Image Picker Error', response.errorMessage);
        }
      }
    );
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    year: Yup.number().required('Required'),
    mileage: Yup.number().required('Required'),
    price: Yup.number().required('Required'),
    location: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Sell Your Car</Text>
      <Text style={styles.subHeader}>Car Photos</Text>

      <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
        {photo ? (
          <Image source={{ uri: photo.uri }} style={styles.image} />
        ) : (
          <Text style={styles.addPhotoText}>+ Add Photo</Text>
        )}
      </TouchableOpacity>

      <Formik
        initialValues={{
          title: '',
          year: '',
          mileage: '',
          price: '',
          location: '',
          description: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Submitted:', values);
          Alert.alert('Submitted!', JSON.stringify(values, null, 2));
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="Title"
              style={styles.input}
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
            />
            {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}

            <View style={styles.row}>
              <TextInput
                placeholder="Year"
                style={[styles.input, styles.halfInput]}
                keyboardType="numeric"
                value={values.year}
                onChangeText={handleChange('year')}
                onBlur={handleBlur('year')}
              />
              <TextInput
                placeholder="Mileage"
                style={[styles.input, styles.halfInput]}
                keyboardType="numeric"
                value={values.mileage}
                onChangeText={handleChange('mileage')}
                onBlur={handleBlur('mileage')}
              />
            </View>
            {touched.year && errors.year && <Text style={styles.error}>{errors.year}</Text>}
            {touched.mileage && errors.mileage && <Text style={styles.error}>{errors.mileage}</Text>}

            <TextInput
              placeholder="Price"
              style={styles.input}
              keyboardType="numeric"
              value={values.price}
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
            />
            {touched.price && errors.price && <Text style={styles.error}>{errors.price}</Text>}

            <TextInput
              placeholder="Location"
              style={styles.input}
              value={values.location}
              onChangeText={handleChange('location')}
              onBlur={handleBlur('location')}
            />
            {touched.location && errors.location && <Text style={styles.error}>{errors.location}</Text>}

            <TextInput
              placeholder="Description"
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
            />
            {touched.description && errors.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>List Your Car</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  imageBox: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  addPhotoText: {
    fontSize: 16,
    color: '#666',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 4,
  },
});

export default SellCarForm;
