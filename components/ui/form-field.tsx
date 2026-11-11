"use client"

import { useId, type ReactNode } from "react"
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

type FormFieldControlProps = {
  id: string
  "aria-invalid": boolean
  "aria-describedby"?: string
}

type FormFieldProps<TValues extends FieldValues> = {
  name: FieldPath<TValues>
  label: string
  children: (props: FormFieldControlProps) => ReactNode
}

function FormField<TValues extends FieldValues>({
  name,
  label,
  children,
}: FormFieldProps<TValues>) {
  const id = useId()
  const errorId = `${id}-error`
  const {
    getFieldState,
    formState,
  } = useFormContext<TValues>()
  const error = getFieldState(name, formState).error?.message

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export { FormField }
export type { FormFieldControlProps, FormFieldProps }
