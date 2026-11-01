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

// Simulated mock database


// Simulated async fetch functions with network delay (e.g., 200ms)
export async function getMenuData(): Promise<MenuCategory[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MENU_DATA;
}

export async function getFeaturesData(): Promise<Feature[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return FEATURES_DATA;
}

export async function getTestimonialsData(): Promise<Testimonial[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return TESTIMONIALS_DATA;
}