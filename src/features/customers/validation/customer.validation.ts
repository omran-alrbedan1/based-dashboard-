import * as z from "zod"

export const createCustomerFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(1, { message: t("validation.nameRequired") })
      .min(3, { message: t("validation.nameMin") }),
    phone: z.string().min(9, { message: t("validation.phoneInvalid") }),
    email: z
      .string()
      .email({ message: t("validation.emailInvalid") })
      .optional()
      .or(z.literal("")),
    address: z.string().optional(),
    notes: z.string().optional(),
  })

export type CustomerFormValues = z.infer<
  ReturnType<typeof createCustomerFormSchema>
>

export const createVehicleFormSchema = (t: (key: string) => string) =>
  z.object({
    make: z.string().min(1, { message: t("vehicles.validation.makeRequired") }),
    model: z.string().min(1, { message: t("vehicles.validation.modelRequired") }),
    plateNumber: z
      .string()
      .min(1, { message: t("vehicles.validation.plateRequired") }),
    year: z
      .union([z.number().int().min(1900).max(2100), z.literal("")])
      .optional(),
    vin: z.string().optional(),
    mileage: z.union([z.number().min(0), z.literal("")]).optional(),
    fuelType: z
      .enum(["petrol", "diesel", "hybrid", "electric", "other"])
      .optional()
      .nullable(),
    transmissionType: z
      .enum(["automatic", "manual"])
      .optional()
      .nullable(),
    color: z.string().optional(),
    notes: z.string().optional(),
  })

export type VehicleFormValues = z.infer<
  ReturnType<typeof createVehicleFormSchema>
>
