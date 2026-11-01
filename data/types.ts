export interface MenuItem {
    name: string;
    price: string;
    description: string;
}

export interface MenuCategory {
    category: string;
    items: MenuItem[];
}

export interface Feature {
    title: string;
    description: string;
    icon: string;
}

export interface Testimonial {
    quote: string;
    author: string;
    role: string;
}
