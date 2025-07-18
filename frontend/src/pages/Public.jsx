import Article from "../components/Article";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react"
import { fetchValidatedPosts } from "../api/postApi"
import Header from "../components/Header";

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

   

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
           <Header />

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
