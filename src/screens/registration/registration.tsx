import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native'
import { getPDF } from '../../utils/extraAPIs/getPDF'
import { PermissionsAndroid } from 'react-native';
import ActionButton from '../../components/actionButton';
import { Colors } from '../../utils/color';
import { formatDate } from '../../utils/date-time';
import Pdf from 'react-native-pdf'
import RNFetchBlob from 'react-native-blob-util';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FONT_FAMILY } from '../../utils/fonts';


const RegistrationScreen = (props: any) => {

  const [pdfData, setpdfData] = useState([])

  const [username, setName] = useState("");

useEffect(() => {
    getName()
  }, [])

  const getName = async () => {
    const name = await AsyncStorage.getItem('name');
    setName(name)
  }

  useEffect(() => {
    getPDFList()

  }, [])

  const getPDFList = async () => {
    await requestStoragePermission()
    const { success, message, data } = await getPDF()
    console.log(success, message, data)
    if (success) {
      setpdfData(data)
      console.log(data);
    }
  }

  async function requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const fileExits = (url) => {
    const filePath = RNFS.DocumentDirectoryPath + url;
    RNFS.unlink(filePath)
      .then(() => {
        console.log('Previous file deleted');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const downloadPdf = async (url) => {
    console.log(url);

    fileExits(url)

    const filePath = RNFS.DocumentDirectoryPath + url;

    RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
      background: true, // Enable downloading in the background (iOS only)
      discretionary: true, // Allow the OS to control the timing and speed (iOS only)
      progress: (res) => {
        // Handle download progress updates if needed
        const progress = (res.bytesWritten / res.contentLength) * 100;
        console.log(`Progress: ${progress.toFixed(2)}%`);
      },
    })
      .promise.then((response) => {
        console.log('File downloaded!', response);
      })
      .catch((err) => {
        console.log('Download error:', err);
      });
  }



const downloadFile = (fileUrl) => {
  
    const fileName  = 'superSelectDocument.pdf'

    let mimeType = 'application/pdf';

    const fileExtension = fileName?.split('.')?.pop();

    if (fileExtension === 'pdf') {
      mimeType = 'application/pdf';
    } else if (fileExtension === 'docx') {
      mimeType =
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else {
      mimeType = 'application/octet-stream'; // Default MIME type for unknown types
    }

    let dirs = RNFetchBlob.fs.dirs;
    const path = Platform.OS === 'android' ? `${dirs.DownloadDir}/${fileName}`: `${dirs.DocumentDir}/${fileName}`;
    RNFetchBlob.config({
      fileCache: true,
      path: path,  //set the path where to download file
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: fileName,
        description: 'File downloaded by download manager.',
        mime: mimeType,
        path: path,
      },
    })
      .fetch('GET', fileUrl)
      .then(res => {
         // if Platform.OS is IOS
        if (Platform.OS === 'ios') {
          const filePath = res.path();
          let options = {
            type: mimeType,
            url: filePath,
            saveToFiles: true,
          };
          Share.open(options)
            .then(resp => console.log(resp))
            .catch(err => console.log(err));
        } else {
          const filePath = res.path();
          let options = {
            type: mimeType,
            url: filePath,
            saveToFiles: true,
          };
          Share.open(options)
            .then(resp => console.log(resp))
            .catch(err => console.log(err));
  
        }
      })
      .catch(err => console.log('BLOB ERROR -> ', err));
  };
  //

  return (
    <View style={styles.fullScreen} >
      <Text style={{ color: Colors.BLACK_COLR,  fontFamily: FONT_FAMILY.BOLD, fontSize: 30, textTransform: 'uppercase', letterSpacing: 5 }}>hello {username}</Text>
      <Text style={{ color: Colors.BLACK_COLR,marginVertical: 15, fontSize: 18 }}>Here are your purchase details</Text>
      {
      pdfData.length !== 0 ?

      <ScrollView style={styles.fullScreen} >
        {
        pdfData.map((d, i) => (
          <View style={{ flex:1, margin:5,
            shadowColor: '#171717',
            backgroundColor:Colors.PURE_WHITE,
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation:20
         }}>
            <Text style={{ color: Colors.BLACK_COLR, fontFamily: FONT_FAMILY.REGULAR, fontSize: 22, paddingHorizontal: 15, fontWeight: '300', marginTop: 10 }}>{d.name}</Text>
            <Text style={{ color: Colors.BLACK_COLR, fontFamily: 'Oxanium-Medium', fontSize: 18, letterSpacing: 2, padding: 15 }}>{formatDate(d.purchaseDate)}</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>

              <ActionButton backgroundColor={Colors.BLACK_COLR} title={'Show'} color={Colors.PURE_WHITE} onPress={() => Linking.openURL(d.pdfFile)} />
              <ActionButton backgroundColor={Colors.BLACK_COLR} title={'Download'} color={Colors.PURE_WHITE} onPress={() => downloadFile(d.pdfFile)} />
            </View>
          </View>
        ))
}
</ScrollView>
        :
        <View style={{justifyContent:'center',alignItems:'center', flex:1}}>
        <Text style={{color:Colors.BLACK_COLR, fontFamily: 'Oxanium-Regular',fontSize: 17}}>No purchases found</Text>
        </View>
      }
    </View>
  );
}



// styles
const styles = StyleSheet.create({

  fullScreen: {
    padding: 10,
    flex:1
  },
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
}
});


export default RegistrationScreen