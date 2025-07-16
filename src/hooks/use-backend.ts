"use client"

import { useState, useEffect } from "react"
import { getBackendAdapter, type BackendType } from "@/lib/backend-adapters"
import type { BackendAdapter } from "@/types"

export function useBackend(type?: BackendType) {
  const [adapter, setAdapter] = useState<BackendAdapter>(() => getBackendAdapter(type))

  useEffect(() => {
    setAdapter(getBackendAdapter(type))
  }, [type])

  const switchBackend = (newType: BackendType) => {
    setAdapter(getBackendAdapter(newType))
  }

  return {
    adapter,
    switchBackend,
  }
}
