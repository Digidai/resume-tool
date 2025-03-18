import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">关于我们的简历工具</h1>
        
        <div className="prose lg:prose-xl">
          <p>
            我们的简历优化工具旨在帮助求职者快速创建专业、有吸引力的简历，提高获得面试机会的几率。
          </p>
          
          <h2>我们的特色</h2>
          <ul>
            <li>
              <strong>专业设计的模板</strong> - 提供多种精心设计的简历模板，适合不同行业和职位
            </li>
            <li>
              <strong>AI内容优化</strong> - 利用先进的AI技术，针对特定职位优化简历内容
            </li>
            <li>
              <strong>用户友好的界面</strong> - 直观的编辑器，让简历创建过程变得简单
            </li>
            <li>
              <strong>导出为PDF</strong> - 轻松导出高质量的PDF文件，随时发送给招聘方
            </li>
          </ul>
          
          <h2>如何使用</h2>
          <ol>
            <li>选择一个适合你职业目标的简历模板</li>
            <li>填写你的个人信息、教育背景、工作经验和技能</li>
            <li>使用AI优化功能增强你的简历内容</li>
            <li>预览并导出你的简历</li>
          </ol>
          
          <p>
            无论你是刚刚开始职业生涯，还是寻求职业转型，我们的工具都能帮助你创建一份令人印象深刻的简历。
          </p>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="btn btn-primary"
          >
            开始创建你的简历
          </Link>
        </div>
      </div>
    </main>
  )
} 