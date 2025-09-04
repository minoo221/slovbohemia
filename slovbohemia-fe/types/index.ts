import type {StrapiData, StrapiImage} from "~/types/strapi";

export interface Menu {
  title: string;
  to?: any;
  id?: number;
  slug?: string;
  items?: any[];
  isContact?: boolean;
}

export interface Slider {
  title: string;
  img?: any;
}

export interface OfferItem {
  title: string;
  desc: string;
  link: string;
  imgSrc: string;
}

export interface Banner {
  title: string;
  desc: string;
  btns: any[];
  slides: { img: string }[];
  maxWidth?: string;
}

export interface GalleryImage {
  id: number;
  smallImg: string;
  largeImg: string;
}

export interface Company {
  address: string;
  zip: string;
  city: string;
}

export interface ContactInformation {
  email: string;
  tel: string;
  company: Company;
}

export interface ContactFormData {
  name: string;
  email: string;
  tel: string;
  text: string;
}

export interface Usage {
  img: string;
  desc: string;
}

export interface WardrobeItem {
  id: number;
  item: string;
}

export interface WardrobeImage {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  } | null;
}

export interface Wardrobe {
  id: number;
  attributes: {
    title: string;
    items: WardrobeItem[];
    parameters: string; // HTML string
    image: WardrobeImage;
  };
}

export interface SinkAttributes {
  title: string;
  info: string;
  gallery: {
    data: StrapiData<StrapiImage>[];
  };
}

export type SinkResponse = StrapiData<SinkAttributes>;

export interface LightboxImage {
  text: string | number;
  src: string;
}

export interface LightboxImage {
    text: string | number;
    src: string;
    url?: string;
}