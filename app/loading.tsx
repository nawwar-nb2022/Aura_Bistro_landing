import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased">

            {/* ------------------------------------------ */}
            {/* HEADER SKELETON                            */}
            {/* ------------------------------------------ */}
            <header className="sticky top-0 z-50 bg-neutral-950/80 border-b border-neutral-800 h-20 px-6 flex items-center justify-between">
                <Skeleton className="h-7 w-36 bg-neutral-800" />
                <div className="hidden md:flex items-center space-x-8">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-10 w-32 rounded-full hidden sm:block" />
            </header>

            {/* ------------------------------------------ */}
            {/* HERO SECTION SKELETON                      */}
            {/* ------------------------------------------ */}
            <section className="min-h-[85vh] flex flex-col items-center justify-center px-6 py-20 space-y-8">
                <Skeleton className="h-7 w-48 rounded-full" />
                <Skeleton className="h-16 w-3/4 max-w-2xl rounded-xl" />
                <Skeleton className="h-6 w-1/2 max-w-lg rounded-lg" />
                <div className="flex gap-4 pt-4 w-full justify-center">
                    <Skeleton className="h-12 w-40 rounded-full" />
                    <Skeleton className="h-12 w-40 rounded-full" />
                </div>
            </section>

            {/* ------------------------------------------ */}
            {/* ABOUT SECTION SKELETON                     */}
            {/* ------------------------------------------ */}
            <section className="py-24 bg-neutral-900/50 border-y border-neutral-800 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                    <Skeleton className="h-64 w-full rounded-2xl" />
                </div>
            </section>

            {/* ------------------------------------------ */}
            {/* FEATURES SKELETON                          */}
            {/* ------------------------------------------ */}
            <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4 flex flex-col items-center">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-64" />
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-48 rounded-2xl" />
                    ))}
                </div>
            </section>

            {/* ------------------------------------------ */}
            {/* MENU SECTION SKELETON                      */}
            {/* ------------------------------------------ */}
            <section className="py-24 bg-neutral-900/30 border-y border-neutral-800 px-6">
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="text-center space-y-4 flex flex-col items-center">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-64" />
                    </div>
                    <div className="space-y-8">
                        <Skeleton className="h-8 w-40" />
                        <div className="grid gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex justify-between items-center p-4">
                                    <div className="space-y-2 w-2/3">
                                        <Skeleton className="h-5 w-48" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                    <Skeleton className="h-6 w-16" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------ */}
            {/* TESTIMONIALS SKELETON                      */}
            {/* ------------------------------------------ */}
            <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4 flex flex-col items-center">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-10 w-56" />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <Skeleton className="h-40 rounded-2xl" />
                    <Skeleton className="h-40 rounded-2xl" />
                </div>
            </section>

            {/* ------------------------------------------ */}
            {/* CONTACT / FORM SKELETON                    */}
            {/* ------------------------------------------ */}
            <section className="py-24 bg-neutral-900/50 border-t border-neutral-800 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-64" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                    <Skeleton className="h-96 w-full rounded-2xl" />
                </div>
            </section>

        </div>
    );
}