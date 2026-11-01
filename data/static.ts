import { Feature, MenuCategory, Testimonial } from "./types";

export const MENU_DATA: MenuCategory[] = [
    {
        category: 'Starters',
        items: [
            { name: 'Truffle Burrata', price: '$18', description: 'Fresh burrata, heirloom tomatoes, aged balsamic, micro basil' },
            { name: 'Charred Octopus', price: '$22', description: 'Spanish octopus, romesco sauce, smoked paprika, lemon oil' },
        ],
    },
    {
        category: 'Mains',
        items: [
            { name: 'Pan-Seared Sea Bass', price: '$36', description: 'Saffron risotto, braised fennel, citrus beurre blanc' },
            { name: 'Prime Ribeye (12oz)', price: '$48', description: 'Grass-fed beef, roasted garlic butter, rosemary potatoes' },
            { name: 'Wild Mushroom Rigatoni', price: '$28', description: 'Handmade pasta, black truffle cream, parmigiano reggiano' },
        ],
    },
    {
        category: 'Desserts',
        items: [
            { name: 'Pistachio Tart', price: '$14', description: 'Sicilian pistachio cream, dark chocolate crust, sea salt' },
            { name: 'Classic Tiramisu', price: '$12', description: 'Espresso-soaked ladyfingers, mascarpone, cocoa powder' },
        ],
    },
];

export const FEATURES_DATA: Feature[] = [
    {
        title: 'Farm to Table',
        description: 'We source 100% of our produce and meats from local organic farms weekly.',
        icon: '🌱',
    },
    {
        title: 'Master Chefs',
        description: 'Our culinary team brings over 20 years of Michelin-starred experience.',
        icon: '👨‍🍳',
    },
    {
        title: 'Artisanal Drinks',
        description: 'Handcrafted cocktails and a curated selection of fine natural wines.',
        icon: '🍷',
    },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
    {
        quote: 'The truffle pasta was hands down the best dish I have ever had. The ambiance and service are unmatched.',
        author: 'Elena Rostova',
        role: 'Food Critic',
    },
    {
        quote: 'Aura Bistro never disappoints. It has quickly become our favorite spot for Friday night dinners and celebrations.',
        author: 'Marcus Vance',
        role: 'Local Regular',
    },
];


