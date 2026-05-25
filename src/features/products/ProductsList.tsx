import React from "react"

const ProductsList: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Products Management</h1>
        <p className="text-text-secondary">Manage all products pending approval</p>
      </div>
      
      <div className="rounded-xl border border-border bg-background-card p-6 shadow-card">
        <p className="text-text-secondary">Products list table will go here...</p>
      </div>
    </div>
  )
}

export default ProductsList