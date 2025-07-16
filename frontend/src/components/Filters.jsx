export default function Filters({ filters, setFilters }) {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <select onChange={(e) => setFilters(f => ({ ...f, category: e.target.value }))}>
        <option value="">Toutes les catégories</option>
        <option value="1">Industrie</option>
        <option value="2">Innovation</option>
      </select>
      <select onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}>
        <option value="">Tous les statuts</option>
        <option value="Approved">Approuvé</option>
        <option value="Pending">En attente</option>
      </select>
      <input type="date" onChange={(e) => setFilters(f => ({ ...f, date: e.target.value }))} />
      <input
        type="text"
        placeholder="Auteur"
        onChange={(e) => setFilters(f => ({ ...f, author: e.target.value }))}
      />
    </div>
  )
}
