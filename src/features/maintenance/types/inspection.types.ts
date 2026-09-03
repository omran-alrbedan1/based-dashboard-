export type FuelLevel =
  | "empty"
  | "quarter"
  | "half"
  | "three_quarters"
  | "full"

export interface ReceiptCondition {
  fuelLevel?: FuelLevel
  externalCondition?: string
  warningLights?: boolean
  tires?: string
  battery?: string
  glass?: string
  body?: string
  otherNotes?: string
}
