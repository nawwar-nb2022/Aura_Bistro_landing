import { z } from "zod"

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter a category name.")
    .max(255, "Category names must be 255 characters or fewer.")
    .regex(/\S/, "Enter a category name."),
})

export type CategoryFormInput = z.input<typeof categorySchema>
export type CategoryFormOutput = z.output<typeof categorySchema>
