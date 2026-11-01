export default function Footer() {
    return (
        <footer className="bg-black border-t border-neutral-900 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <span className="text-lg font-serif font-bold text-amber-500">AURA BISTRO</span>
                    <p className="text-xs text-neutral-500 mt-1">© {new Date().getFullYear()} Aura Bistro. All rights reserved.</p>
                </div>

                <div className="flex space-x-6 text-sm text-neutral-400">
                    <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-amber-500 transition-colors">Instagram</a>
                </div>
            </div>
        </footer>

    )
}