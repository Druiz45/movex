import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDateTime(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

export function calculateDuration(startDateString, endDateString) {
  const start = new Date(startDateString)
  const end = new Date(endDateString)

  const durationMs = end - start
  const durationMinutes = Math.floor(durationMs / (1000 * 60))

  const hours = Math.floor(durationMinutes / 60)
  const minutes = durationMinutes % 60

  if (hours === 0) {
    return `${minutes} minutos`
  } else if (minutes === 0) {
    return `${hours} horas`
  } else {
    return `${hours} horas y ${minutes} minutos`
  }
}

