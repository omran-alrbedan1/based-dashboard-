import React from "react"

const OrdersList: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Orders Management</h1>
        <p className="text-text-secondary">Manage all customer orders</p>
      </div>
      
      <div className="rounded-xl border border-border bg-background-card p-6 shadow-card">
        <p className="text-text-secondary">Orders list table will go here...</p>
      </div>
    </div>
  )
}

export default OrdersList