import afinaImage from "./avatars/afina.png";
import actegaImage from "./avatars/actega.jpg";
import acimgaImage from "./avatars/ACIMGA.jpg";
import etiquetpackImage from "./avatars/etiqetpack.jpg";
import euccoiImage from "./avatars/euccoi.jpg";

export const companyAvatars = {
  "AFINIA LABEL": afinaImage,
  ACTEGA: actegaImage,
  ACIMGA: acimgaImage,
  "EUCCOI TECHNOLOGY": euccoiImage,
  "ETIQ&PACK": etiquetpackImage,
};

export const companies = [
  {
    companyName: "AFINIA LABEL",
    taskNumber: 2,
    companyDescription: "We Make Great Labels",
    company_ID: 1,
  },
  {
    companyName: "ACTEGA",
    taskNumber: 0,
    companyDescription: "Distrubute coatings, inks, adhesives",
    company_ID: 2,
  },
  {
    companyName: "ACIMGA",
    taskNumber: 0,
    companyDescription: "Established in 1947",
    company_ID: 3,
  },
  {
    companyName: "EUCCOI TECHNOLOGY",
    taskNumber: 1,
    companyDescription: "Over 25 years of experience",
    company_ID: 4,
  },
  {
    companyName: "ETIQ&PACK",
    taskNumber: 0,
    companyDescription: "magazine de l'emballage imprimé et de l'étiquette",
    company_ID: 5,
  },
];

export const tasks = [
  {
    name: "T-SHIRT printing",
    description: "Choose your own design",
    company_ID: 1,
    id: 1,
  },
  {
    name: "MUG printing",
    description: "Greatest printing quality",
    company_ID: 1,
    id: 2,
  },
  {
    name: "BOX printing",
    description: "Highly detailed printing",
    company_ID: 4,
    id: 3,
  },
];

export const requests = [
  { name: "Request 1", description: "Some description", company_ID: 1, id: 1 },
  { name: "Request 2", description: "Some description", company_ID: 1, id: 2 },
  { name: "Request 3", description: "Some description", company_ID: 4, id: 3 },
];

export const builderJson = {
  1: {},
  2: {},
  3: {},
};
