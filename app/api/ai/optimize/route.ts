import OpenAI from 'openai'
import { NextResponse } from 'next/server'

// 获取API密钥，优先使用环境变量
const getApiKey = () => {
  const apiKey = process.env.OPENAI_API_KEY || ''
  if (!apiKey) {
    console.warn('警告: 未设置OPENAI_API_KEY环境变量')
  }
  return apiKey
}

// 初始化OpenAI客户端
let openaiClient: OpenAI | null = null
try {
  openaiClient = new OpenAI({
    apiKey: getApiKey(),
    timeout: 30000, // 30秒超时
    maxRetries: 2, // 最多重试2次
  })
} catch (error) {
  console.error('初始化OpenAI客户端失败:', error)
}

// AI模型选择
const AI_MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo'

// 创建简历优化提示
const createPrompt = (resumeText: string, jobTitle: string, section: string) => {
  switch (section) {
    case 'summary':
      return `
        请优化以下个人简介，使其更适合申请"${jobTitle}"职位。
        使用专业且有力的表述，突出与该职位相关的优势和专业技能。
        保持简洁明了，不超过150字。
        
        个人简介：
        ${resumeText}
      `
    case 'experience':
      return `
        请优化以下工作经验描述，使其更适合申请"${jobTitle}"职位。
        使用行动导向的动词开头，强调具体成就和量化结果。
        突出与"${jobTitle}"相关的责任和项目。
        每条经验描述简洁有力，具有针对性。
        
        工作经验：
        ${resumeText}
      `
    case 'skills':
      return `
        请基于以下技能列表，推荐更适合"${jobTitle}"职位的技能组合。
        添加该职位最需要的关键技能，并按重要性排序。
        结果应该是一个逗号分隔的技能列表，包含8-12个技能。
        
        当前技能：
        ${resumeText}
      `
    default:
      return `
        请帮我优化以下简历内容，使其更适合申请"${jobTitle}"职位。
        增强关键技能和经验的描述，使用更有力的动词和具体的成就。
        保持专业性，突出与该职位相关的技能和经验。
        修改后的简历应该简洁、有影响力，并突出候选人的优势。
        
        简历内容：
        ${resumeText}
      `
  }
}

export async function POST(request: Request) {
  // 确保OpenAI客户端已初始化
  if (!openaiClient) {
    return NextResponse.json(
      { error: 'AI服务暂时不可用，请稍后再试' },
      { status: 503 }
    )
  }

  try {
    // 解析请求体
    const body = await request.json()
    const { resumeText, jobTitle, section = 'all' } = body
    
    // 验证输入
    if (!resumeText) {
      return NextResponse.json(
        { error: '简历内容不能为空' },
        { status: 400 }
      )
    }
    
    if (!jobTitle) {
      return NextResponse.json(
        { error: '目标职位不能为空' },
        { status: 400 }
      )
    }
    
    // 创建提示
    const prompt = createPrompt(resumeText, jobTitle, section)
    
    // 调用OpenAI API
    const startTime = Date.now()
    const response = await openaiClient.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: 'system',
          content: '你是一位专业的简历优化顾问，擅长改进简历内容，使其更具吸引力和针对性。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })
    const endTime = Date.now()
    
    // 记录API调用时间
    console.log(`OpenAI API调用完成，耗时: ${endTime - startTime}ms`)
    
    // 检查响应
    if (!response.choices || response.choices.length === 0) {
      console.error('OpenAI API返回空结果', response)
      return NextResponse.json(
        { error: '无法生成优化内容，请稍后再试' },
        { status: 500 }
      )
    }
    
    const optimizedText = response.choices[0]?.message?.content || '无法生成优化内容，请稍后再试。'
    
    return NextResponse.json({ 
      optimizedText,
      section,
      model: AI_MODEL,
      processingTime: endTime - startTime
    })
  } catch (error: any) {
    console.error('AI优化失败:', error)
    
    // 处理OpenAI API错误
    if (error.response) {
      // OpenAI API返回的错误
      return NextResponse.json(
        { error: `AI服务错误: ${error.response.status} - ${error.response.data?.error?.message || '未知错误'}` },
        { status: error.response.status }
      )
    } else if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      // 超时错误
      return NextResponse.json(
        { error: 'AI服务响应超时，请稍后再试' },
        { status: 504 }
      )
    } 
    
    // 其他错误
    return NextResponse.json(
      { error: '优化过程中出现错误，请稍后再试' },
      { status: 500 }
    )
  }
} 