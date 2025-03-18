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

interface CreativeTemplateProps {
  data: ResumeData
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto font-sans">
      <div className="grid grid-cols-3 gap-6">
        {/* 左侧边栏 */}
        <div className="col-span-1 bg-primary-600 text-white p-6 rounded-l-lg">
          {/* 个人信息 */}
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold mb-2">{data.personalInfo.name}</h1>
            <p className="text-lg opacity-90 mb-4">{data.personalInfo.title}</p>
            <div className="space-y-2 text-sm">
              <p>{data.personalInfo.email}</p>
              <p>{data.personalInfo.phone}</p>
              <p>{data.personalInfo.location}</p>
            </div>
          </div>
          
          {/* 技能特长 */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold border-b border-white/30 pb-2 mb-4">技能特长</h2>
              <div className="space-y-3">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span>{['初级', '入门', '中级', '熟练', '精通'][skill.level - 1]}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-1.5">
                      <div 
                        className="bg-white h-1.5 rounded-full" 
                        style={{ width: `${skill.level * 20}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 教育背景 */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold border-b border-white/30 pb-2 mb-4">教育背景</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h3 className="font-bold">{edu.institution}</h3>
                  <p className="text-sm opacity-90">{edu.degree} • {edu.field}</p>
                  <p className="text-sm opacity-75">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 右侧内容 */}
        <div className="col-span-2 p-6">
          {/* 个人简介 */}
          {data.personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary-600 mb-4">个人简介</h2>
              <div className="text-gray-700 leading-relaxed">
                {data.personalInfo.summary}
              </div>
            </div>
          )}
          
          {/* 工作经验 */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-primary-600 mb-6">专业经验</h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-primary-300">
                    <div className="absolute top-0 left-0 w-3 h-3 bg-primary-500 rounded-full -translate-x-[7px]"></div>
                    <div className="mb-1">
                      <h3 className="font-bold text-lg">{exp.position}</h3>
                      <p className="text-gray-600">
                        {exp.company} | {exp.startDate} - {exp.current ? '至今' : exp.endDate}
                      </p>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 