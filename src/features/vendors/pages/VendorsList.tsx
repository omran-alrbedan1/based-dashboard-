import React from "react"

const VendorsList: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Vendors Management</h1>
        <p className="text-text-secondary">Manage all vendors and stores</p>
      </div>
      
      <div className="rounded-xl border border-border bg-background-card p-6 shadow-card">
        <p className="text-text-secondary">Vendors list table will go here...</p>
      </div>
    </div>
  )
}

export default VendorsList