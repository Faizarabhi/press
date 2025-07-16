import ArticleCard from './ArticleCard'

export default function ArticleList({ articles }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
      {articles.map((article) => (
        <ArticleCard key={article.id} post={article} />
      ))}
    </div>
  )
}
