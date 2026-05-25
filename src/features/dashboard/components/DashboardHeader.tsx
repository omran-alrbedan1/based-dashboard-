import { useTranslation } from 'react-i18next'
import {
  Calendar,
  Activity,
} from 'lucide-react'
import { images } from '@/constants/images'



const DashboardHeader = () => {
  const { t, i18n } = useTranslation('dashboard')
  
  const currentDate = new Date()
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  }
  const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions)
  const timeOfDay = currentDate.getHours() < 12 ? 'morning' : currentDate.getHours() < 18 ? 'afternoon' : 'evening'
  
  const isRTL = i18n.language === 'ar'
  
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-border/50 min-h-[170px]">
      <div className="flex items-center justify-between p-4 relative z-10">
        {/* Content */}
        <div className="flex-1" >
          <div className="flex items-center gap-1.5 mb-1" >
            <div className="w-0.5 h-4 bg-primary rounded-full" />
            <span className="text-md font-medium text-primary uppercase tracking-wider">
              {timeOfDay === 'morning' && `☀️ ${t('greetings.morning')}`}
              {timeOfDay === 'afternoon' && `🌤️ ${t('greetings.afternoon')}`}
              {timeOfDay === 'evening' && `🌙 ${t('greetings.evening')}`}
            </span>
          </div>
          
          <h1 
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent"
          >
            {t('welcome')}
          </h1>
          
          <div className="flex  flex-col  gap-3 mt-1.5" >
            <p className="text-md text-text-muted flex items-center gap-1">
              <Calendar size={11} className="text-primary" />
              {formattedDate}
            </p>
            <p className="text-[13px] text-text-muted/80 flex items-center gap-1">
              <Activity size={14} className="text-primary" />
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Empty spacer - maintains layout for absolute image */}
        <div className="hidden sm:block w-52" />
      </div>
      
      {/* Absolute positioned Storyset Image */}
      <div 
        className="hidden sm:block absolute top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ 
          [isRTL ? 'left' : 'right']: 0 
        }}
      >
        <img 
          src={images.dashboardHeader}
          alt="Dashboard illustration"
          className="w-74 h-auto object-contain"
          style={{ maxHeight: '240px' }}
        />
      </div>
    </div>
  )
}

export default DashboardHeader