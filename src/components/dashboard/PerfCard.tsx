import { PerfCardProps } from '@/types/dashboard.types'
import React from 'react'

const PerfCard: React.FC<PerfCardProps> = ({ label, value, target, progress }) => (
  <div style={{ background: "#fff", borderRadius: 18, padding: 18 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
      <p style={{ fontSize: 11, color: "#9B9AB5", maxWidth: 100, lineHeight: 1.4 }}>{label}</p>
      <p style={{ fontSize: 22, fontWeight: 600, fontFamily: "'DM Mono', monospace", color: "#1a1a2e" }}>{value}</p>
    </div>
    <p style={{ fontSize: 10, color: "#9B9AB5", marginBottom: 10 }}>Target: {target}</p>
    <div style={{ width: "100%", height: 5, background: "#F0EFF9", borderRadius: 99, overflow: "hidden" }}>
      <div style={{ width: `${progress}%`, height: "100%", borderRadius: 99 }} />
    </div>
  </div>
)

export default PerfCard