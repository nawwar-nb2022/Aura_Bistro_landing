const NAVIGATION = [
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
];



export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <a href="#" className="text-2xl font-serif font-bold tracking-wider text-amber-500 hover:text-amber-400 transition-colors">
                    AURA BISTRO
                </a>

                <nav className="hidden md:flex items-center space-x-8">
                    {NAVIGATION.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-neutral-300 hover:text-amber-500 transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>

                <a
                    href="#contact"
                    className="hidden sm:inline-block bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-5 py-2.5 rounded-full text-sm transition-colors duration-200"
                >
                    Book a Table
                </a>
            </div>
        </header>

    )
}