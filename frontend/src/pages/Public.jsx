import Article from "../components/Article";
import { useEffect, useState } from "react"
import { fetchValidatedPosts } from "../api/postApi"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
export default function Public() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const articles = [
        {
            title: "Tanger : la locomotive industrielle du Maroc",
            image: "/images/img-1.jpg",
            content:
                "Grâce à des projets structurants comme Tanger Automotive City et au port stratégique de Tanger Med, la région du Nord s’est imposée comme un hub industriel incontournable. Automobile, textile, logistique… Tanger attire des investissements nationaux et étrangers et redéfinit le paysage industriel marocain.",
        },
        {
            title: "Industrie verte : le Maroc accélère la transition",
            image: "/images/img-2.jpg",
            content:
                "Dans un contexte mondial marqué par la transition énergétique, le Maroc mise sur l’industrie verte pour bâtir une croissance durable. De nouvelles zones industrielles à Kénitra et Nouaceur intègrent des unités dédiées aux énergies renouvelables, au traitement des déchets et à l’efficacité énergétique.",
        },
        {
            title: "De la ferme à l’usine : l’agro-industrie monte en puissance",
            image: "/images/img-2.jpg",
            content:
                "L’agro-industrie marocaine connaît une montée en puissance grâce à la transformation de produits agricoles en biens à forte valeur ajoutée : jus, huiles, conserves, produits laitiers… Dans des régions comme Souss-Massa ou Fès-Meknès, des PME innovantes modernisent les filières et renforcent l’export.",
        },
    ];

    const fakeData = [
        {
            id: 1,
            title: "How ‘She Doping’ Changed Marathon Times Forever",
            category: "Sports",
            author: "Bin Mckiney",
            image: "https://images.unsplash.com/photo-1524646349956-1590eacfa324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 2,
            title: "Team With a $10 Million Is the Brink",
            category: "Sports",
            author: "Bin Mckiney",
            image: "https://plus.unsplash.com/premium_photo-1661767467261-4a4bed92a507?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 3,
            title: "Pulling Together a Last-Minute Halloween Costume?",
            category: "Style",
            author: "Bin Mckiney",
            image: "https://plus.unsplash.com/premium_photo-1663840243176-1b4e4527e514?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 4,
            title: "How ‘She Doping’ Changed Marathon Times Forever",
            category: "Politics",
            author: "Bin Mckiney",
            image: "https://plus.unsplash.com/premium_photo-1683141498413-cdfc0feccdb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 5,
            title: "Baking Bliss: Tips and Tricks for Perfect Pastry",
            category: "Lifestyle",
            author: "Bin Mckiney",
            image: "https://plus.unsplash.com/premium_photo-1663126325483-886b1a08ba8e?q=80&w=2257&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];
    const [news, setNews] = useState([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setNews(fakeData);
        }, 500);
        return () => clearTimeout(timeout);
    }, []);
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

            <Header />
            <main className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Gardez une longueur d'avance grâce aux <span className="text-orange-600">informations sectorielles  </span> et à <br /> l'actualité de l'innovation
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
                        Votre source fiable pour les dernières actualités en économie, industrie, innovation, technologie, environnement et plus encore.
                    </p>
                    <div className="mt-10 flex justify-center items-center gap-x-6">
                        <a
                            href="/categories"
                            className="rounded-md bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            Explorer les catégories
                        </a>
                        <a
                            href="/about"
                            className="text-sm font-semibold leading-6 text-gray-900 hover:text-orange-600"
                        >
                            Apprendre encore plus <span aria-hidden="true">→</span>
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
                            <Article key={post.id} post={post} link={`post-review/${post.id}`} />
                        ))}
                    </div>
                )}</section>

            <div className="space-y-16 mx-24 mt-10">
                <div className="p-4 bg-white rounded-xl shadow-md">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">🔥 Trending News</h2>
                    <div className="space-y-4">
                        {news?.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, translateX: -20 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex gap-4 items-start"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                    <h3 className="font-semibold text-md text-gray-800 leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">By {item.author}</p>
                                </div>
                                <button className="text-gray-400 hover:text-gray-800">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.25 6.75L6.75 17.25"
                                        />
                                    </svg>
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
                {articles.map((article, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row gap-6 bg-white shadow rounded-xl overflow-hidden"
                    >
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full md:w-1/3 h-60 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
                            <p className="text-gray-600 mt-2">{article.content}</p>
                        </div>
                    </motion.div>
                ))}
            </div>


            <Footer />
        </div>
    );
}
