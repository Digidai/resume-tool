import React from 'react'

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

interface ExecutiveTemplateProps {
  data: ResumeData
}

export default function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto font-sans text-gray-800">
      {/* 顶部带有强调色的横条 */}
      <div className="h-8 bg-primary-700 mb-6"></div>
      
      {/* 个人信息 */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 uppercase mb-2">{data.personalInfo.name}</h1>
        <p className="text-2xl text-primary-700 mb-4">{data.personalInfo.title}</p>
        <div className="flex flex-wrap gap-x-6 text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center">
              <span className="mr-2">✉️</span>
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center">
              <span className="mr-2">📱</span>
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center">
              <span className="mr-2">📍</span>
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </header>
      
      {/* 个人简介 */}
      {data.personalInfo.summary && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-primary-700 border-b border-primary-300 pb-2 mb-4">
            执行摘要
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}
      
      {/* 工作经验 */}
      {data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-primary-700 border-b border-primary-300 pb-2 mb-6">
            领导经验
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700 italic">{exp.company}</p>
                </div>
                <p className="text-gray-600 text-sm md:text-right mt-1 md:mt-0">
                  {exp.startDate} - {exp.current ? '至今' : exp.endDate}
                </p>
              </div>
              <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}
      
      {/* 教育背景 */}
      {data.education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-primary-700 border-b border-primary-300 pb-2 mb-6">
            教育背景
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                <p className="text-gray-700">{edu.degree}, {edu.field}</p>
                <p className="text-gray-600 text-sm">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* 技能特长 */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-primary-700 border-b border-primary-300 pb-2 mb-6">
            核心能力
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary-600 mr-2"></div>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* 底部带有强调色的横条 */}
      <div className="h-4 bg-primary-700 mt-10"></div>
    </div>
  )
} 