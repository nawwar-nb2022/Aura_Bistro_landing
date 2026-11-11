"use client"

import Link from "next/link"
import { useCallback, useState } from "react"
import { Plus } from "lucide-react"

import { ContentFormModal } from "@/components/admin/content-form-modal"
import { ContentStatusActions } from "@/components/admin/content-status-actions"
import { ContentTable, type ContentTableColumn } from "@/components/admin/content-table"
import { useContentTable } from "@/components/admin/use-content-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { Input } from "@/components/ui/input"
import {
  categorySchema,
  type CategoryFormInput,
  type CategoryFormOutput,
} from "@/lib/validations/category"

const CONTENT_SERVICE_MESSAGE =
  "Category changes are unavailable until a content API is configured. Your changes have not been saved."

type CategoryRecord = {
  id: string
  name: string
  status: "published" | "draft"
  itemCount: number
}

const categories: readonly CategoryRecord[] = []

function rejectUnavailableMutation(): never {
  throw new Error(CONTENT_SERVICE_MESSAGE)
}

function CategoriesPage() {
  const [formOpen, setFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] =
    useState<CategoryRecord | null>(null)
  const getSearchText = useCallback(
    (category: CategoryRecord) => category.name,
    [],
  )
  const table = useContentTable({
    records: categories,
    getSearchText,
  })

  function renderStatusActions(category: CategoryRecord) {
    const onEdit = () => {
      setEditingCategory(category)
      setFormOpen(true)
    }

    if (category.status === "published") {
      return (
        <ContentStatusActions
          recordName="Category"
          status="published"
          onEdit={onEdit}
          onUnpublish={rejectUnavailableMutation}
          unpublishDescription={
            category.itemCount > 0
              ? "Unpublishing this category will also hide its dishes from the public landing page. Item records and their statuses will not be changed."
              : undefined
          }
        />
      )
    }

    return (
      <ContentStatusActions
        recordName="Category"
        status="draft"
        onEdit={onEdit}
        onPublish={rejectUnavailableMutation}
      />
    )
  }

  const columns: readonly ContentTableColumn<CategoryRecord>[] = [
    {
      key: "name",
      header: "Name",
      cell: (category) => (
        <span className="font-medium text-foreground">{category.name}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (category) => (
        <Badge variant={category.status === "published" ? "success" : "secondary"}>
          {category.status === "published" ? "Published" : "Draft"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: <span className="block text-right">Actions</span>,
      className: "text-right",
      cell: (category) => (
        <div className="flex items-center justify-end gap-3">
          <Link
            href={`/dashboard/items?category=${encodeURIComponent(category.id)}`}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View Items
          </Link>
          {renderStatusActions(category)}
        </div>
      ),
    },
  ]

  function openAddForm() {
    setEditingCategory(null)
    setFormOpen(true)
  }

  function closeForm(open: boolean) {
    setFormOpen(open)
    if (!open) setEditingCategory(null)
  }

  return (
    <>
      <header className="mb-6 space-y-1 md:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Categories
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your restaurant menu categories.
        </p>
      </header>

      <p
        role="status"
        className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
      >
        {CONTENT_SERVICE_MESSAGE}
      </p>

      <ContentTable
        columns={columns}
        records={table.pageRecords}
        getRowKey={(category) => category.id}
        search={table.search}
        onSearchChange={table.setSearch}
        searchLabel="Search category name"
        searchPlaceholder="Search category name..."
        actions={
          <Button type="button" onClick={openAddForm}>
            <Plus aria-hidden="true" />
            Add Category
          </Button>
        }
        hasActiveQuery={table.hasActiveQuery}
        onClearSearch={table.clearSearch}
        noResultsMessage="No categories found."
        pagination={{
          currentPage: table.currentPage,
          totalPages: table.totalPages,
          onPageChange: table.setCurrentPage,
        }}
      />

      <ContentFormModal<CategoryFormInput, CategoryFormOutput>
        open={formOpen}
        onOpenChange={closeForm}
        mode={editingCategory ? "edit" : "add"}
        recordLabel="Category"
        schema={categorySchema}
        defaultValues={{ name: editingCategory?.name ?? "" }}
        onSubmit={rejectUnavailableMutation}
        getErrorMessage={(error) =>
          error instanceof Error ? error.message : CONTENT_SERVICE_MESSAGE
        }
      >
        {(form) => (
          <div className="space-y-4">
            <FormField<CategoryFormInput> name="name" label="Category Name">
              {(fieldProps) => (
                <Input
                  {...fieldProps}
                  {...form.register("name")}
                  autoComplete="off"
                  maxLength={255}
                />
              )}
            </FormField>
            <p className="text-sm text-muted-foreground">
              New categories will be published by default when category
              management is connected.
            </p>
          </div>
        )}
      </ContentFormModal>
    </>
  )
}

export { CategoriesPage }
