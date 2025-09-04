// types/strapi.ts

export interface StrapiResponse<T> {
    data: StrapiDataItem<T>[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface StrapiData<T> {
    data: StrapiDataItem<T>;
}

export interface StrapiDataItem<T> {
    id: number;
    attributes: T;
}

export interface StrapiImage {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail?: StrapiImageFormat;
        small?: StrapiImageFormat;
        medium?: StrapiImageFormat;
        large?: StrapiImageFormat;
    };
    url: string;
}

interface StrapiImageFormat {
    name: string;
    width: number;
    height: number;
    url: string;
}

export interface Blog {
    title: string;
    info: string;
    slug: string;
    category: string;
    createdAt: string;
    mainImg: StrapiData<StrapiImage>;
}

export interface About {
    title: string;
    homeText: string;
    gallery: StrapiResponse<StrapiImage>;
}