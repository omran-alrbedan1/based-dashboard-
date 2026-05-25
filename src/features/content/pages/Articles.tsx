import React from "react"

const Articles: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Articles Management</h1>
        <p className="text-text-secondary">Manage blog articles and posts</p>
      </div>
      
      <div className="rounded-xl border border-border bg-background-card p-6 shadow-card">
        <p className="text-text-secondary">Articles management will go here...</p>
      </div>
    </div>
  )
}

export default Articles