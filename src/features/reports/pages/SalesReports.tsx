import React from "react"

const SalesReports: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Sales Reports</h1>
        <p className="text-text-secondary">View daily, weekly, and monthly sales analytics</p>
      </div>
      
      <div className="rounded-xl border border-border bg-background-card p-6 shadow-card">
        <p className="text-text-secondary">Sales reports and charts will go here...</p>
      </div>
    </div>
  )
}

export default SalesReports