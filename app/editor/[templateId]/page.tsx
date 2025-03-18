'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/api-reference/next.config.js/introduction

// 声明 React 组件类型
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// 简历模板组件
import ProfessionalTemplate from '@/app/components/templates/ProfessionalTemplate'
import CreativeTemplate from '@/app/components/templates/CreativeTemplate'
import TechnicalTemplate from '@/app/components/templates/TechnicalTemplate'
import ExecutiveTemplate from '@/app/components/templates/ExecutiveTemplate'

// 简历表单组件
import ResumeForm from '@/app/components/ResumeForm'

// 简历数据接口
interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    title: string
    summary: string
  }
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
  }>
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  skills: Array<{
    id: string
    name: string
    level: number
  }>
}

// 默认简历数据
const defaultResumeData: ResumeData = {
  personalInfo: {
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '138-0000-0000',
    location: '上海市',
    title: '软件工程师',
    summary: '富有经验的软件工程师，擅长Web开发和系统架构设计。'
  },
  education: [
    {
      id: '1',
      institution: '上海大学',
      degree: '本科',
      field: '计算机科学',
      startDate: '2014-09',
      endDate: '2018-06'
    }
  ],
  experience: [
    {
      id: '1',
      company: 'ABC科技有限公司',
      position: '前端开发工程师',
      startDate: '2018-07',
      endDate: '2021-06',
      current: false,
      description: '负责公司主要产品的前端开发和维护，实现了多个关键功能，提高了用户体验和系统性能。'
    },
    {
      id: '2',
      company: 'XYZ互联网公司',
      position: '高级软件工程师',
      startDate: '2021-07',
      endDate: '',
      current: true,
      description: '负责系统架构设计和团队技术指导，推动了多项技术创新，优化了开发流程。'
    }
  ],
  skills: [
    { id: '1', name: 'JavaScript', level: 5 },
    { id: '2', name: 'React', level: 4 },
    { id: '3', name: 'Node.js', level: 4 },
    { id: '4', name: 'TypeScript', level: 3 },
    { id: '5', name: '系统架构设计', level: 4 }
  ]
}

// 获取模板名称
const getTemplateName = (templateId: string): string => {
  switch (templateId) {
    case 'professional': return '专业简约';
    case 'creative': return '创意设计';
    case 'technical': return '技术专精';
    case 'executive': return '高管精英';
    default: return '简历模板';
  }
};

export default function EditorPage({ params }: { params: { templateId: string } }) {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [activeTab, setActiveTab] = useState('edit') // 'edit' or 'preview'
  const [aiSuggestionText, setAiSuggestionText] = useState('')
  const [targetJobTitle, setTargetJobTitle] = useState('')
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false)
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('summary')
  const [aiError, setAiError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  
  // 自动存储简历数据
  useEffect(() => {
    const savedData = localStorage.getItem(`resume-${params.templateId}`)
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData))
      } catch (e) {
        console.error("无法解析已保存的简历数据", e)
      }
    }
  }, [params.templateId])
  
  // 自动保存简历数据
  const saveResumeData = () => {
    localStorage.setItem(`resume-${params.templateId}`, JSON.stringify(resumeData))
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }
  
  // 更新简历数据
  const updateResumeData = (newData: ResumeData) => {
    setResumeData(newData)
    // 自动保存到本地存储
    localStorage.setItem(`resume-${params.templateId}`, JSON.stringify(newData))
  }
  
  // 根据模板ID选择对应的模板组件
  const renderTemplate = () => {
    switch (params.templateId) {
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />
      case 'creative':
        return <CreativeTemplate data={resumeData} />
      case 'technical':
        return <TechnicalTemplate data={resumeData} />
      case 'executive':
        return <ExecutiveTemplate data={resumeData} />
      default:
        return <ProfessionalTemplate data={resumeData} />
    }
  }
  
  // 获取AI优化建议
  const getAISuggestions = async (section: string) => {
    if (!targetJobTitle) {
      alert("请输入目标职位以获取AI优化建议");
      return;
    }
    
    setIsSuggestionsLoading(true);
    setActiveSection(section);
    setAiError(null);
    
    try {
      let contentToOptimize = '';
      let sectionTitle = '';
      
      if (section === 'summary') {
        contentToOptimize = resumeData.personalInfo.summary;
        sectionTitle = '个人简介';
      } else if (section === 'experience') {
        contentToOptimize = resumeData.experience.map(exp => 
          `${exp.position} at ${exp.company}: ${exp.description}`
        ).join('\n\n');
        sectionTitle = '工作经验';
      } else if (section === 'skills') {
        contentToOptimize = resumeData.skills.map(skill => skill.name).join(', ');
        sectionTitle = '技能特长';
      }
      
      const response = await fetch('/api/ai/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: contentToOptimize,
          jobTitle: targetJobTitle,
          section: section
        }),
      });
      
      if (!response.ok) {
        throw new Error('优化请求失败: ' + response.statusText);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setAiSuggestionText(data.optimizedText);
      setSuggestionsOpen(true);
    } catch (error) {
      console.error('获取AI建议时出错:', error);
      setAiError(error instanceof Error ? error.message : '无法获取AI建议，请稍后再试');
    } finally {
      setIsSuggestionsLoading(false);
    }
  };
  
  // 应用AI建议
  const applyAISuggestion = () => {
    if (!aiSuggestionText) return;
    
    const newResumeData = {...resumeData};
    
    if (activeSection === 'summary') {
      newResumeData.personalInfo = {
        ...newResumeData.personalInfo,
        summary: aiSuggestionText
      };
    } else if (activeSection === 'experience') {
      // 这里简化处理，实际应用可能需要更复杂的逻辑
      const experiences = [...newResumeData.experience];
      if (experiences.length > 0) {
        experiences[0] = {
          ...experiences[0],
          description: aiSuggestionText
        };
        newResumeData.experience = experiences;
      }
    } else if (activeSection === 'skills') {
      // 简化处理，假设AI返回的是逗号分隔的技能列表
      const skillNames = aiSuggestionText.split(',').map(s => s.trim());
      const newSkills = skillNames.map((name, i) => ({
        id: `ai-${i}`,
        name,
        level: 4 // 默认水平
      }));
      newResumeData.skills = newSkills;
    }
    
    setResumeData(newResumeData);
    updateResumeData(newResumeData);
    setSuggestionsOpen(false);
    setAiSuggestionText('');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="bg-white border-b border-gray-100 p-4 sticky top-16 z-10 shadow-sm">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Link href="/templates" className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{getTemplateName(params.templateId)}</h1>
              <p className="text-xs text-gray-500">编辑您的简历内容</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative md:w-64 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="输入目标职位以获取AI优化..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full focus:border-blue-500 focus:outline-none"
                value={targetJobTitle}
                onChange={(e) => setTargetJobTitle(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <button 
                className={`px-4 py-2 rounded-lg ${activeTab === 'edit' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveTab('edit')}
              >
                <span className="hidden md:inline">编辑</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:hidden" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button 
                className={`px-4 py-2 rounded-lg ${activeTab === 'preview' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveTab('preview')}
              >
                <span className="hidden md:inline">预览</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:hidden" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={saveResumeData}
                className="hidden md:block px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                title="保存简历"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* 保存成功提示 */}
      {saveSuccess && (
        <div className="fixed top-24 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md shadow-md z-50 animate-fade-in-out">
          简历已保存
        </div>
      )}
      
      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'edit' ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              {aiError && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  <div className="flex">
                    <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium">AI优化失败</p>
                      <p className="text-sm">{aiError}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <h2 className="text-2xl font-semibold text-gray-800">编辑您的简历</h2>
                
                {targetJobTitle && (
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => getAISuggestions('summary')} 
                      className="flex items-center px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-sm font-medium transition-colors"
                      disabled={isSuggestionsLoading}
                    >
                      {isSuggestionsLoading && activeSection === 'summary' ? (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      )}
                      优化简介
                    </button>
                    <button 
                      onClick={() => getAISuggestions('experience')} 
                      className="flex items-center px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-sm font-medium transition-colors"
                      disabled={isSuggestionsLoading}
                    >
                      {isSuggestionsLoading && activeSection === 'experience' ? (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      )}
                      优化经验
                    </button>
                    <button 
                      onClick={() => getAISuggestions('skills')} 
                      className="flex items-center px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-sm font-medium transition-colors"
                      disabled={isSuggestionsLoading}
                    >
                      {isSuggestionsLoading && activeSection === 'skills' ? (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      )}
                      优化技能
                    </button>
                  </div>
                )}
              </div>
              
              {targetJobTitle === '' && (
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm">输入您的目标职位，启用AI优化功能，获取针对性建议。</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* AI建议弹窗 */}
              {suggestionsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl shadow-xl max-w-xl w-full max-h-[80vh] overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-lg font-semibold">AI优化建议</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">针对 {targetJobTitle} 职位</span>
                        <button 
                          onClick={() => setSuggestionsOpen(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="p-5 max-h-[60vh] overflow-y-auto">
                      <p className="text-gray-700 whitespace-pre-wrap">{aiSuggestionText}</p>
                    </div>
                    <div className="p-4 border-t border-gray-100 flex justify-end space-x-3">
                      <button 
                        onClick={() => setSuggestionsOpen(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        取消
                      </button>
                      <button 
                        onClick={applyAISuggestion}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        应用建议
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <ResumeForm data={resumeData} onUpdate={updateResumeData} />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 max-w-4xl mx-auto">
            {renderTemplate()}
            <div className="mt-8 flex justify-end gap-4">
              <button 
                onClick={() => {
                  setActiveTab('edit')
                  setTimeout(() => window.scrollTo(0, 0), 100)
                }}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                继续编辑
              </button>
              <button className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors">
                导出PDF
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 