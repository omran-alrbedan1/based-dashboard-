import React from "react"
import { useParams } from "react-router-dom"

const VendorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Vendor Details</h1>
        <p className="text-text-secondary">Viewing vendor ID: {id}</p>
      </div>
      
      <div className="rounded-xl border border-border bg-background-card p-6 shadow-card">
        <p className="text-text-secondary">Vendor details will go here...</p>
      </div>
    </div>
  )
}

export default VendorDetails