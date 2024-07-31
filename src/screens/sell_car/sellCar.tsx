import { FC, ReactNode, useCallback, useState } from "react";
import clsx from "clsx";
import ScheduleIcon from "../../assets/svg/schedule.svg";
import CarInspectionIcon from "../../assets/svg/car-inspection.svg";
import SellCarIcon from "../../assets/svg/sell-car.svg";

import { type SellCarDataType } from "../../utils/formAPIs/sellCar";
import { Alert, Linking, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import GeneralForm from "../../../components/GeneralForm/generalForm";
import { Colors } from "../../utils/color";
import { Image } from "react-native";
import ActionButton from "../../components/actionButton";
import siteInfo from "../../utils/data/siteDetails";

//
//

export default function SellPage() {
  const [filesAreUploading, setFilesAreUploading] = useState(false);

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


  return (
    <>
      <ScrollView style={styles.SellPage}>
        <View style={styles.fold1}>
          <View style={styles.part1}>
            <View style={styles.part2}>
              <Image
                source={require("../../assets/img/img/sellcar-hero.jpg")}
                resizeMode={'contain'}
                style={{ height: 300, width: '100%' }}
              />
              <View style={styles.title}>
                <Text style={styles.heading}>Sell Your Luxury Car in</Text>
                <Text style={styles.heading}>Just 3 Easy Steps</Text>
              </View>

            </View>
            <View style={styles.kp_group} >
              <KeyPointsItem icon={<ScheduleIcon height={50} width={50} color={Colors.BLACK_COLR} />} title="Book Appointment" />
              <KeyPointsItem
                icon={<CarInspectionIcon height={50} width={50} color={Colors.BLACK_COLR} />}
                title="Car Inspection & Valuation"
              />
              <KeyPointsItem icon={<SellCarIcon height={50} width={50} color={Colors.BLACK_COLR} />} title="Sell Your Call" />
            </View>
          </View>


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
            <Text style={styles.subTitle}>
              Want to speak to our team, about your car?
            </Text>
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
        <View style={styles.btn_group}>
          <ActionButton
            onPress={() => onCall(siteInfo.showrooms.pune.phone)}
            title={`Call Now: ${siteInfo.showrooms.pune.phone}`} backgroundColor={Colors.BLACK_COLR} color={Colors.PURE_WHITE}
          />
          <ActionButton
            onPress={() => onWhatappChat(siteInfo.showrooms.pune.phone)}
            title="Chat On Whatsapp " backgroundColor={'green'} color={Colors.PURE_WHITE}
          />
        </View>
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
    marginBottom: 15
  },
  subTitle: {
    color: Colors.BLACK_COLR,
    fontSize: 16,
    padding: 10,
    fontFamily: 'Oxanium-Medium',
    textAlign: 'center',
    display:'flex'
  },
  heading: {
    color: Colors.BLACK_COLR,
    marginVertical: 5,
    fontSize: 22,
    fontFamily: 'Oxanium-Medium',
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
    flexWrap:'wrap',
  },
  btn_group: {
    padding: 10
  },
  wrapper: {

  },
  hero: {

  },
  top_points: {
    flexDirection: 'row'
  },
  custom_form: {

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
    padding: 10,
    alignItems: 'center',
    margin: 10,
    borderRadius: 10
  }
});