import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  Home,
  DollarSign,
  Users,
  ShoppingCart,
  Truck,
  FileText,
  Video,
  Heart,
  Settings,
  HelpCircle,
  Store,
  ClipboardList,
  BookOpen,
  MessageCircle,
  X,
  ShoppingBag,
} from "lucide-react"
import { images } from "@/constants/images"

interface MenuItem {
  titleKey: string
  path: string
  icon: any
  notifs?: number
}

const menuItems: MenuItem[] = [
  { titleKey: "sidebar.menu.dashboard", path: "/", icon: Home },
  { titleKey: "sidebar.menu.users", path: "/users", icon: Users },
  { titleKey: "sidebar.menu.vendors", path: "/vendors", icon: Store, notifs: 3 },
  { titleKey: "sidebar.menu.products", path: "/products", icon: ShoppingCart, notifs: 12 },
  { titleKey: "sidebar.menu.productsApproval", path: "/admin/product-approval", icon: ClipboardList },
  { titleKey: "sidebar.menu.paymentsMonitoring", path: "/payments", icon: DollarSign },
  { titleKey: "sidebar.menu.orders", path: "/orders", icon: ShoppingBag },
  { titleKey: "sidebar.menu.drivers", path: "/drivers", icon: Truck },
]

const contentItems: MenuItem[] = [
  { titleKey: "sidebar.menu.articles", path: "/content/articles", icon: FileText },
  { titleKey: "sidebar.menu.videos", path: "/content/videos", icon: Video },
  { titleKey: "sidebar.menu.guides", path: "/content/guides", icon: BookOpen },
]

const communityItems: MenuItem[] = [
  { titleKey: "sidebar.menu.posts", path: "/community/posts", icon: MessageCircle, notifs: 5 },
  { titleKey: "sidebar.menu.reports", path: "/community/reports", icon: Heart },
]

const reportItems: MenuItem[] = [
  { titleKey: "sidebar.menu.sales", path: "/reports/sales", icon: DollarSign },
  { titleKey: "sidebar.menu.vendors", path: "/reports/vendors", icon: Store },
  { titleKey: "sidebar.menu.delivery", path: "/reports/delivery", icon: Truck },
  { titleKey: "sidebar.menu.users", path: "/reports/users", icon: Users },
]

interface SidebarProps {
  isOpen?: boolean
  isMobile?: boolean
  onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, isMobile = false, onClose }) => {
  const isVisible = isMobile ? isOpen : true

  useEffect(() => {
    if (!isMobile || !isOpen) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEsc)
    
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isMobile, isOpen, onClose])

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMobile || !isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.mobile-sidebar-content') && !target.closest('.menu-toggle-button')) {
        onClose?.()
      }
    }

    // Delay to avoid immediate close when opening
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 100)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobile, isOpen, onClose])

  // Listen for custom close event from navigation
  useEffect(() => {
    const handleCloseEvent = () => {
      onClose?.()
    }

    window.addEventListener('closeMobileMenu', handleCloseEvent)
    
    return () => {
      window.removeEventListener('closeMobileMenu', handleCloseEvent)
    }
  }, [onClose])

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar (Drawer) */}
      {isMobile && (
        <div
          className={`mobile-sidebar-content fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
            isVisible ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent open={true} isMobile={true} onClose={onClose} />
        </div>
      )}

      {/* Desktop Sidebar (Always visible) */}
      {!isMobile && <SidebarContent open={true} isMobile={false} onClose={onClose} />}
    </>
  )
}

interface SidebarContentProps {
  open: boolean
  isMobile: boolean
  onClose?: () => void
}

const SidebarContent: React.FC<SidebarContentProps> = ({ open, isMobile, onClose }) => {
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <nav
      className={`relative flex h-screen flex-col shrink-0 w-64 bg-background-card shadow-lg ${
        isMobile ? "shadow-xl" : "border-r border-border"
      }`}
    >
      {/* Close button for mobile */}
      {isMobile && (
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-lg p-2 text-text-secondary hover:bg-background-secondary transition-colors"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      <TitleSection isMobile={isMobile} onClose={onClose} />

      <div className="flex-grow overflow-y-auto overflow-x-hidden pb-20 px-2">
        <div className="space-y-1 mb-6">
          <div className="px-3 py-2 text-xs font-medium text-text-muted uppercase tracking-wide">
            {t("sidebar.sections.main")}
          </div>
          {menuItems.map((item) => (
            <Option
              key={item.path}
              Icon={item.icon}
              titleKey={item.titleKey}
              path={item.path}
              currentPath={location.pathname}
              notifs={item.notifs}
              isMobile={isMobile}
              onClose={onClose}
            />
          ))}
        </div>

        <div className="space-y-1 mb-6">
          <div className="px-3 py-2 text-xs font-medium text-text-muted uppercase tracking-wide">
            {t("sidebar.sections.content")}
          </div>
          {contentItems.map((item) => (
            <Option
              key={item.path}
              Icon={item.icon}
              titleKey={item.titleKey}
              path={item.path}
              currentPath={location.pathname}
              notifs={item.notifs}
              isMobile={isMobile}
              onClose={onClose}
            />
          ))}
        </div>

        <div className="space-y-1 mb-6">
          <div className="px-3 py-2 text-xs font-medium text-text-muted uppercase tracking-wide">
            {t("sidebar.sections.community")}
          </div>
          {communityItems.map((item) => (
            <Option
              key={item.path}
              Icon={item.icon}
              titleKey={item.titleKey}
              path={item.path}
              currentPath={location.pathname}
              notifs={item.notifs}
              isMobile={isMobile}
              onClose={onClose}
            />
          ))}
        </div>

        <div className="space-y-1 mb-6">
          <div className="px-3 py-2 text-xs font-medium text-text-muted uppercase tracking-wide">
            {t("sidebar.sections.reports")}
          </div>
          {reportItems.map((item) => (
            <Option
              key={item.path}
              Icon={item.icon}
              titleKey={item.titleKey}
              path={item.path}
              currentPath={location.pathname}
              notifs={item.notifs}
              isMobile={isMobile}
              onClose={onClose}
            />
          ))}
        </div>

        <div className="border-t border-border pt-4 space-y-1">
          <div className="px-3 py-2 text-xs font-medium text-text-muted uppercase tracking-wide">
            {t("sidebar.sections.account")}
          </div>
          <Option 
            Icon={Settings} 
            titleKey="sidebar.menu.settings" 
            path="/settings" 
            currentPath={location.pathname} 
            isMobile={isMobile}
            onClose={onClose}
          />
          <Option 
            Icon={HelpCircle} 
            titleKey="sidebar.menu.help_support" 
            path="/help" 
            currentPath={location.pathname} 
            isMobile={isMobile}
            onClose={onClose}
          />
        </div>
      </div>
    </nav>
  )
}

interface OptionProps {
  Icon: any
  titleKey: string
  path: string
  currentPath: string
  notifs?: number
  isMobile?: boolean
  onClose?: () => void
}

const Option: React.FC<OptionProps> = ({ Icon, titleKey, path, currentPath, notifs, isMobile, onClose }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const isSelected = currentPath === path || (path === "/" && currentPath === "/")

  const handleClick = () => {
    navigate(path)
    // Close mobile menu after navigation
    if (isMobile && onClose) {
      onClose()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
      className={`cursor-pointer relative flex h-11 w-full items-center rounded-md transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        isSelected
          ? "bg-gradient-primary text-white shadow-md"
          : "text-text-secondary hover:bg-background-secondary hover:text-text"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-primary'}`} />
      </div>

      <span className="text-sm font-medium flex-1">
        {t(titleKey)}
      </span>

      {notifs && (
        <span className={`absolute right-3 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium ${
          isSelected ? 'bg-white text-primary' : 'bg-primary text-text-on-primary'
        }`}>
          {notifs}
        </span>
      )}
    </div>
  )
}

interface TitleSectionProps {
  isMobile?: boolean
  onClose?: () => void
}

const TitleSection: React.FC<TitleSectionProps> = ({ isMobile, onClose }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/")
    if (isMobile && onClose) {
      onClose()
    }
  }

  return (
    <div className="mb-6 border-b border-border pb-4 px-2">
      <div
        onClick={handleClick}
        className="flex cursor-pointer items-center justify-center rounded-md p-2 transition-colors hover:bg-background-secondary"
      >
        <img
          src={images.logo}
          alt='Beyond Gluten Logo'
          className='h-16 w-auto'
        />
      </div>
    </div>
  )
}

export default Sidebar