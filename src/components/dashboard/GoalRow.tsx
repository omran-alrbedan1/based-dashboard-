import { GoalRowProps } from '@/types/dashboard.types'
import React from 'react'

const GoalRow: React.FC<GoalRowProps> = ({ name, amount, orders, pct, color }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 500, color: "#1a1a2e" }}>{name}</span>
      <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: "#9B9AB5" }}>{amount}</span>
    </div>
    <div style={{ width: "100%", height: 6, background: "#F0EFF9", borderRadius: 99, overflow: "hidden", marginBottom: 4 }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99 }} />
    </div>
    <p style={{ fontSize: 10, color: "#9B9AB5" }}>{orders} order{orders !== 1 ? "s" : ""} · {pct}%</p>
  </div>
)

export default GoalRow