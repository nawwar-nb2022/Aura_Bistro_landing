"use client"

import { useState } from "react"

import { ActionMenu } from "@/components/ui/action-menu"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/ui/toast-provider"

type ContentStatusActionsBaseProps = {
  recordName: string
  onEdit: () => void
  getErrorMessage?: (error: unknown) => string
  unpublishDescription?: string
}

type ContentStatusActionsProps =
  | (ContentStatusActionsBaseProps & {
      status: "published"
      onUnpublish: () => void | Promise<void>
    })
  | (ContentStatusActionsBaseProps & {
      status: "draft"
      onPublish: () => void | Promise<void>
    })

function ContentStatusActions(props: ContentStatusActionsProps) {
  const { recordName, status, onEdit, getErrorMessage } = props
  const [confirmUnpublish, setConfirmUnpublish] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  async function publish(action: () => void | Promise<void>) {
    setIsPublishing(true)
    try {
      await action()
      showSuccessToast(`${recordName} published successfully.`)
    } catch (error) {
      showErrorToast(
        getErrorMessage?.(error) ??
          `Unable to publish ${recordName.toLowerCase()}. Please try again.`,
      )
    } finally {
      setIsPublishing(false)
    }
  }

  async function unpublish(action: () => void | Promise<void>) {
    await action()
    showSuccessToast(`${recordName} unpublished successfully.`)
  }

  return (
    <>
      {status === "published" ? (
        <ActionMenu
          recordName={recordName}
          status="published"
          onEdit={onEdit}
          disabled={isPublishing}
          onDelete={() => setConfirmUnpublish(true)}
        />
      ) : (
        <ActionMenu
          recordName={recordName}
          status="draft"
          onEdit={onEdit}
          disabled={isPublishing}
          onPublish={() => publish(props.onPublish)}
        />
      )}
      {status === "published" && (
        <ConfirmationDialog
          open={confirmUnpublish}
          onOpenChange={setConfirmUnpublish}
          title={`Unpublish ${recordName.toLowerCase()}?`}
          description={
            props.unpublishDescription ??
            "This will move the record to Draft and remove it from the published website."
          }
          confirmLabel="Unpublish"
          cancelLabel="Cancel"
          onConfirm={() => unpublish(props.onUnpublish)}
          onConfirmError={(error) =>
            showErrorToast(
              getErrorMessage?.(error) ??
                `Unable to unpublish ${recordName.toLowerCase()}. Please try again.`,
            )
          }
        />
      )}
    </>
  )
}

export { ContentStatusActions }
export type { ContentStatusActionsProps }
