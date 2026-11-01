"use client";
const FEATURES = [
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

export default function Features() {
    return (
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16">
                <h2 className="text-amber-500 font-mono text-sm tracking-widest uppercase">The Aura Experience</h2>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-neutral-100">Crafted With Care</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {FEATURES.map((feature, idx) => (
                    <div
                        key={idx}
                        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-amber-500/40 transition-colors duration-200"
                    >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h4 className="text-xl font-serif font-semibold text-neutral-100 mb-2">{feature.title}</h4>
                        <p className="text-neutral-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>

    )
}