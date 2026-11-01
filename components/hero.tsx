export default function Hero() {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black px-6 py-20">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs tracking-widest uppercase font-semibold">
                    Fine Dining Experience
                </span>

                <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-neutral-100 leading-tight">
                    Taste the Harmony of <br className="hidden sm:inline" />
                    <span className="text-amber-500">Artisanal Flavor</span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
                    A modern dining experience blending Mediterranean traditions with fresh, organic ingredients sourced locally everyday.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <a
                        href="#menu"
                        className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-8 py-3.5 rounded-full text-base transition-colors duration-200"
                    >
                        Explore Menu
                    </a>
                    <a
                        href="#contact"
                        className="w-full sm:w-auto border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-900 text-neutral-200 font-medium px-8 py-3.5 rounded-full text-base transition-colors duration-200"
                    >
                        Reserve Table
                    </a>
                </div>
            </div>
        </section>

    )
}