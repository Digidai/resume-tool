import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* 主横幅 */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              创建
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600 mx-2">
                专业简历
              </span>
              脱颖而出
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              使用我们的专业模板和AI优化功能，轻松创建吸引招聘官的现代简历
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/templates" 
                className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                选择模板开始
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* 特点展示 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">创建令人印象深刻的简历从未如此简单</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">专业模板</h3>
              <p className="text-gray-600">精心设计的现代简历模板，帮助您脱颖而出，适合各行各业</p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI驱动的优化</h3>
              <p className="text-gray-600">使用人工智能技术增强您的简历内容，为特定职位量身定制</p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">轻松编辑</h3>
              <p className="text-gray-600">直观的界面让创建和编辑简历变得简单，无需专业设计经验</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 快速开始 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">开始创建您的简历</h2>
            <Link 
              href="/templates" 
              className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all text-lg"
            >
              浏览模板
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
} 