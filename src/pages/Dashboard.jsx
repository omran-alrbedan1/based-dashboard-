import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Home,
  DollarSign,
  Monitor,
  ShoppingCart,
  Tag,
  BarChart3,
  Users,
  ChevronDown,
  ChevronsRight,
  Moon,
  Sun,
  TrendingUp,
  Activity,
  Package,
  Bell,
  Settings,
  HelpCircle,
  User,
} from "lucide-react"
import { removeToken } from "../lib/auth"

const activityItems = [
  { icon: DollarSign, title: "New sale recorded", desc: "Order #1234 completed", time: "2 min ago", color: "green" },
  { icon: Users, title: "New user registered", desc: "john.doe@example.com joined", time: "5 min ago", color: "blue" },
  { icon: Package, title: "Product updated", desc: "iPhone 15 Pro stock updated", time: "10 min ago", color: "purple" },
  { icon: Activity, title: "System maintenance", desc: "Scheduled backup completed", time: "1 hour ago", color: "orange" },
  { icon: Bell, title: "New notification", desc: "Marketing campaign results", time: "2 hours ago", color: "red" },
]

const Dashboard = () => {
  const [isDark, setIsDark] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const handleLogout = () => {
    removeToken()
    navigate("/login", { replace: true })
  }

  return (
    <div className={`flex min-h-screen w-full ${isDark ? "dark" : ""}`}>
      <div className="flex w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Sidebar />
        <DashboardContent isDark={isDark} setIsDark={setIsDark} onLogout={handleLogout} />
      </div>
    </div>
  )
}

const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const [selected, setSelected] = useState("Dashboard")

  return (
    <nav
      className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${
        open ? "w-64" : "w-16"
      } border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-sm`}
    >
      <TitleSection open={open} />

      <div className="space-y-1 mb-8">
        <Option Icon={Home} title="Dashboard" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={DollarSign} title="Sales" selected={selected} setSelected={setSelected} open={open} notifs={3} />
        <Option Icon={Monitor} title="View Site" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={ShoppingCart} title="Products" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={Tag} title="Tags" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={BarChart3} title="Analytics" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={Users} title="Members" selected={selected} setSelected={setSelected} open={open} notifs={12} />
      </div>

      {open && (
        <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-1">
          <div className="px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Account
          </div>
          <Option Icon={Settings} title="Settings" selected={selected} setSelected={setSelected} open={open} />
          <Option Icon={HelpCircle} title="Help & Support" selected={selected} setSelected={setSelected} open={open} />
        </div>
      )}

      <ToggleClose open={open} setOpen={setOpen} />
    </nav>
  )
}

const Option = ({ Icon, title, selected, setSelected, open, notifs }) => {
  const isSelected = selected === title

  return (
    <button
      onClick={() => setSelected(title)}
      className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
        isSelected
          ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm border-l-2 border-blue-500"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>

      {open && (
        <span className={`text-sm font-medium transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}>
          {title}
        </span>
      )}

      {notifs && open && (
        <span className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600 text-xs text-white font-medium">
          {notifs}
        </span>
      )}
    </button>
  )
}

const TitleSection = ({ open }) => {
  return (
    <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
      <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
        <div className="flex items-center gap-3">
          <Logo />
          {open && (
            <div className={`transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}>
              <div className="flex items-center gap-2">
                <div>
                  <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">Beyond Gluten</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">Admin Dashboard</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {open && <ChevronDown className="h-4 w-4 text-slate-400 dark:text-slate-500" />}
      </div>
    </div>
  )
}

const ToggleClose = ({ open, setOpen }) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-200 dark:border-slate-800 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
    >
      <div className="flex items-center p-3">
        <div className="grid size-10 place-content-center">
          <ChevronsRight
            className={`h-4 w-4 transition-transform duration-300 text-slate-500 dark:text-slate-400 ${open ? "rotate-180" : ""}`}
          />
        </div>
        {open && (
          <span className={`text-sm font-medium text-slate-600 dark:text-slate-300 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}>
            Hide
          </span>
        )}
      </div>
    </button>
  )
}

const Logo = () => (
  <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500 shadow-sm">
    <svg width="20" height="auto" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-white">
      <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" />
      <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" />
    </svg>
  </div>
)

const DashboardContent = ({ isDark, setIsDark, onLogout }) => {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-6 overflow-auto">
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Welcome back to your admin panel</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onLogout}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Logout
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          label="Total Sales"
          value="$24,567"
          tone="green"
          change="+12% from last month"
        />
        <StatCard
          icon={<Users className="h-5 w-5 text-green-600 dark:text-green-400" />}
          label="Active Users"
          value="1,234"
          tone="green"
          change="+5% from last week"
        />
        <StatCard
          icon={<ShoppingCart className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
          label="Orders"
          value="456"
          tone="green"
          change="+8% from yesterday"
        />
        <StatCard
          icon={<Package className="h-5 w-5 text-orange-600 dark:text-orange-400" />}
          label="Products"
          value="89"
          tone="green"
          change="+3 new this week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Activity</h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">View all</button>
          </div>
          <div className="space-y-4">
            {activityItems.map((activity, i) => (
              <div key={i} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div
                  className={`p-2 rounded-lg ${
                    activity.color === "green"
                      ? "bg-green-50 dark:bg-green-900/20"
                      : activity.color === "blue"
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : activity.color === "purple"
                      ? "bg-purple-50 dark:bg-purple-900/20"
                      : activity.color === "orange"
                      ? "bg-orange-50 dark:bg-orange-900/20"
                      : "bg-red-50 dark:bg-red-900/20"
                  }`}
                >
                  <activity.icon
                    className={`h-4 w-4 ${
                      activity.color === "green"
                        ? "text-green-600 dark:text-green-400"
                        : activity.color === "blue"
                        ? "text-blue-600 dark:text-blue-400"
                        : activity.color === "purple"
                        ? "text-purple-600 dark:text-purple-400"
                        : activity.color === "orange"
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{activity.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{activity.desc}</p>
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <ProgressStat label="Conversion Rate" value="3.2%" percent={32} tone="blue" />
              <ProgressStat label="Bounce Rate" value="45%" percent={45} tone="orange" />
              <ProgressStat label="Page Views" value="8.7k" percent={87} tone="green" />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Top Products</h3>
            <div className="space-y-3">
              {['iPhone 15 Pro', 'MacBook Air M2', 'AirPods Pro', 'iPad Air'].map((product, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">{product}</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">${Math.floor(Math.random() * 1000 + 500)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon, label, value, tone, change }) => (
  <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">{icon}</div>
      <TrendingUp className={`h-4 w-4 ${tone === "green" ? "text-green-500" : "text-blue-500"}`} />
    </div>
    <h3 className="font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</h3>
    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
    <p className="text-sm text-green-600 dark:text-green-400 mt-1">{change}</p>
  </div>
)

const ProgressStat = ({ label, value, percent, tone }) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{value}</span>
    </div>
    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
      <div
        className={`h-2 rounded-full ${
          tone === "blue"
            ? "bg-blue-500"
            : tone === "orange"
            ? "bg-orange-500"
            : "bg-green-500"
        }`}
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
)

export default Dashboard
