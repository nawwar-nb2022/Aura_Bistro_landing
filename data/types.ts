export interface MenuItem {
    name: string;
    price: string;
    description: string;
}

export interface MenuCategory {
    category: string;
    items: MenuItem[];
}

export interface FeatureType {
    title: string;
    description: string;
    icon: string;
}

export interface Testimonial {
    quote: string;
    author: string;
    role: string;
}

// A generic wrapper for any asynchronous action/fetch result
export type DataResult<T> =
    | { success: true; data: T }
    | { success: false; error: string };