import React from "react"
import { useParams } from "react-router-dom"

const ProductReview: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Product Review</h1>
        <p className="text-text-secondary">Reviewing product ID: {id}</p>
      </div>
      
      <div className="rounded-xl border border-border bg-background-card p-6 shadow-card">
        <p className="text-text-secondary">Product review details will go here...</p>
      </div>
    </div>
  )
}

export default ProductReview