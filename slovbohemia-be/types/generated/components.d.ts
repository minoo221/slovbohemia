import type { Schema, Attribute } from '@strapi/strapi';

export interface TextCompany extends Schema.Component {
  collectionName: 'components_text_companies';
  info: {
    displayName: 'company';
    icon: 'apps';
    description: '';
  };
  attributes: {
    companyName: Attribute.String;
    address: Attribute.String;
    zip: Attribute.String;
    city: Attribute.String;
    country: Attribute.String;
    ico: Attribute.String;
    dic: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'text.company': TextCompany;
    }
  }
}
