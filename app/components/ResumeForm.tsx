'use client'

import { useState } from 'react'

// 组件接口
interface ResumeFormProps {
  data: ResumeData
  onUpdate: (data: ResumeData) => void
}

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

export default function ResumeForm({ data, onUpdate }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState('personalInfo')
  
  // 处理个人信息更新
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    onUpdate({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [name]: value
      }
    })
  }
  
  // 处理教育信息更新
  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...data.education]
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    }
    
    onUpdate({
      ...data,
      education: newEducation
    })
  }
  
  // 添加教育经历
  const addEducation = () => {
    onUpdate({
      ...data,
      education: [
        ...data.education,
        {
          id: Math.random().toString(36).substring(2, 9),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
        }
      ]
    })
  }
  
  // 删除教育经历
  const removeEducation = (index: number) => {
    const newEducation = [...data.education]
    newEducation.splice(index, 1)
    
    onUpdate({
      ...data,
      education: newEducation
    })
  }
  
  // 处理工作经验更新
  const handleExperienceChange = (index: number, field: string, value: any) => {
    const newExperience = [...data.experience]
    newExperience[index] = {
      ...newExperience[index],
      [field]: value
    }
    
    onUpdate({
      ...data,
      experience: newExperience
    })
  }
  
  // 添加工作经验
  const addExperience = () => {
    onUpdate({
      ...data,
      experience: [
        ...data.experience,
        {
          id: Math.random().toString(36).substring(2, 9),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        }
      ]
    })
  }
  
  // 删除工作经验
  const removeExperience = (index: number) => {
    const newExperience = [...data.experience]
    newExperience.splice(index, 1)
    
    onUpdate({
      ...data,
      experience: newExperience
    })
  }
  
  // 处理技能更新
  const handleSkillChange = (index: number, field: string, value: any) => {
    const newSkills = [...data.skills]
    newSkills[index] = {
      ...newSkills[index],
      [field]: field === 'level' ? parseInt(value) : value
    }
    
    onUpdate({
      ...data,
      skills: newSkills
    })
  }
  
  // 添加技能
  const addSkill = () => {
    onUpdate({
      ...data,
      skills: [
        ...data.skills,
        {
          id: Math.random().toString(36).substring(2, 9),
          name: '',
          level: 3,
        }
      ]
    })
  }
  
  // 删除技能
  const removeSkill = (index: number) => {
    const newSkills = [...data.skills]
    newSkills.splice(index, 1)
    
    onUpdate({
      ...data,
      skills: newSkills
    })
  }
  
  return (
    <div>
      {/* 表单导航 */}
      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 ${activeSection === 'personalInfo' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
          onClick={() => setActiveSection('personalInfo')}
        >
          个人信息
        </button>
        <button
          className={`px-4 py-2 ${activeSection === 'education' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
          onClick={() => setActiveSection('education')}
        >
          教育经历
        </button>
        <button
          className={`px-4 py-2 ${activeSection === 'experience' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
          onClick={() => setActiveSection('experience')}
        >
          工作经验
        </button>
        <button
          className={`px-4 py-2 ${activeSection === 'skills' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
          onClick={() => setActiveSection('skills')}
        >
          技能特长
        </button>
      </div>
      
      {/* 个人信息表单 */}
      {activeSection === 'personalInfo' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">个人信息</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
              <input
                type="text"
                name="name"
                className="input"
                value={data.personalInfo.name}
                onChange={handlePersonalInfoChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">职位头衔</label>
              <input
                type="text"
                name="title"
                className="input"
                value={data.personalInfo.title}
                onChange={handlePersonalInfoChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电子邮件</label>
              <input
                type="email"
                name="email"
                className="input"
                value={data.personalInfo.email}
                onChange={handlePersonalInfoChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
              <input
                type="tel"
                name="phone"
                className="input"
                value={data.personalInfo.phone}
                onChange={handlePersonalInfoChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">所在地</label>
              <input
                type="text"
                name="location"
                className="input"
                value={data.personalInfo.location}
                onChange={handlePersonalInfoChange}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">个人简介</label>
            <textarea
              name="summary"
              className="input h-32"
              value={data.personalInfo.summary}
              onChange={handlePersonalInfoChange}
            />
          </div>
        </div>
      )}
      
      {/* 教育经历表单 */}
      {activeSection === 'education' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">教育经历</h2>
            <button
              className="btn btn-primary text-sm"
              onClick={addEducation}
            >
              添加教育经历
            </button>
          </div>
          
          {data.education.map((edu, index) => (
            <div key={edu.id} className="border rounded-md p-4 mb-4">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">教育经历 #{index + 1}</h3>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => removeEducation(index)}
                >
                  删除
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">学校/机构</label>
                  <input
                    type="text"
                    className="input"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">学位</label>
                  <input
                    type="text"
                    className="input"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">专业</label>
                  <input
                    type="text"
                    className="input"
                    value={edu.field}
                    onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
                    <input
                      type="month"
                      className="input"
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
                    <input
                      type="month"
                      className="input"
                      value={edu.endDate}
                      onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {data.education.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              暂无教育经历。点击"添加教育经历"按钮添加。
            </div>
          )}
        </div>
      )}
      
      {/* 工作经验表单 */}
      {activeSection === 'experience' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">工作经验</h2>
            <button
              className="btn btn-primary text-sm"
              onClick={addExperience}
            >
              添加工作经验
            </button>
          </div>
          
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="border rounded-md p-4 mb-4">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">工作经验 #{index + 1}</h3>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => removeExperience(index)}
                >
                  删除
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">公司/组织</label>
                  <input
                    type="text"
                    className="input"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">职位</label>
                  <input
                    type="text"
                    className="input"
                    value={exp.position}
                    onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
                    <input
                      type="month"
                      className="input"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
                    <input
                      type="month"
                      className="input"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`current-${exp.id}`} className="text-sm font-medium text-gray-700">
                      我目前在此工作
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">工作描述</label>
                <textarea
                  className="input h-32"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
          
          {data.experience.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              暂无工作经验。点击"添加工作经验"按钮添加。
            </div>
          )}
        </div>
      )}
      
      {/* 技能特长表单 */}
      {activeSection === 'skills' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">技能特长</h2>
            <button
              className="btn btn-primary text-sm"
              onClick={addSkill}
            >
              添加技能
            </button>
          </div>
          
          {data.skills.map((skill, index) => (
            <div key={skill.id} className="flex items-center gap-4 border-b pb-4 mb-4">
              <div className="flex-grow">
                <input
                  type="text"
                  className="input"
                  placeholder="技能名称"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                />
              </div>
              
              <div className="w-32">
                <select
                  className="input"
                  value={skill.level}
                  onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                >
                  <option value="1">初级</option>
                  <option value="2">入门</option>
                  <option value="3">中级</option>
                  <option value="4">熟练</option>
                  <option value="5">精通</option>
                </select>
              </div>
              
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => removeSkill(index)}
              >
                删除
              </button>
            </div>
          ))}
          
          {data.skills.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              暂无技能。点击"添加技能"按钮添加。
            </div>
          )}
        </div>
      )}
    </div>
  )
} 