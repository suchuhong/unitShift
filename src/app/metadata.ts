import { Metadata } from "next"
import { generateHomeMetadata } from "@/components/seo/metadata"

export const metadata: Metadata = {
  ...generateHomeMetadata(),
} 