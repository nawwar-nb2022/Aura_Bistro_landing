"use client"

const MENU_ITEMS = [
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
export default function MenuSection() {
    return (
        <section id="menu" className="py-24 bg-neutral-900/30 border-y border-neutral-800 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-amber-500 font-mono text-sm tracking-widest uppercase">Curated Selection</h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-neutral-100">Our Seasonal Menu</h3>
                </div>

                <div className="space-y-16">
                    {MENU_ITEMS.map((section, idx) => (
                        <div key={idx} className="space-y-8">
                            <h4 className="text-2xl font-serif font-bold text-amber-400 border-b border-neutral-800 pb-3">
                                {section.category}
                            </h4>

                            <div className="grid gap-6">
                                {section.items.map((item, itemIdx) => (
                                    <div
                                        key={itemIdx}
                                        className="flex flex-col sm:flex-row sm:items-baseline justify-between p-4 rounded-xl hover:bg-neutral-900/80 transition-colors duration-150"
                                    >
                                        <div className="space-y-1 pr-4">
                                            <span className="text-lg font-medium text-neutral-100">{item.name}</span>
                                            <p className="text-sm text-neutral-400">{item.description}</p>
                                        </div>
                                        <span className="text-lg font-mono font-bold text-amber-500 mt-2 sm:mt-0">
                                            {item.price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}