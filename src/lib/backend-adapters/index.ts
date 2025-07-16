import { laravelAdapter } from "./laravel-adapter"
import { expressAdapter } from "./express-adapter"
import { fastAPIAdapter } from "./fastapi-adapter"
import { nestJSAdapter } from "./nestjs-adapter"
import { strapiAdapter } from "./strapi-adapter"
import { supabaseAdapter } from "./supabase-adapter"
import { firebaseAdapter } from "./firebase-adapter"
import type { BackendAdapter } from "@/types"

export type BackendType = "laravel" | "express" | "fastapi" | "nestjs" | "strapi" | "supabase" | "firebase"

const adapters: Record<BackendType, BackendAdapter> = {
  laravel: laravelAdapter,
  express: expressAdapter,
  fastapi: fastAPIAdapter,
  nestjs: nestJSAdapter,
  strapi: strapiAdapter,
  supabase: supabaseAdapter,
  firebase: firebaseAdapter,
}

// Get the current backend adapter based on environment or configuration
export function getBackendAdapter(type?: BackendType): BackendAdapter {
  const backendType = type || (process.env.NEXT_PUBLIC_BACKEND_TYPE as BackendType) || "express"
  return adapters[backendType]
}

export {
  laravelAdapter,
  expressAdapter,
  fastAPIAdapter,
  nestJSAdapter,
  strapiAdapter,
  supabaseAdapter,
  firebaseAdapter,
}
