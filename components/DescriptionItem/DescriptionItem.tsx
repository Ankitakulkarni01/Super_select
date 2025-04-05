import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../src/utils/color";

export const DescriptionItem: FC<{
  name: string;
  value?: string | number;
  prefix?: string;
  suffix?: string;
}> = ({ name, value, prefix, suffix }) => {
  if (!value) return;

  return (
     <View style={styles.specificationRow}>
                          <Text style={styles.specificationLabel}>{name}:&nbsp;</Text>
                          <Text style={styles.specificationValue}>{prefix} {value} {suffix}</Text>
                        </View>
    // <View style={styles.specificationRow}>
    //   <Text style={styles.specificationLabel}></Text>
    //   <View style={styles.specificationSection}>
    //    <Text style={styles.specificationLabel}></Text>
    //   </View    // </View>
  );
};

const styles = StyleSheet.create({

specificationSection: {
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#e0e0e0',
  flexDirection:"row"
},
specificationTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
},
specificationRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  // padding: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#f0f0f0',
  padding: 16,},
specificationLabel: {
  fontSize: 14,
  color: '#666',
  flex: 1,
},
specificationValue: {
  fontSize: 14,
  color: '#333',
  fontWeight: '500',
  flex: 1,
  textAlign: 'right',
}, whatsappButton: {
  backgroundColor: '#25D366',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  borderRadius: 50,
  marginTop: 24,
  marginHorizontal: 16,
  gap: 8,
},
  });
