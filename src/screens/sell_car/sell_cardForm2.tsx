import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Platform,
  FlatList,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Yup schema with image array validation
const CarSchema = Yup.object().shape({
  title: Yup.string().required('Mandatory Field'),
  year: Yup.number().required('Mandatory Field').min(1886),
  mileage: Yup.number().required('Mileage is required'),
  price: Yup.number().required('Price is required'),
  location: Yup.string().required('Location is required'),
  description: Yup.string().required('Mandatory Field'),
  photoUris: Yup.array()
    .min(4, 'At least 4 photos are required')
    .max(8, 'You can only upload up to 8 photos')
    .required('Car photos are required'),
});

export default function SellCarForm() {
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Required',
          message: 'App needs access to your photos',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const pickImages = async (photoUris, setFieldValue) => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    launchImageLibrary({ mediaType: 'photo', selectionLimit: 15 }, (response) => {
      if (!response.didCancel && !response.errorCode) {
        const newUris = response.assets?.map((asset) => asset.uri) || [];
        const combinedUris = [...photoUris, ...newUris].slice(0, 15);
        setFieldValue('photoUris', combinedUris);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Sell Your Car</Text>

      <Formik
        initialValues={{
          title: '',
          year: '',
          mileage: '',
          price: '',
          location: '',
          description: '',
          photoUris: [],
        }}
        validationSchema={CarSchema}
        onSubmit={(values) => {
          console.log('Form Submitted:', values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <>
            <FlatList
              data={values.photoUris}
              horizontal
              keyExtractor={(uri, index) => `${uri}-${index}`}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.previewImage} />
              )}
              ListFooterComponent={
                values.photoUris.length < 15 ? (
                  <TouchableOpacity
                    onPress={() => pickImages(values.photoUris, setFieldValue)}
                    style={styles.photoBox}
                  >
                    <Text style={styles.addPhotoText}>+ Add Photo</Text>
                  </TouchableOpacity>
                ) : null
              }
              contentContainerStyle={{ gap: 10 }}
            />

            {touched.photoUris && errors.photoUris && (
              <Text style={styles.error}>{errors.photoUris}</Text>
            )}

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Car Make & Model"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}

             <TextInput
               style={styles.input}
                placeholder="Name"
                multiline
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.description}
              />
              {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}
              <TextInput
                style={styles.input}
                placeholder="Email"
                multiline
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.description}
              />
              {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}
              <TextInput
                style={styles.input}
                placeholder="Phone No"
                multiline
                onChangeText={handleChange('phonenumber')}
                onBlur={handleBlur('phonenumber')}
                value={values.description}
              />
              {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}


              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Request</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom:10
  },
  subHeader: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
  photoBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: {
    color: '#888',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  form: {
    marginTop: 20,
  },
  formHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 10,
    marginVertical: 5,
  },
});
