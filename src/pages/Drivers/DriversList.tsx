import React from "react"

const DriversList: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Drivers Management</h1>
        <p className="text-text-secondary">Manage all delivery drivers</p>
      </div>
      
      <div className="rounded-xl border border-border bg-background-card p-6 shadow-card">
        <p className="text-text-secondary">Drivers list table will go here...</p>
      </div>
    </div>
  )
}

export default DriversList