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
  KeyboardAvoidingView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Yup validation schema
const CarSchema = Yup.object().shape({
  makeModel: Yup.string().required('Car Make & Model is required'),
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[6-9]\d{9}$/, 'Phone number is not valid'),
  carPhotos: Yup.array()
    .min(4, 'At least 4 photos are required')
    .max(8, 'You can upload up to 8 photos')
    .required('Car photos are required'),
  folder: Yup.string().required('Folder name is required'),
});

export default function SellCarForm() {
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'Permission Required',
            message: 'App needs access to your photos',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
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
    }
    return true; // iOS
  };
  

  const pickImages = async (carPhotos, setFieldValue) => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    launchImageLibrary({ mediaType: 'photo', selectionLimit: 8 }, (response) => {
      if (!response.didCancel && !response.errorCode) {
        const newUris = response.assets?.map((asset) => asset.uri) || [];
        const combinedUris = [...carPhotos, ...newUris].slice(0, 8);
        setFieldValue('carPhotos', combinedUris);
      }
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Sell Your Car</Text>

        <Formik
          initialValues={{
            makeModel: '',
            name: '',
            email: '',
            phone: '',
            carPhotos: [],
            folder: '',
          }}
          validationSchema={CarSchema}
          onSubmit={async(values) => {
            console.log('Form Submitted:', values);
            try {

        const dataCopy = { ...values };
  
        dataCopy.carPhotos = values.carPhotos;


        const { doSellCar } = await import("../../utils/formAPIs/sellCar");
        const res = await doSellCar(dataCopy);
        return res;
      } catch (err) {
        return;
      }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <>
              <FlatList
                data={values.carPhotos}
                horizontal
                keyExtractor={(uri, index) => `${uri}-${index}`}
                renderItem={({ item }) => (
                  <Image source={{ uri: item }} style={styles.previewImage} />
                )}
                ListFooterComponent={
                  values.carPhotos.length < 8 ? (
                    <TouchableOpacity
                      onPress={() => pickImages(values.carPhotos, setFieldValue)}
                      style={styles.photoBox}
                    >
                      <Text style={styles.addPhotoText}>+ Add Photo</Text>
                    </TouchableOpacity>
                  ) : null
                }
                contentContainerStyle={{ gap: 10 }}
              />
              {touched.carPhotos && errors.carPhotos && (
                <Text style={styles.error}>{errors.carPhotos}</Text>
              )}

              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Car Make & Model"
                  onChangeText={handleChange('makeModel')}
                  onBlur={handleBlur('makeModel')}
                  value={values.makeModel}
                  placeholderTextColor="#888"
                />
                {touched.makeModel && errors.makeModel && (
                  <Text style={styles.error}>{errors.makeModel}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholderTextColor="#888"
                />
                {touched.name && errors.name && (
                  <Text style={styles.error}>{errors.name}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholderTextColor="#888"
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  placeholderTextColor="#888"
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.error}>{errors.phone}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Folder Name"
                  onChangeText={handleChange('folder')}
                  onBlur={handleBlur('folder')}
                  value={values.folder}
                  placeholderTextColor="#888"
                />
                {touched.folder && errors.folder && (
                  <Text style={styles.error}>{errors.folder}</Text>
                )}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit Request</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginBottom: 10,
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
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
    fontSize: 12,
    marginBottom: 5,
  },
});
