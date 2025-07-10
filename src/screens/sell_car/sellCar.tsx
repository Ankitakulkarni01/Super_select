import { FC, ReactNode, useCallback, useState } from "react";
import clsx from "clsx";
import ScheduleIcon from "../../assets/svg/schedule.svg";
import CarInspectionIcon from "../../assets/svg/car-inspection.svg";
import SellCarIcon from "../../assets/svg/sell-car.svg";
import CallIcon from "../../assets/svg/phone-call.svg"
import Appointmet_car from '../../assets/svg/book Appointment.svg'
import Car_inspection from '../../assets/svg/Car_inspection.svg'
import Sell_car from '../../assets/svg/sell_car_icon.svg'

import { type SellCarDataType } from "../../utils/formAPIs/sellCar";
import { Alert, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GeneralForm from "../../../components/GeneralForm/generalForm";
import { Colors } from "../../utils/color";
import { Image } from "react-native";
import ActionButton from "../../components/actionButton";
import siteInfo from "../../utils/data/siteDetails";
import ImageCropPicker from 'react-native-image-crop-picker';
import { Button } from "react-native";
import CoolHeading from "../../components/CoolHeading";
import SellCarForm from "./sell_cardForm2";

//
//

export default function SellPage() {
  const [filesAreUploading, setFilesAreUploading] = useState(false);
  const [images, setImages] = useState<any[] | null>(null);

  // On Form Submit
  const onFormSubmit = useCallback(
    async (data: SellCarDataType) => {
      // try {
      //   setFilesAreUploading(true);

      //   const dataCopy = { ...data };

      //   // Image Compression
      //   const newCarPhotos: Array<File> = [];
      //   for (let i = 0; i < dataCopy.carPhotos?.length; i++) {
      //     newCarPhotos.push(
      //       await imageCompression(dataCopy.carPhotos[i] as File)
      //     );
      //   }
      //   //

      //   const { FileUploadWorkerPromise } = await import(
      //     "../../utils/serviceWorkers/worker-promise"
      //   );
      //   const { folder, urls } = await FileUploadWorkerPromise({
      //     files: newCarPhotos,
      //   });

      //   dataCopy.folder = folder;
      //   dataCopy.carPhotos = urls;

      //   setFilesAreUploading(false);

      //   const { doSellCar } = await import("../../utils/formAPIs/sellCar");
      //   const res = await doSellCar(dataCopy);
      //   return res;
      // } catch (err) {
      //   return;
      // }
    },
    [setFilesAreUploading]
  );
  //

  //
  //

  const [photo, setPhoto] = useState(null);

  const handleChoosePhoto = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo'
    })
      .then((result) => {
        console.log('received base64 image');

        console.log("images", result)

        setImages([
          ...images,
          {
            uri: result.path,
            width: result.width,
            height: result.height,
          }
        ]);
      })
      .catch((e) => console.log(e));
  };

   const onWhatsApp = () =>{
      let msg = "Welcome To Super Select";
      let phoneWithCountryCode = "918607086070";
    
      let mobile =
        Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
      if (mobile) {
        if (msg) {
          let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
          Linking.openURL(url)
            .then(data => {
              console.log("WhatsApp Opened");
            })
            .catch(() => {
              Alert.alert("Make sure WhatsApp installed on your device");
            });
        } else {
          Alert.alert("Please insert message to send");
        }
      } else {
        Alert.alert("Please insert mobile no");
      }
    }
  
    const onCall = () =>{
      let phoneNumber = "8607086070";
      if (Platform.OS === 'android') { phoneNumber = `tel:${phoneNumber}`; }
      else {phoneNumber = `telprompt:${phoneNumber}`; }
      Linking.openURL(phoneNumber);
    }


  return (
    <>
      <ScrollView style={styles.SellPage}>
        <CoolHeading
          title={"Sell Car"}
          // text={"Sell Car"}
        />
        <View style={styles.fold1}>
          <View style={styles.part1}>
            <View style={styles.part2}>
              <Image
                source={require("../../assets/img/img/sellcar-hero.jpg")}
                resizeMode={'contain'}
                style={{ height: 280, width: '100%' }}
              />
              <View style={styles.title}>
                <Text style={styles.heading}>3 Steps to Sell Your Luxury Car</Text>
                {/* <Text style={styles.heading}>Just 3 Easy Steps</Text> */}
              </View>

            </View>
            <View style={styles.kp_group} >
              <KeyPointsItem icon={<Appointmet_car height={50} width={50} color={Colors.BLACK_COLR} />} title="Book Appointment" />

              <KeyPointsItem
                icon={<Car_inspection height={50} width={50} color={Colors.BLACK_COLR} />}
                title="Car Inspection & Valuation"
              />

              <KeyPointsItem icon={<Sell_car height={50} width={50} color={Colors.BLACK_COLR} />} title="Sell Your Call" />
            </View>
          </View>


        </View>

        <View style={styles.stickyFooter}>
               <TouchableOpacity style={styles.whatsappButton} onPress={() => onWhatsApp()}>
                 <Text style={styles.whatsappButtonText}>Chat on WhatsApp</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.callButton} onPress={() => onCall()}>
                 <MaterialIcons name="phone" size={24} color="#000000" />
               </TouchableOpacity>
             </View>

        <View style={styles.wrapper}>
          <View style={styles.hero}>
            <View style={styles.title}>
              <Text style={styles.heading}>Looking to Sell? Get Instant Value!!!</Text>
              <Text style={styles.heading}>Sell Us Your Car in 24Hrs...</Text>
            </View>

            <ScrollView style={styles.top_points} horizontal={true}>
              <TopPointsItem icon={<Image
                source={require("../../assets/img/icons/FaTag.png")}
                resizeMode={'contain'}
                style={{ height: 35, width: 100, padding: 10 }}
              />
              } title="Competitive Price" />
              <TopPointsItem icon={<Image
                source={require("../../assets/img/icons/FaMoneyCheck.png")}
                resizeMode={'contain'}
                style={{ height: 35, width: 100, padding: 10 }}
              />
              } title="Fast Transaction" />
              <TopPointsItem
                icon={<Image
                  source={require("../../assets/img/icons/FaListCheck.png")}
                  resizeMode={'contain'}
                  style={{ height: 35, width: 100, padding: 10 }}
                />
                }
                title="Multiple Checkpoints"
              />
              <TopPointsItem icon={<Image
                source={require("../../assets/img/icons/FaGears.png")}
                resizeMode={'contain'}
                style={{ height: 35, width: 100, padding: 10 }}
              />
              } title="Seamless Process" />
              <TopPointsItem icon={<Image
                source={require("../../assets/img/icons/FaHandshake.png")}
                resizeMode={'contain'}
                style={{ height: 40, width: 100, padding: 10 }}
              />
              } title="Complete Privacy" />
            </ScrollView>
          </View>

          <View style={styles.custom_form}>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
              <Text style={styles.titleText}>
                Want to speak to our team, about your car?
              </Text>
            </View>
            <SellCarForm />
          </View>
        </View>

        {images?.length !== 0 &&
          <ScrollView style={{flexDirection:'row'}} horizontal={true}>
            {
              images?.map((photo) => {
                console.log("phots", photo)
                return(
                <View style={{margin:10}}>
                  <Image
                    source={{ uri: photo.uri }}
                    style={{ width: 100, height: 100 }}
                    resizeMode={"contain"}
                  />
                
                </View>
                )
              })
            }
          </ScrollView>
        }
      </ScrollView >
    </>
  );
}

//
//
//

// Key Points Item
const KeyPointsItem: FC<{ icon: ReactNode; title: string }> = ({
  icon,
  title,
}) => {
  return (
    <View style={styles.kp_item}>
      <View style={styles.icon_wrap}>{icon}</View>
      <Text style={styles.subTitle} ellipsizeMode="tail">{title}</Text>
    </View>
  );
};
//

//
//

// Top Points Item
const TopPointsItem: FC<{ icon: ReactNode; title: string }> = ({
  icon,
  title,
}) => {
  return (
    <View style={styles.tp_item}>
      {icon}
      <Text style={styles.subTitle}>{title}</Text>
    </View>
  );
};
//

const styles = StyleSheet.create({
  SellPage: {
    // padding: 10,
    marginBottom: 15,
    backgroundColor: Colors.PURE_WHITE
  },
  subTitle: {
    color: Colors.BLACK_COLR,
    fontSize: 16,
    // padding: 5,
    fontFamily: 'Oxanium-Medium',
    textAlign: 'center',
    display: 'flex'
  },
  titleText: {
    color: Colors.BLACK_COLR,
    fontSize: 22,
    // padding: 10,
    fontFamily: 'Oxanium-Medium',
    textAlign: 'center',
    display: 'flex'
  },
  heading: {
    color: Colors.BLACK_COLR,
    marginVertical: 5,
    fontSize: 22,
    fontFamily: 'Oxanium-Medium',
    textAlign: 'center'
  },
  fold1: {

  },
  part2: {
    marginVertical: 5,
  },
  part1: {

  },
  title: {
    padding: 10
  },
  kp_group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btn_group: {
    padding: 10
  },
  wrapper: {

  },
  hero: {

  },
  top_points: {
    flexDirection: 'row',
    backgroundColor: Colors.PURE_WHITE
  },
  custom_form: {
    backgroundColor: Colors.PURE_WHITE, padding: 10
  },
  kp_item: {

    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  icon_wrap: {
    backgroundColor: Colors.PURE_WHITE,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  tp_item: {
    backgroundColor: Colors.PURE_WHITE,
    paddingVertical: 20,
    width: 120,
    paddingHorizontal: 8,
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
     paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
    justifyContent:'center'
  },
  callButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginLeft:10,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whatsappButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  stickyFooter:{
    flexDirection: 'row',
    padding:10,
    marginTop:15,
    marginBottom:10
  }
});