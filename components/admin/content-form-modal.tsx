"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"

import { Button } from "@/components/ui/button"
import { UnsavedChangesDialog } from "@/components/ui/confirmation-dialog"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/ui/toast-provider"

type ContentFormModalProps<
  TInput extends FieldValues,
  TOutput extends FieldValues = TInput,
> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "add" | "edit"
  recordLabel: string
  schema: z.ZodType<TOutput, TInput>
  defaultValues: DefaultValues<TInput>
  onSubmit: (values: TOutput) => void | Promise<void>
  children: (
    form: UseFormReturn<TInput, unknown, TOutput>,
  ) => ReactNode
  getErrorMessage?: (error: unknown) => string
}

function ContentFormModal<
  TInput extends FieldValues,
  TOutput extends FieldValues = TInput,
>({
  open,
  onOpenChange,
  mode,
  recordLabel,
  schema,
  defaultValues,
  onSubmit,
  children,
  getErrorMessage,
}: ContentFormModalProps<TInput, TOutput>) {
  const form = useForm<TInput, unknown, TOutput>({
    resolver: zodResolver(schema),
    defaultValues,
  })
  const { isDirty, isSubmitting } = form.formState
  const { reset } = form
  const [confirmDiscard, setConfirmDiscard] = useState(false)
  const previousOpen = useRef(false)
  const latestDefaultValues = useRef(defaultValues)

  useEffect(() => {
    latestDefaultValues.current = defaultValues
  }, [defaultValues])

  useEffect(() => {
    if (open && !previousOpen.current) {
      reset(latestDefaultValues.current)
    }
    previousOpen.current = open
  }, [open, reset])

  function requestClose(nextOpen: boolean) {
    if (nextOpen) {
      onOpenChange(true)
      return
    }
    if (isSubmitting) return
    if (isDirty) {
      setConfirmDiscard(true)
      return
    }
    onOpenChange(false)
  }

  function discardChanges() {
    reset(latestDefaultValues.current)
    setConfirmDiscard(false)
    onOpenChange(false)
  }

  async function handleSubmit(values: TOutput) {
    try {
      await onSubmit(values)
      reset()
      onOpenChange(false)
      showSuccessToast(
        `${recordLabel} ${mode === "add" ? "added" : "updated"} successfully.`,
      )
    } catch (error) {
      showErrorToast(
        getErrorMessage?.(error) ??
          `Unable to ${mode === "add" ? "add" : "update"} ${recordLabel.toLowerCase()}. Please try again.`,
      )
    }
  }

  const title = `${mode === "add" ? "Add" : "Edit"} ${recordLabel}`

  return (
    <>
      <Dialog open={open} onOpenChange={requestClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {mode === "add"
                ? `Enter the details for this ${recordLabel.toLowerCase()}.`
                : `Update the details for this ${recordLabel.toLowerCase()}.`}
            </DialogDescription>
          </DialogHeader>
          <FormProvider {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(handleSubmit)}
              aria-label={title}
            >
              <DialogBody>{children(form)}</DialogBody>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => requestClose(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Saving..."
                    : mode === "add"
                      ? "Add"
                      : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
      <UnsavedChangesDialog
        open={confirmDiscard}
        onOpenChange={setConfirmDiscard}
        onDiscard={discardChanges}
      />
    </>
  )
}

export { ContentFormModal }
export type { ContentFormModalProps }
