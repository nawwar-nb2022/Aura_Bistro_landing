import { getTestimonialData } from "@/actions/Testimonials"


export default async function TestimonialsSection() {

    const result = await getTestimonialData()

    if (!result.success) {
        return (
            <section id="Testimonial" className="py-24 px-6 max-w-7xl mx-auto">
                <p role="alert" className="text-center text-red-400">{result.error}</p>
            </section>
        )
    }
    if (result.data.length === 0) {
        return (
            <section id="Testimonial" className="py-24 px-6 max-w-7xl mx-auto">
                <p className="text-center text-neutral-400">No testimonials available.</p>
            </section>
        )
    }
    return (

        <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16">
                <h2 className="text-amber-500 font-mono text-sm tracking-widest uppercase">Word of Mouth</h2>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-neutral-100">Guest Experiences</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {result.data.map((testimonial, idx) => (
                    <div
                        key={idx}
                        className="bg-neutral-900/60 border border-neutral-800 p-8 rounded-2xl flex flex-col justify-between"
                    >
                        <p className="text-neutral-300 italic text-lg leading-relaxed mb-6">
                            &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <div>
                            <span className="block font-semibold text-neutral-100">{testimonial.author}</span>
                            <span className="text-xs text-amber-500 font-mono">{testimonial.role}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>

    )
}