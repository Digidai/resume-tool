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

interface ProfessionalTemplateProps {
  data: ResumeData
}

export default function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto font-sans text-gray-800">
      {/* 个人信息 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name}</h1>
        <p className="text-xl text-gray-600 mb-2">{data.personalInfo.title}</p>
        <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
          <span>{data.personalInfo.email}</span>
          <span>|</span>
          <span>{data.personalInfo.phone}</span>
          <span>|</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </div>
      
      {/* 个人简介 */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">个人简介</h2>
          <p className="text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}
      
      {/* 工作经验 */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">工作经验</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between mb-1">
                <h3 className="font-bold">{exp.company}</h3>
                <span className="text-gray-600">
                  {exp.startDate} - {exp.current ? '至今' : exp.endDate}
                </span>
              </div>
              <p className="text-gray-700 font-semibold mb-2">{exp.position}</p>
              <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* 教育背景 */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">教育背景</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between mb-1">
                <h3 className="font-bold">{edu.institution}</h3>
                <span className="text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="text-gray-700">
                {edu.degree} • {edu.field}
              </p>
            </div>
          ))}
        </div>
      )}
      
      {/* 技能特长 */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">技能特长</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full mx-0.5 ${i < skill.level ? 'bg-gray-700' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 