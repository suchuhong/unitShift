import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-16">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-3xl font-semibold mt-4">页面未找到</h2>
      <p className="text-lg text-muted-foreground max-w-md mt-4">
        抱歉，您要查找的页面不存在或已被移动。
      </p>
      <div className="mt-8">
        <Link href="/">
          <Button>返回首页</Button>
        </Link>
      </div>
    </div>
  )
} 