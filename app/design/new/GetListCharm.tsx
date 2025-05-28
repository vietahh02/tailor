import charm1 from "../../assets/images/design/charm1.png";
import charm2 from "../../assets/images/design/charm2.png";
import charm3 from "../../assets/images/design/charm3.png";
import charm4 from "../../assets/images/design/charm4.png";
import charm5 from "../../assets/images/design/charm5.png";
import charm6 from "../../assets/images/design/charm6.png";
import charm7 from "../../assets/images/design/charm7.png";
import m1 from "../../assets/images/design/m1.webp";
import m2 from "../../assets/images/design/m2.webp";
import m3 from "../../assets/images/design/m3.webp";
import m4 from "../../assets/images/design/m4.webp";
import m5 from "../../assets/images/design/m5.webp";
import m6 from "../../assets/images/design/m6.webp";
import m7 from "../../assets/images/design/m7.webp";
import m8 from "../../assets/images/design/m8.webp";
import m9 from "../../assets/images/design/m9.webp";
import m10 from "../../assets/images/design/m10.webp";
import m11 from "../../assets/images/design/m11.webp";
import m12 from "../../assets/images/design/m12.webp";

const listCharm = [charm1, charm2, charm3, charm4, charm5, charm6, charm7];
const listM = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12];

export const getListM = () => {
  return listM;
};

export const getMByIndex = (index: number) => {
  return listM[index];
};

export const getListCharms = () => {
  return listCharm;
};

export const getCharmByIndex = (index: number) => {
  return listCharm[index];
};
