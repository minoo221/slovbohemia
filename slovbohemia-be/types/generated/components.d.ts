import type { Schema, Attribute } from '@strapi/strapi';

export interface ProductsColorsCategory extends Schema.Component {
  collectionName: 'components_products_colors_categories';
  info: {
    displayName: 'Colors category';
  };
  attributes: {
    colors: Attribute.Component<'products.colors', true>;
  };
}

export interface ProductsColors extends Schema.Component {
  collectionName: 'components_products_colors';
  info: {
    displayName: 'Colors';
    description: '';
  };
  attributes: {
    color: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    code: Attribute.String;
  };
}

export interface ProductsParameters extends Schema.Component {
  collectionName: 'components_products_parameters';
  info: {
    displayName: 'Parameters';
  };
  attributes: {
    label: Attribute.String;
    value: Attribute.String;
  };
}

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
      'products.colors-category': ProductsColorsCategory;
      'products.colors': ProductsColors;
      'products.parameters': ProductsParameters;
      'text.company': TextCompany;
    }
  }
}
