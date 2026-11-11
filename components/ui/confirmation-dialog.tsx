import { useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { showErrorToast } from "@/components/ui/toast-provider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ConfirmationDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: ReactNode
  onConfirm: () => void | Promise<void>
  onConfirmError?: (error: unknown) => void
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
}

function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  onConfirmError,
  confirmLabel = "Discard Changes",
  cancelLabel = "Keep Editing",
  destructive = true,
}: ConfirmationDialogProps) {
  const [isConfirming, setIsConfirming] = useState(false)

  async function handleConfirm() {
    setIsConfirming(true)
    try {
      await onConfirm()
      onOpenChange(false)
    } catch (error) {
      if (onConfirmError) {
        onConfirmError(error)
      } else {
        showErrorToast("Unable to complete this action. Please try again.")
      }
    } finally {
      setIsConfirming(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isConfirming || nextOpen) onOpenChange(nextOpen)
      }}
    >
      <DialogContent showCloseButton={false} className="max-w-md">
        <DialogHeader className="border-b-0 pb-2 pr-6">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="border-t-0 bg-transparent pt-0">
          <Button
            type="button"
            variant="outline"
            disabled={isConfirming}
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={destructive ? "destructive" : "default"}
            disabled={isConfirming}
            onClick={handleConfirm}
          >
            {isConfirming ? "Please wait..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function UnsavedChangesDialog({
  open,
  onOpenChange,
  onDiscard,
}: Pick<ConfirmationDialogProps, "open" | "onOpenChange"> & {
  onDiscard: () => void
}) {
  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Discard unsaved changes?"
      description="You have unsaved changes. Are you sure you want to discard them?"
      cancelLabel="Keep Editing"
      confirmLabel="Discard Changes"
      onConfirm={onDiscard}
    />
  )
}

export { ConfirmationDialog, UnsavedChangesDialog }
export type { ConfirmationDialogProps }
