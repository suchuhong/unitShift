import Link from "next/link"
import { CATEGORIES } from "@/lib/constants"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="w-full py-6 md:py-0 bg-background border-t">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 py-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">关于我们</h3>
            <p className="text-sm text-muted-foreground">
              单位换算是一个专业的在线单位转换工具网站，提供各种单位换算功能，满足您在工作学习中的换算需求。
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">常用工具</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {CATEGORIES.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/${category.id}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">热门工具</h3>
            <ul className="grid grid-cols-1 gap-2 text-sm">
              <li><Link href="/length/meters/centimeters" className="text-muted-foreground hover:text-foreground">米转厘米</Link></li>
              <li><Link href="/weight/kilograms/pounds" className="text-muted-foreground hover:text-foreground">千克转磅</Link></li>
              <li><Link href="/temperature/celsius/fahrenheit" className="text-muted-foreground hover:text-foreground">摄氏度转华氏度</Link></li>
              <li><Link href="/area/square_meters/square_feet" className="text-muted-foreground hover:text-foreground">平方米转平方英尺</Link></li>
              <li><Link href="/volume/liters/gallons" className="text-muted-foreground hover:text-foreground">升转加仑</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">其他资源</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sitemap.xml" className="text-muted-foreground hover:text-foreground">网站地图</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">隐私政策</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground">使用条款</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">联系我们</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-6 border-t items-center justify-center md:flex-row md:gap-6 md:py-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} 单位换算. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  )
} 