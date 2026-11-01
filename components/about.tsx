export default function About() {
    return (
        <section id="about" className="py-24 bg-neutral-900/50 border-y border-neutral-800 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-amber-500 font-mono text-sm tracking-widest uppercase">Our Story</h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-neutral-100">
                        Passionate about food, obsessed with perfection.
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                        Founded in 2018, Aura Bistro began with a simple philosophy: honor the ingredients. Every dish served in our dining room is a celebration of flavor, texture, and visual craftsmanship.
                    </p>
                    <p className="text-neutral-400 leading-relaxed">
                        Whether you are here for a relaxed weekend lunch, an intimate anniversary dinner, or drinks at the bar, our team is dedicated to creating memorable culinary moments.
                    </p>
                </div>

                <div className="bg-neutral-800/60 border border-neutral-700/50 rounded-2xl p-8 space-y-6">
                    <h4 className="text-xl font-serif font-semibold text-amber-400">Hours of Operation</h4>
                    <div className="space-y-3 border-b border-neutral-700/50 pb-6 text-sm">
                        <div className="flex justify-between text-neutral-300">
                            <span>Monday – Thursday</span>
                            <span className="font-mono text-neutral-400">5:00 PM – 10:00 PM</span>
                        </div>
                        <div className="flex justify-between text-neutral-300">
                            <span>Friday – Saturday</span>
                            <span className="font-mono text-neutral-400">5:00 PM – 11:30 PM</span>
                        </div>
                        <div className="flex justify-between text-neutral-300">
                            <span>Sunday</span>
                            <span className="font-mono text-neutral-400">4:00 PM – 9:30 PM</span>
                        </div>
                    </div>
                    <p className="text-xs text-neutral-500">
                        * Kitchen closes 45 minutes prior to closing time.
                    </p>
                </div>
            </div>
        </section>

    )
}