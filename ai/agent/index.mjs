import url from 'node:url';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../../.env.ai') });

/**
 * --- Tools (Skills) Implementation ---
 * 模拟运营看板背后的核心能力（工具）
 */

// 工具 1: 获取实时运营数据
const fetchOpsMetrics = async () => {
  console.log('>>> [执行工具: fetch_ops_metrics] 正在从监控系统调取实时数据...');
  // 模拟返回数据
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    active_users: 1250,
    error_rate: '0.05%',
    avg_latency: '120ms',
    revenue_today: '$5,400',
    system_status: 'healthy',
    region: '东南亚 (Southeast Asia)'
  });
};

// 工具 2: 发送运营告警
const sendOpsAlert = async ({ message, severity }) => {
  console.log(`>>> [执行工具: send_ops_alert] [级别: ${severity}] 告警内容: ${message}`);
  // 模拟发送成功
  return JSON.stringify({ success: true, notification_id: 'alert-' + Math.random().toString(36).substr(2, 9) });
};

// 工具定义 (JSON Schema)
const tools = [
  {
    type: 'function',
    function: {
      name: 'fetch_ops_metrics',
      description: '获取当前的智能运营看板核心指标数据，包括活跃用户、错误率、延迟等。',
      parameters: { type: 'object', properties: {} }
    }
  },
  {
    type: 'function',
    function: {
      name: 'send_ops_alert',
      description: '当监测到指标异常时，向运营团队发送系统告警通知。',
      parameters: {
        type: 'object',
        properties: {
          message: { type: 'string', description: '告警的详细描述信息' },
          severity: { type: 'string', enum: ['info', 'warning', 'critical'], description: '告警的严重程度' }
        },
        required: ['message', 'severity']
      }
    }
  }
];

const availableFunctions = {
  fetch_ops_metrics: fetchOpsMetrics,
  send_ops_alert: sendOpsAlert,
};

/**
 * --- Agent Orchestration (Skills Showcase) ---
 * 智能体编排逻辑，展示如何串联 Tools 形成 Skill
 */

const runOpsAgent = async (userInput) => {
  if (!process.env.AK) {
    throw new Error('未检测到环境变量 AK (API Key)，请在 .env.ai 中配置。');
  }

  let messages = [
    {
      role: 'system',
      content: `你是一个专业的智能运营助手。
你的核心能力（Skills）包括：
1. 监控洞察：通过获取实时指标分析业务健康度。
2. 自动化执行：根据分析结果触发告警或任务。

请始终以专业、简洁的中文回答用户。`
    },
    { role: 'user', content: userInput }
  ];

  // 迭代对话，直到模型给出最终回答
  while (true) {
    const response = await fetch('https://ark-ap-southeast.byteintl.net/api/v3/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.AK}`,
      },
      body: JSON.stringify({
        model: 'ep-20250915180527-jlrl5', // 确保该 Endpoint 支持 Function Calling
        messages,
        tools,
        tool_choice: 'auto',
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('API 响应错误:', JSON.stringify(data.error, null, 2));
      return '抱歉，API 调用出现异常。';
    }

    const message = data.choices[0].message;
    messages.push(message);

    // 如果模型决定调用工具
    if (message.tool_calls) {
      for (const toolCall of message.tool_calls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);
        
        // 执行对应的本地函数
        const functionResponse = await availableFunctions[functionName](functionArgs);

        // 将工具执行结果存入对话历史
        messages.push({
          tool_call_id: toolCall.id,
          role: 'tool',
          name: functionName,
          content: functionResponse,
        });
      }
      // 继续循环，让模型根据工具结果生成回复
    } else {
      // 模型给出了最终文字回复
      return message.content;
    }
  }
};

/**
 * --- 运行演示 ---
 */
const demo = async () => {
  console.log('=======================================');
  console.log('   🚀 智能运营看板 Agent 演示 (Tools & Skills)');
  console.log('=======================================');
  
  const prompt = '请检查当前的系统指标。如果指标正常，请生成一份看板摘要；如果发现异常（如错误率高于0.1%），请发送告警。';
  console.log(`\n[用户指令]: ${prompt}\n`);

  try {
    const finalResult = await runOpsAgent(prompt);
    console.log('\n[助手最终回复]:');
    console.log('---------------------------------------');
    console.log(finalResult);
    console.log('---------------------------------------');
  } catch (error) {
    console.error('运行失败:', error.message);
  }
};

demo();
