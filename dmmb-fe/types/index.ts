export interface Menu {
  title: string;
  to?: any;
}

export interface Slider {
  title: string;
  img?: any;
}

export interface Apartment {
  title: string;
  rooms?: string;
  people?: string;
  kitchen?: string;
  locale?: string;
  titleImg?: any;
  gallery?: any
}

export interface Activity {
  title: string;
  locale?: string;
  okolies?: any;
  desc?: string
}

export interface ContactInfo {
  name: string;
  email?: string;
  ico?: string;
  dic?: string;
  icDph?: string;
  locale?: string;
  addressHome?: any;
  addressCompany?: any;
  telephones?: any;
}

export interface Gallery {
  title: string;
  gallery?: any;
}

export interface Review {
  title: string;
  name?: string
  reviewText?: string
  rating?: number
}

export interface Price {
  title: string;
  dates?: string
  prices?: any;
}

export interface Privacy {
  title: string;
  body?: string
  rank?: any;
}