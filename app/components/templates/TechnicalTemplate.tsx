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

interface TechnicalTemplateProps {
  data: ResumeData
}

export default function TechnicalTemplate({ data }: TechnicalTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto font-sans text-gray-800">
      {/* 个人信息区 */}
      <header className="mb-6 pb-6 border-b-2 border-gray-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.personalInfo.name}</h1>
            <p className="text-xl text-primary-600">{data.personalInfo.title}</p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-sm">{data.personalInfo.email}</p>
            <p className="text-sm">{data.personalInfo.phone}</p>
            <p className="text-sm">{data.personalInfo.location}</p>
          </div>
        </div>
      </header>
      
      {/* 核心技能 */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-primary-700 mb-3 uppercase tracking-wider">技术技能</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {data.skills.map((skill) => (
              <div key={skill.id} className="bg-gray-100 rounded p-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <div className="bg-gray-200 h-2 w-16 rounded-full">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${skill.level * 20}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* 个人简介 */}
      {data.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-primary-700 mb-3 uppercase tracking-wider">专业概要</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}
      
      {/* 工作经验 */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-primary-700 mb-3 uppercase tracking-wider">专业经验</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="pb-4">
                <div className="flex flex-col md:flex-row justify-between mb-1">
                  <h3 className="font-bold text-gray-900">
                    {exp.position} | <span className="font-medium">{exp.company}</span>
                  </h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? '至今' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* 教育背景 */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-primary-700 mb-3 uppercase tracking-wider">教育背景</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                  <p className="text-gray-700">
                    {edu.degree}, {edu.field}
                  </p>
                </div>
                <span className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
      
      <footer className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
        <p>技术专精型简历模板</p>
      </footer>
    </div>
  )
} 