'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function OptimizePage() {
  const [resumeText, setResumeText] = useState('')
  const [optimizedText, setOptimizedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [jobTitle, setJobTitle] = useState('')
  
  const handleOptimize = async () => {
    if (!resumeText || !jobTitle) return
    
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/ai/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText,
          jobTitle,
        }),
      })
      
      const data = await response.json()
      setOptimizedText(data.optimizedText)
    } catch (error) {
      console.error('优化失败:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI简历优化</h1>
        <p className="text-gray-600">
          通过AI技术优化您的简历内容，提高求职竞争力
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">您的简历内容</h2>
          
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
              目标职位
            </label>
            <input
              type="text"
              id="jobTitle"
              className="input"
              placeholder="例如：软件工程师、市场经理"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="resumeText" className="block text-sm font-medium text-gray-700 mb-1">
              粘贴您的简历内容
            </label>
            <textarea
              id="resumeText"
              className="input min-h-[300px]"
              placeholder="在此粘贴您的简历内容..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>
          
          <button
            className="btn btn-primary w-full"
            onClick={handleOptimize}
            disabled={isLoading || !resumeText || !jobTitle}
          >
            {isLoading ? '正在优化...' : 'AI优化简历'}
          </button>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">优化后的简历</h2>
          
          {optimizedText ? (
            <div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 min-h-[300px] mb-4 whitespace-pre-wrap">
                {optimizedText}
              </div>
              <button
                className="btn btn-secondary w-full"
                onClick={() => {
                  navigator.clipboard.writeText(optimizedText)
                }}
              >
                复制到剪贴板
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[300px] text-gray-500">
              {isLoading ? '正在生成优化内容...' : '优化后的内容将显示在这里'}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-10 flex justify-center">
        <Link href="/" className="text-primary-600 hover:text-primary-700">
          返回首页
        </Link>
      </div>
    </main>
  )
} 