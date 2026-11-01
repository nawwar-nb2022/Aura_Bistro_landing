"use client"
export default function ContactSection() {

    return (
        <section id="contact" className="py-24 bg-neutral-900/50 border-t border-neutral-800 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

                {/* Reservation Info */}
                <div className="space-y-6">
                    <h2 className="text-amber-500 font-mono text-sm tracking-widest uppercase">Visit Us</h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-neutral-100">
                        Make a Reservation
                    </h3>
                    <p className="text-neutral-400">
                        For parties larger than 8, private dining inquiries, or special catering requests, please call us directly.
                    </p>

                    <div className="space-y-4 pt-4 text-sm text-neutral-300">
                        <div className="flex items-start space-x-3">
                            <span className="text-amber-500">📍</span>
                            <span>124 Culinary Boulevard, Gourmet District, NY 10001</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-amber-500">📞</span>
                            <span>+1 (555) 234-5678</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-amber-500">✉️</span>
                            <span>reservations@aurabistro.com</span>
                        </div>
                    </div>
                </div>

                {/* Static Booking Form */}
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Jane Doe"

                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1">Date</label>
                                <input
                                    type="text"
                                    placeholder="MM/DD/YYYY"

                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-amber-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1">Guests</label>
                                <select
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-neutral-400 focus:outline-none "
                                >
                                    <option>1 Guests</option>
                                    <option>2 Guests</option>
                                    <option>3 Guests</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1">Special Requests</label>
                            <textarea
                                rows={3}
                                placeholder="Seating preferences, dietary restrictions..."
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                            />
                        </div>

                        <button
                            type="button"
                            className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold py-3 rounded-lg text-sm transition-colors duration-200 mt-2"
                        >
                            Request Table
                        </button>
                    </form>
                </div>

            </div>
        </section>

    )
}