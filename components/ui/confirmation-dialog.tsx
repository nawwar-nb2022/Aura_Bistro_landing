import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
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
  onConfirm: () => void
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
  confirmLabel = "Discard Changes",
  cancelLabel = "Keep Editing",
  destructive = true,
}: ConfirmationDialogProps) {
  function handleConfirm() {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-w-md">
        <DialogHeader className="border-b-0 pb-2 pr-6">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="border-t-0 bg-transparent pt-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={destructive ? "destructive" : "default"}
            onClick={handleConfirm}
          >
            {confirmLabel}
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
