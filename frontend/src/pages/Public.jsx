import Article from "../components/Article";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react"
import { fetchValidatedPosts } from "../api/postApi"

export default function Public() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchValidatedPosts()
                setPosts(data)
            } catch (err) {
                setError("Erreur de chargement des articles")
            } finally {
                setLoading(false)
            }
        }

        loadPosts()
    }, [])

    const categories = [
        { name: "Économie", href: "/categories/economie" },
        { name: "Industrie", href: "/categories/industrie" },
        { name: "Innovation", href: "/categories/innovation" },
        { name: "Société", href: "/categories/societe" },
        { name: "Technologie", href: "/categories/technologie" },
        { name: "Environnement", href: "/categories/environnement" },
    ];



    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">

                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <a href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
                        <img className="h-8 w-auto" src="/logopress.png" alt="Magazine Logo" />
                    </a>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
                        >
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {categories.map((cat) => (
                            <a
                                key={cat.name}
                                href={cat.href}
                                className="text-sm font-semibold text-gray-900 hover:text-orange-600 transition"
                            >
                                {cat.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a
                            href="/login"
                            className="text-sm font-semibold text-gray-900 hover:text-orange-600 transition"
                        >
                            Login <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </nav>

                {/* Mobile menu dialog */}
                <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
                    <div className="fixed inset-0 z-50 bg-black/30" aria-hidden="true" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 shadow-lg ring-1 ring-black/5">
                        <div className="flex items-center justify-between">
                            <a href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
                                <img className="h-8 w-auto" src="/logopress.png" alt="Magazine Logo" />
                            </a>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-6 space-y-4">
                            {categories.map((cat) => (
                                <a
                                    key={cat.name}
                                    href={cat.href}
                                    className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100"
                                >
                                    {cat.name}
                                </a>
                            ))}
                            <a
                                href="/login"
                                className="block rounded-lg px-3 py-2 mt-6 text-base font-semibold text-gray-900 hover:bg-gray-100"
                            >
                                Login
                            </a>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            {/* Hero Banner */}
            <main className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Stay Ahead with <span className="text-orange-600">Industry Insights</span> & <br /> Innovation News
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
                        Your trusted source for the latest updates in Économie, Industrie, Innovation, Technologie, Environnement, and more.
                    </p>
                    <div className="mt-10 flex justify-center gap-x-6">
                        <a
                            href="/categories"
                            className="rounded-md bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                            Explore Categories
                        </a>
                        <a
                            href="/about"
                            className="text-sm font-semibold leading-6 text-gray-900 hover:text-orange-600"
                        >
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>

                {/* Decorative background shapes */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        background:
                            "linear-gradient(to right top,  #f97316, #fb923c, #fdba74, #fed7aa, #fff7ed)",
                        opacity: 0.3,
                        width: "150%",
                        height: "600px",
                        left: "-25%",
                        top: "-200px",
                        rotate: "30deg",
                    }}
                />
            </main>
            <section className="mx-24">
                {loading ? (
                    <p className="text-center text-gray-500">Chargement en cours...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Article key={post.id} post={post}  link={`post-review/${post.id}`}/>
                        ))}
                    </div>
                )}</section>

        </div>
    );
}
