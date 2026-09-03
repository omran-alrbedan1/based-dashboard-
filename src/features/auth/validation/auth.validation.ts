import * as z from "zod"

export const loginFormSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  password: z
    .string()
    .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" }),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
