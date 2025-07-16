"use client"

import type React from "react"

import { ChakraProvider as ChakraUIProvider, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
})

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <ChakraUIProvider theme={theme}>{children}</ChakraUIProvider>
}
