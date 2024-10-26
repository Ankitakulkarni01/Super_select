import { FC, ReactNode, useCallback, useState } from "react";
import clsx from "clsx";
import ScheduleIcon from "../../assets/svg/schedule.svg";
import CarInspectionIcon from "../../assets/svg/car-inspection.svg";
import SellCarIcon from "../../assets/svg/sell-car.svg";
import Appointmet_car from '../../assets/svg/book Appointment.svg'
import Car_inspection from '../../assets/svg/Car_inspection.svg'
import Sell_car from '../../assets/svg/sell_car_icon.svg'

import { type SellCarDataType } from "../../utils/formAPIs/sellCar";
import { Alert, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GeneralForm from "../../../components/GeneralForm/generalForm";
import { Colors } from "../../utils/color";
import { Image } from "react-native";
import ActionButton from "../../components/actionButton";
import siteInfo from "../../utils/data/siteDetails";
import ImageCropPicker from 'react-native-image-crop-picker';
import { Button } from "react-native";
import CoolHeading from "../../components/CoolHeading";

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
  const onCall = (number: string) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else { phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber)

  }

  const onWhatappChat = (mobileNumber: string) => {
    let url =
      'whatsapp://send?' +
      'phone=91' + mobileNumber;
    Linking.openURL(url)
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        Alert.alert('Make sure Whatsapp installed on your device');
      });
  }

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


  return (
    <>
      <ScrollView style={styles.SellPage}>
        <CoolHeading
          title={"Sell Car"}
          text={"Fair Price"}
        />
        <View style={styles.fold1}>
          <View style={styles.part1}>
            <View style={styles.part2}>
              <Image
                source={require("../../assets/img/img/sellcar-hero.jpg")}
                resizeMode={'contain'}
                style={{ height: 300, width: '100%' }}
              />
              <View style={styles.title}>
                <Text style={styles.heading}>3 Steps to Sell Your Luxury Car</Text>
                {/* <Text style={styles.heading}>Just 3 Easy Steps</Text> */}
              </View>

            </View>
            <View style={styles.kp_group} >
              <KeyPointsItem
                icon={<Car_inspection height={50} width={50} color={Colors.BLACK_COLR} />}
                title="Car Inspection & Valuation"
              />
              <KeyPointsItem icon={<Appointmet_car height={50} width={50} color={Colors.BLACK_COLR} />} title="Book Appointment" />

              <KeyPointsItem icon={<Sell_car height={50} width={50} color={Colors.BLACK_COLR} />} title="Sell Your Call" />
            </View>
          </View>


        </View>

        <View style={{ padding: 5, flexDirection: 'row', flex: 1 }}>
          <ActionButton
            onPress={() => onWhatappChat(siteInfo.showrooms.pune.phone)}
            title="Chat On Whatsapp " backgroundColor={'#2DB742'} color={Colors.PURE_WHITE}
          />
          <TouchableOpacity style={{ flex: 0.3, justifyContent: 'center' }} onPress={() => onCall(siteInfo.showrooms.pune.phone)}>
            <Appointmet_car height={50} width={50} color={Colors.BLACK_COLR} />
          </TouchableOpacity>
          {/* <ActionButton
            onPress={() => onCall(siteInfo.showrooms.pune.phone)}
            backgroundColor={Colors.BLACK_COLR} color={Colors.PURE_WHITE}
          /> */}
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
                style={{ height: 40, width: 100, padding: 10 }}
              />
              } title="Competitive Price" />
              <TopPointsItem icon={<Image
                source={require("../../assets/img/icons/FaMoneyCheck.png")}
                resizeMode={'contain'}
                style={{ height: 40, width: 100, padding: 10 }}
              />
              } title="Fast Transaction" />
              <TopPointsItem
                icon={<Image
                  source={require("../../assets/img/icons/FaListCheck.png")}
                  resizeMode={'contain'}
                  style={{ height: 40, width: 100, padding: 10 }}
                />
                }
                title="Multiple Checkpoints"
              />
              <TopPointsItem icon={<Image
                source={require("../../assets/img/icons/FaGears.png")}
                resizeMode={'contain'}
                style={{ height: 40, width: 100, padding: 10 }}
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
            <GeneralForm
              formName="sellForm"
              inputs={[
                {
                  name: "makeModel",
                  type: "text",
                  placeholder: "Car Make & Model*",
                  required: true,
                },
                { name: "Name *", type: "text", required: true },
                { name: "Email *", type: "email", required: true },
                {
                  name: "phone",
                  type: "tel",
                  placeholder: "Phone no *",
                  required: true,
                },
              ]}
              fileInputs={[
                {
                  name: "carPhotos",
                  type: "image",
                  count: 8,
                  placeholder: "Add Car Photos",
                  required: true,
                },
              ]}
              onSubmit={onFormSubmit}
              filesAreUploading={filesAreUploading}
              withAcknowledgment
            />
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
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
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
    fontSize: 18,
    padding: 5,
    fontFamily: 'Oxanium-Medium',
    textAlign: 'center',
    display: 'flex'
  },
  titleText: {
    color: Colors.BLACK_COLR,
    fontSize: 20,
    // padding: 10,
    fontFamily: 'Oxanium-Medium',
    textAlign: 'center',
    display: 'flex'
  },
  heading: {
    color: Colors.BLACK_COLR,
    marginVertical: 5,
    fontSize: 28,
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
    width: 150,
    paddingHorizontal: 10,
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20
  }
});