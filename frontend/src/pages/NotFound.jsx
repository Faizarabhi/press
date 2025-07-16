import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center p-12">
      <h1 className="text-4xl font-bold mb-4">404 - Page non trouvée</h1>
      <p className="text-gray-600">La page que vous cherchez n’existe pas.</p>
      <Link to="/" className="mt-6 inline-block text-indigo-600 hover:underline">Retour à l’accueil</Link>
    </div>
  )
}
