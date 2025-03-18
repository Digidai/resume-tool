import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '简历优化工具',
  description: '提供现代化简历模板和AI优化功能的工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 min-h-screen">
        <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 relative group">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600">简历优化工具</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <Link href="/templates" className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
                    简历模板
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
                    关于我们
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        
        {children}
        
        <footer className="bg-white border-t border-gray-100 py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-gray-700 font-medium">简历优化工具</p>
                <p className="text-gray-500 text-sm">帮助求职者创建专业、有竞争力的简历</p>
              </div>
              <div className="text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} 简历优化工具. 保留所有权利.</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 