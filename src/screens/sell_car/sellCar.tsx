import { FC, ReactNode, useCallback, useState } from "react";
import clsx from "clsx";
// import dynamic from "next/dynamic";

// import {
//   FaGears,
//   FaHandshake,
//   FaListCheck,
//   FaMoneyCheck,
//   FaTag,
// } from "react-icons/fa6";
import ScheduleIcon from "../../assets/svg/schedule.svg";
import CarInspectionIcon from "../../assets/svg/car-inspection.svg";
import SellCarIcon from "../../assets/svg/sell-car.svg";

import Ionicons from 'react-native-vector-icons/Ionicons';

// import sellCarHeroImg from "@/assets/img/sellcar-hero.jpg";

// import CoolHeading from "@/components/CoolHeading";
// import { Text } from "@/components/GeneralForm";
import { type SellCarDataType } from "../../utils/formAPIs/sellCar";
// import { imageCompression } from "@/utils/imageCompression";
// import siteInfo from "@/data/siteInfo";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import GeneralForm from "../../../components/GeneralForm/generalForm";
import { Colors } from "../../utils/color";
import { Image } from "react-native";

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

  return (
    <>
      <ScrollView style={styles.SellPage}>
        <View style={styles.fold1}>
          <View style={styles.part1}>
            <View style={styles.title}>
              <Text style={styles.heading}>Sell Your Luxury Car in</Text>
              <Text style={styles.heading}>Just 3 Easy Steps</Text>
            </View>

            <View style={styles.kp_group} >
              <KeyPointsItem icon={<ScheduleIcon height={50} width={50} color={Colors.BLACK_COLR} />} title="Book Appointment" />
              <KeyPointsItem
                icon={<CarInspectionIcon height={50} width={50} color={Colors.BLACK_COLR} />}
                title="Car Inspection & Valuation"
              />
              <KeyPointsItem icon={<SellCarIcon height={50} width={50} color={Colors.BLACK_COLR} />} title="Sell Your Call" />
            </View>

            <View style={styles.btn_group}>
              {/* <a href={`tel:${siteInfo.showrooms.pune.phone}`}>
                <button>Call Now: {siteInfo.showrooms.pune.phone}</button>
              </a> */}

              {/* <a
                href={siteInfo.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
              >
                <button style={styles.wa}>Chat on WhatsApp</button>
              </a> */}
            </View>
          </View>

          {/* <View style={styles.part2}>
            <img src={sellCarHeroImg.src} alt="Car" />
          </View> */}
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
                alt="SOLD OUT"
              />
              } title="Competitive Price" />
              <TopPointsItem icon={<Image
                source={require("../../assets/img/icons/FaMoneyCheck.png")}
                resizeMode={'contain'}
                style={{ height: 40, width: 100, padding: 10 }}
                alt="SOLD OUT"
              />
              } title="Fast Transaction" />
              <TopPointsItem
                icon={<Image
                  source={require("../../assets/img/icons/FaListCheck.png")}
                  resizeMode={'contain'}
                  style={{ height: 40, width: 100, padding: 10 }}
                  alt="SOLD OUT"
                />
                }
                title="Multiple Checkpoints"
              />
              <TopPointsItem icon={<Image
                source={require("../../assets/img/icons/FaGears.png")}
                resizeMode={'contain'}
                style={{ height: 40, width: 100, padding: 10 }}
                alt="SOLD OUT"
              />
              } title="Seamless Process" />
              <TopPointsItem icon={<Image
                source={require("../../assets/img/icons/FaHandshake.png")}
                resizeMode={'contain'}
                style={{ height: 40, width: 100, padding: 10 }}
                alt="SOLD OUT"
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
                  placeholder: "Car Make & Model",
                  required: true,
                },
                { name: "name", type: "text", required: true },
                { name: "email", type: "email", required: true },
                {
                  name: "phone",
                  type: "tel",
                  placeholder: "Phone no",
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
      <Text style={styles.subTitle}>{title}</Text>
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
  // const tpItemClasses = clsx(zebulonFont.style, styles.tp_item);

  //

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
    padding: 10
  },
  subTitle: {
    color: Colors.BLACK_COLR,
   fontSize:18,
   padding:10
  },
  heading: {
    color: Colors.BLACK_COLR,
    marginVertical: 5,
    fontSize: 22,
  },
  fold1: {

  },
  part1: {

  },
  title: {

  },
  kp_group: {
    flexDirection: 'row'
  },
  btn_group: {

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
    margin: 10,
    padding: 10,
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
    padding: 20,
    margin: 10,
    borderRadius: 10
  }
});