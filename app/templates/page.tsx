import Link from 'next/link'
import Image from 'next/image'

const templates = [
  {
    id: "professional",
    name: "专业简约",
    description: "清晰简约的专业简历模板，适合大多数职位",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
    borderColor: "border-blue-200"
  },
  {
    id: "creative",
    name: "创意设计",
    description: "突显创意和设计能力的模板，适合创意行业",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
    borderColor: "border-purple-200"
  },
  {
    id: "technical",
    name: "技术专精",
    description: "强调技术技能和项目经验的模板，适合IT行业",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-800",
    borderColor: "border-emerald-200"
  },
  {
    id: "executive",
    name: "高管精英",
    description: "突出领导力和成就的模板，适合管理岗位",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
    borderColor: "border-amber-200"
  }
]

export default function TemplatesPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">选择简历模板</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          选择适合您职业目标的设计，轻松创建令人印象深刻的简历
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {templates.map((template) => (
          <div 
            key={template.id}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className={`h-2 bg-gradient-to-r ${template.color}`}></div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-full ${template.bgColor} flex items-center justify-center ${template.textColor}`}>
                  {template.id === "professional" && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {template.id === "creative" && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {template.id === "technical" && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  )}
                  {template.id === "executive" && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{template.name}</h2>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                </div>
              </div>
              
              {/* 真实简历预览 */}
              <div className={`border ${template.borderColor} rounded-lg overflow-hidden mb-6 shadow-sm hover:shadow transition-shadow`}>
                <div className="relative h-64">
                  {template.id === "professional" && (
                    <div className="absolute inset-0 p-4 flex flex-col">
                      <div className="text-center mb-4 border-b pb-3">
                        <div className="text-lg font-bold mb-1">张三</div>
                        <div className="text-sm text-gray-600">软件工程师</div>
                        <div className="flex justify-center gap-2 text-xs text-gray-500 mt-1">
                          <span>email@example.com</span>
                          <span>•</span>
                          <span>138-0000-0000</span>
                        </div>
                      </div>
                      <div className="flex-1 flex gap-3">
                        <div className="w-2/3 text-sm">
                          <div className="font-medium mb-1 text-gray-800">工作经验</div>
                          <div className="mb-2">
                            <div className="font-medium text-xs">高级开发工程师</div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>ABC科技有限公司</span>
                              <span>2018 - 至今</span>
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="font-medium text-xs">前端开发工程师</div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>XYZ互联网公司</span>
                              <span>2015 - 2018</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/3 text-sm">
                          <div className="font-medium mb-1 text-gray-800">技能</div>
                          <div className="text-xs text-gray-600">
                            <div className="mb-1">JavaScript</div>
                            <div className="mb-1">React.js</div>
                            <div className="mb-1">Node.js</div>
                            <div className="mb-1">TypeScript</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {template.id === "creative" && (
                    <div className="absolute inset-0 p-4 flex">
                      <div className="w-1/3 bg-purple-100 text-center p-3 flex flex-col">
                        <div className="h-12 w-12 bg-purple-200 rounded-full mx-auto mb-2"></div>
                        <div className="text-lg font-bold mb-1">张三</div>
                        <div className="text-xs text-purple-800 mb-3">设计师</div>
                        <div className="mt-auto text-xs">
                          <div className="mb-1">email@example.com</div>
                          <div className="mb-1">138-0000-0000</div>
                          <div>上海市</div>
                        </div>
                      </div>
                      <div className="w-2/3 pl-4 flex flex-col">
                        <div className="border-b border-purple-100 pb-2 mb-2">
                          <div className="font-medium text-sm text-purple-800 mb-1">简介</div>
                          <div className="text-xs text-gray-600">富有创意的设计师，擅长UI/UX设计...</div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm text-purple-800 mb-1">工作经验</div>
                          <div className="mb-2">
                            <div className="text-xs font-medium">高级UI设计师</div>
                            <div className="text-xs text-gray-500">创意工作室 | 2019-至今</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium">UI/UX设计师</div>
                            <div className="text-xs text-gray-500">设计公司 | 2016-2019</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {template.id === "technical" && (
                    <div className="absolute inset-0 p-4 flex flex-col">
                      <div className="flex justify-between mb-3">
                        <div>
                          <div className="text-lg font-bold">张三</div>
                          <div className="text-sm text-emerald-700">软件架构师</div>
                        </div>
                        <div className="text-xs text-right">
                          <div>email@example.com</div>
                          <div>138-0000-0000</div>
                        </div>
                      </div>
                      <div className="mb-3 border-t border-b border-emerald-100 py-2">
                        <div className="text-xs text-emerald-800 font-medium mb-1">技术技能</div>
                        <div className="flex flex-wrap gap-1 text-xs">
                          <span className="px-2 py-0.5 bg-emerald-100 rounded text-emerald-700">Java</span>
                          <span className="px-2 py-0.5 bg-emerald-100 rounded text-emerald-700">Python</span>
                          <span className="px-2 py-0.5 bg-emerald-100 rounded text-emerald-700">Spring</span>
                          <span className="px-2 py-0.5 bg-emerald-100 rounded text-emerald-700">微服务</span>
                          <span className="px-2 py-0.5 bg-emerald-100 rounded text-emerald-700">Docker</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-emerald-800 font-medium mb-1">工作经验</div>
                        <div className="text-xs mb-2">
                          <div className="font-medium">高级后端工程师</div>
                          <div className="flex justify-between text-gray-600">
                            <span>科技有限公司</span>
                            <span>2018-至今</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">负责核心系统架构设计与实现</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {template.id === "executive" && (
                    <div className="absolute inset-0 flex flex-col">
                      <div className="bg-amber-700 text-white p-4 mb-3">
                        <div className="text-lg font-bold">张三</div>
                        <div className="text-sm">营销总监</div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="mb-3">
                          <div className="text-amber-800 text-xs font-medium uppercase mb-1">职业概要</div>
                          <div className="text-xs text-gray-600">资深营销专家，擅长品牌战略规划与团队管理...</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-amber-800 text-xs font-medium uppercase mb-1">专业经验</div>
                          <div className="mb-2">
                            <div className="flex justify-between">
                              <div className="text-xs font-bold">营销总监</div>
                              <div className="text-xs">2019-至今</div>
                            </div>
                            <div className="text-xs font-medium">国际品牌公司</div>
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <div className="text-xs font-bold">市场经理</div>
                              <div className="text-xs">2015-2019</div>
                            </div>
                            <div className="text-xs font-medium">品牌管理有限公司</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <Link 
                href={`/editor/${template.id}`}
                className="inline-block w-full py-3 text-center text-white font-medium rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                使用此模板
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 flex justify-center">
        <Link href="/" className="text-primary-600 hover:text-primary-700">
          返回首页
        </Link>
      </div>
    </main>
  )
} 