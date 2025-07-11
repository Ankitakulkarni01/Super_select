import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, Linking } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 50;

import Periodic from '../../assets/img/car_service_logo/periodic-services.12344b0e.svg';
import BodyShop from '../../assets/img/car_service_logo/body-shop.09670925.svg';
import Detailing from '../../assets/img/car_service_logo/detailing.60b0aec1.svg';
import Repairs from '../../assets/img/car_service_logo/common-repairs.9afdadeb.svg';
import Scan from '../../assets/img/car_service_logo/scanning-diagnostics.cd3ea5d0.svg';
import ValueAdded from '../../assets/img/car_service_logo/value-added-services.922bf6c5.svg';

const services = [
  { id: '1', label: 'Periodic Services', Icon: Periodic },
  { id: '2', label: 'Body Shop', Icon: BodyShop },
  { id: '3', label: 'Detailing', Icon: Detailing, isClickable: true },
  { id: '4', label: 'Common Repairs', Icon: Repairs },
  { id: '5', label: 'Scanning & Diagnostics', Icon: Scan },
  { id: '6', label: 'Value Added Services', Icon: ValueAdded },
];

const PremiumServices = () => {
  const handlePress = (label: string) => {
    // You can replace this Alert with navigation
    Linking.openURL('https://www.autowerks.ae/')
    Alert.alert('Clicked', `You selected: ${label}`);
  };

  const renderItem = ({ item }: any) => {
    const CardContent = (
      <View style={styles.card}>
        <item.Icon width={80} height={90} />
        <Text style={styles.label}>{item.label}</Text>
      </View>
    );

    return item.isClickable ? (
      <TouchableOpacity onPress={() => handlePress(item.label)} activeOpacity={0.6}>{CardContent}</TouchableOpacity>
    ) : (
      CardContent
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  grid: {
    alignItems: 'center',
  },
  card: {
    width: 150,
    height: 150,
    margin: 10,
    backgroundColor: '#f4f4f4',
    // borderRadius: 8,
    padding:5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
});

export default PremiumServices;
