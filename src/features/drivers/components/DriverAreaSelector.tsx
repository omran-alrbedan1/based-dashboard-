import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useDriver } from '../hooks/useDriver'
import type { DriverArea } from '../types/drivers.types'

interface DriverAreaSelectorProps {
  driverId: string | number
  currentAreas?: DriverArea[]
  onUpdate: () => void
}

const DriverAreaSelector: React.FC<DriverAreaSelectorProps> = ({ driverId, currentAreas = [], onUpdate }) => {
  const { t } = useTranslation('drivers')
  const { allAreas, updateAreas, isUpdatingAreas } = useDriver(driverId)
  const [selected, setSelected] = useState<number[]>([])

  useEffect(() => {
    setSelected(currentAreas.map((item) => item.id))
  }, [currentAreas])

  const toggleArea = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((areaId) => areaId !== id) : [...prev, id]
    )
  }

  const handleUpdate = async () => {
    await updateAreas(selected)
    onUpdate()
  }

  return (
    <div className="rounded-3xl border border-border bg-background-card p-6 shadow-card">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">{t('areaSelector.title')}</h2>
          <p className="text-sm text-text-secondary">{t('areaSelector.description')}</p>
        </div>
        <Save className="text-primary" size={20} />
      </div>

      {!allAreas || allAreas.length === 0 ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-12 rounded-3xl bg-background animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-3">
          {allAreas.map((area) => (
            <label key={area.id} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-sm transition hover:border-primary">
              <input
                type="checkbox"
                checked={selected.includes(area.id)}
                onChange={() => toggleArea(area.id)}
                className="h-4 w-4 accent-primary"
              />
              <span>{area.name}</span>
            </label>
          ))}

          <button
            type="button"
            onClick={handleUpdate}
            disabled={isUpdatingAreas}
            className="mt-4 w-full rounded-2xl bg-gradient-to-r from-primary-dark to-primary px-4 py-3 text-sm font-medium text-white transition hover:from-primary-dark/90 hover:to-primary-dark disabled:opacity-60"
          >
            {isUpdatingAreas ? t('areaSelector.saving') : t('areaSelector.save')}
          </button>
        </div>
      )}
    </div>
  )
}

export default DriverAreaSelector