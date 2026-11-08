"use client"

import { ToastContainer, toast } from "react-toastify"

function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar
      newestOnTop
      closeOnClick={false}
      pauseOnFocusLoss
      pauseOnHover
      draggable={false}
      limit={3}
      theme="light"
      aria-label="Notifications"
    />
  )
}

function showSuccessToast(message: string) {
  return toast.success(message, { role: "status" })
}

function showErrorToast(message: string) {
  return toast.error(message, { role: "alert" })
}

function showInfoToast(message: string) {
  return toast.info(message, { role: "status" })
}

export { ToastProvider, showErrorToast, showInfoToast, showSuccessToast }
