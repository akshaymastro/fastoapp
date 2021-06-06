import { Platform } from "react-native";
import { fontSizes } from "../../common/fontSizes";
import { heights } from "../../common/heights";
import { Colors } from "./index";

const FontWeight = {
  regular: "400",
  bold: "bold",
};

export const FontFamily =
  Platform.OS == "ios"
    ? {
        MarkSimonsonkRegular: "ProximaNova-Regular",
        MarkSimonsonkMedium: "ProximaNova-Medium",
        MarkSimonsonkLight: "ProximaNovaT-Thin",
        MarkSimonsonBlackRegular: "ProximaNovaA-Black",
        MarkSimonsonBold: "ProximaNovaA-Bold",
        MarkSimonsonAltSemiBold: "ProximaNovaACond-Semibold",
        MarkSimonsonkAltRegular: "ProximaNovaA-Regular",
        MarkSimonsonSCOSFThin: "ProximaNovaS-Thin",
        MarkSimonsonSemiBold: "ProximaNova-Semibold",
        MarkSimonsonThin: "ProximaNovaT-Thin",
      }
    : {
        MarkSimonsonkRegular: "ProximaNova-Regular",
        MarkSimonsonkMedium: "ProximaNova-Medium",
        MarkSimonsonkLight: "Proxima Nova Thin",
        MarkSimonsonBlackRegular:
          "Mark Simonson - Proxima Nova Alt Black-webfont",
        MarkSimonsonBold: "Mark Simonson - Proxima Nova Alt Bold-webfont",
        MarkSimonsonAltSemiBold:
          "Mark Simonson - Proxima Nova Alt Condensed Semibold-webfont",
        MarkSimonsonkAltRegular:
          "Mark Simonson - Proxima Nova Alt Regular-webfont",
        MarkSimonsonSCOSFThin:
          "Mark Simonson - Proxima Nova ScOsf Thin-webfont",
        MarkSimonsonSemiBold: "Mark Simonson - Proxima Nova Semibold-webfont",
        MarkSimonsonThin: "Mark Simonson - Proxima Nova Thin-webfont",
      };

//On board header
export const onBoardtitleTxt = {
  color: Colors.purple,
  fontSize: fontSizes(25),
  fontWeight: "400",
  fontWeight: FontWeight.regular,
  fontFamily: FontFamily.MarkSimonsonkRegular,
  textAlign: "center",
};

export const onBoardetalTxt = {
  color: Colors.black,
  lineHeight: 25,
  fontSize: fontSizes(16),
  fontWeight: FontWeight.regular,
  fontFamily: FontFamily.MarkSimonsonkRegular,
  textAlign: "center",
};

export const testPvRegular14 = {
  fontFamily: FontFamily.MarkSimonsonkRegular,
  fontSize: fontSizes(14),
  color: Colors.white,
};
// export const FontFamily =
//   Platform.OS == "ios"
//     ? {
//         MarkSimonsonkRegular: "ProximaNovaA-Regular",
//         MarkSimonsonBlackRegular: "ProximaNovaA-Black",
//         MarkSimonsonBold: "ProximaNovaA-Bold",
//         MarkSimonsonAltSemiBold: "ProximaNovaACond-Semibold",
//         // MarkSimonsonkRegular: "Proxima Nova Alt Rg Regular",
//         // MarkSimonsonAltThin:"Proxima Nova Alt Rg Regular",
//         MarkSimonsonSCOSFThin: "ProximaNovaS-Thin",
//         MarkSimonsonSemiBold: "ProximaNova-Semibold",
//         MarkSimonsonThin: "ProximaNovaT-Thin",
//       }
//     : {
//         MarkSimonsonBlackRegular:
//           "Mark Simonson - Proxima Nova Alt Black-webfont",
//         MarkSimonsonBold: "Mark Simonson - Proxima Nova Alt Bold-webfont",
//         MarkSimonsonAltSemiBold:
//           "Mark Simonson - Proxima Nova Alt Condensed Semibold-webfont",
//         MarkSimonsonkRegular:
//           "Mark Simonson - Proxima Nova Alt Regular-webfont",
//         // MarkSimonsonAltThin:"Proxima Nova Alt Rg Regular",
//         MarkSimonsonSCOSFThin:
//           "Mark Simonson - Proxima Nova ScOsf Thin-webfont",
//         MarkSimonsonSemiBold: "Mark Simonson - Proxima Nova Semibold-webfont",
//         MarkSimonsonThin: "Mark Simonson - Proxima Nova Thin-webfont",
//       };

// export const onBoardetalTxt={
//   color: Colors.black,
//   fontSize: fontSizes(18),
//   fontWeight: FontWeight.regular,
//   fontFamily: FontFamily.MarkSimonsonkRegular,
// };

/// Heder Component title text
export const headerTitle = {
  color: Colors.black,
  fontSize: fontSizes(14),
  fontWeight: FontWeight.regular,
  fontFamily: FontFamily.MarkSimonsonkRegular,
};

// On Boarding title text
export const onBoardTitle = {
  color: Colors.purple,
  fontSize: fontSizes(24),
  fontWeight: "400",
  textAlign: "center",
};

// Setting render card title text
export const renderItemTitle = {
  color: Colors.black,
  fontSize: fontSizes(17),
  fontWeight: FontWeight.regular,
  fontFamily: FontFamily.MarkSimonsonkMedium,
};
// bottom text
export const bottomDetailsTxt = {
  color: Colors.placeHolderGrey,
  fontSize: fontSizes(17),
  fontWeight: FontWeight.regular,
  fontFamily: FontFamily.MarkSimonsonkRegular,
};

//Cards container

export const cardsContainer = {
  width: "100%",
  // padding:10,
  backgroundColor: Colors.white,
  shadowColor: Colors.grey,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowRadius: 5,
  shadowOpacity: Platform.OS === "ios" ? 0.4 : 1.0,
  borderRadius: 20,
  backgroundColor: "red",
};

//Pagination dots

export const nonActiveDots = {
  backgroundColor: Colors.grey,
  width: 6,
  height: 6,
  borderRadius: 4,
  marginLeft: 3,
  marginRight: 3,
  marginTop: heights(10),
  marginBottom: 3,
};
export const activeDots = {
  backgroundColor: Colors.black,
  width: 6,
  height: 6,
  borderRadius: 4,
  marginLeft: 3,
  marginRight: 3,
  marginTop: heights(10),
  marginBottom: 3,
};
export const nonActiveDots1 = {
  backgroundColor: Colors.grey,
  width: 6,
  height: 6,
  borderRadius: 4,
  marginLeft: 3,
  marginRight: 3,
  // marginTop: heights(10),
  // marginBottom: 3,
};
export const activeDots1 = {
  backgroundColor: Colors.black,
  width: 6,
  height: 6,
  borderRadius: 4,
  marginLeft: 3,
  marginRight: 3,
  // marginTop: heights(10),
  // marginBottom: 3,
};
export const commomCustomCard = {
  width: "100%",
  padding: 10,
  backgroundColor: Colors.white,
  shadowColor: Colors.grey,

  shadowOffset: {
    width: 0,
    height: 2,
  },
  // shadowColor: Colors.grey,
  shadowRadius: 2,
  // borderRadius: 5,
  shadowOpacity: Platform.OS === "ios" ? 0.4 : 1.0,
  // borderRadius: 20,
  // overflow:"hidden",
  elevation: 0.5,
};

export const titleText = {
  fontSize: fontSizes(14),
  // fontWeight: FontWeight.Regular,
  color: Colors.black,
  // fontFamily: FontFamily.PS_Regular
};
export const authTitles = {
  color: Colors.white,
  fontSize: fontSizes(21),
  fontWeight: "400",
  textAlign: "center",
  fontFamily: FontFamily.MarkSimonsonkRegular,

  marginTop: Platform.OS == "android" ? heights(20) : heights(20),
};

export const pq3Subtitle = {
  color: Colors.white,
  fontSize: fontSizes(20),
  fontWeight: "400",
  textAlign: "center",
  fontFamily: FontFamily.MarkSimonsonkRegular,
  marginBottom: Platform.OS == "android" ? heights(20) : null,
};

export const textW16MarkBold = {
  color: Colors.white,
  fontSize: fontSizes(16),
  fontWeight: "400",
  textAlign: "center",
  fontFamily: FontFamily.MarkSimonsonkRegular,
};
