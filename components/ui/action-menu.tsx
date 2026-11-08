import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { MoreHorizontal, Pencil, Send, Trash2 } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

type ActionMenuBaseProps = {
  recordName: string
  onEdit: () => void
}

type ActionMenuProps =
  | (ActionMenuBaseProps & {
      status: "published"
      onDelete: () => void
    })
  | (ActionMenuBaseProps & {
      status: "draft"
      onPublish: () => void
    })

export function ActionMenu(props: ActionMenuProps) {
  return (
    <MenuPrimitive.Root>
      <MenuPrimitive.Trigger
        aria-label={`Actions for ${props.recordName}`}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "text-muted-foreground",
        )}
      >
        <MoreHorizontal aria-hidden="true" />
      </MenuPrimitive.Trigger>
      <MenuPrimitive.Portal>
        <MenuPrimitive.Positioner sideOffset={4} className="z-50 outline-none">
          <MenuPrimitive.Popup className="min-w-36 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[open]:animate-in data-[open]:fade-in-0 data-[closed]:animate-out data-[closed]:fade-out-0">
            <MenuPrimitive.Item
              onClick={props.onEdit}
              className="flex min-h-9 w-full cursor-default select-none items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
            >
              <Pencil aria-hidden="true" className="size-4" />
              Edit
            </MenuPrimitive.Item>
            {props.status === "published" ? (
              <MenuPrimitive.Item
                onClick={props.onDelete}
                className="flex min-h-9 w-full cursor-default select-none items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive outline-none transition-colors data-[highlighted]:bg-red-50 data-[highlighted]:text-red-700"
              >
                <Trash2 aria-hidden="true" className="size-4" />
                Delete
              </MenuPrimitive.Item>
            ) : (
              <MenuPrimitive.Item
                onClick={props.onPublish}
                className="flex min-h-9 w-full cursor-default select-none items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
              >
                <Send aria-hidden="true" className="size-4" />
                Publish
              </MenuPrimitive.Item>
            )}
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenuPrimitive.Portal>
    </MenuPrimitive.Root>
  )
}
