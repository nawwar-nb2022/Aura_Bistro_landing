import { getFeatureData } from "@/actions/Features"

export default async function Features() {

    const result = await getFeatureData()

    if (!result.success) {
        return (
            <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
                <p role="alert" className="text-center text-red-400">{result.error}</p>
            </section>
        )
    }

    const FEATURES = result.data
    if (FEATURES.length === 0) {
        return (
            <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
                <p className="text-center text-neutral-400">No features available.</p>
            </section>
        )
    }

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