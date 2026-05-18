import React from "react"

const Posts: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Community Posts</h1>
        <p className="text-text-secondary">Moderate community posts and pending approvals</p>
      </div>
      
      <div className="rounded-xl border border-border bg-background-card p-6 shadow-card">
        <p className="text-text-secondary">Community posts moderation will go here...</p>
      </div>
    </div>
  )
}

export default Posts