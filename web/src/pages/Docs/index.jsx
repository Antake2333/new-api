import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Typography, Tag } from '@douyinfe/semi-ui';
import {
  IconCopy,
  IconFile,
  IconKey,
  IconLink,
  IconPlay,
  IconTerminal,
} from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import { copy, showSuccess } from '../../helpers';
import { API_ENDPOINTS } from '../../constants/common.constant';

const { Title, Paragraph, Text } = Typography;

const codeBlockClassName =
  'rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 p-4 overflow-x-auto text-sm leading-6 shadow-inner';

const Docs = () => {
  const { t } = useTranslation();
  const origin =
    typeof window !== 'undefined' ? window.location.origin : '{YOUR_DOMAIN}';
  const baseUrl = origin;

  const endpointExamples = useMemo(
    () =>
      API_ENDPOINTS.slice(0, 6).map((endpoint) => ({
        endpoint,
        full: `${baseUrl}${endpoint}`,
      })),
    [baseUrl],
  );

  const handleCopy = async (value, successText) => {
    const ok = await copy(value);
    if (ok) {
      showSuccess(successText);
    }
  };

  const curlExample = `curl ${baseUrl}/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-your-token" \\
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      {
        "role": "user",
        "content": "你好，帮我返回一段测试文本"
      }
    ]
  }'`;

  const openaiExample = `from openai import OpenAI

client = OpenAI(
    api_key="sk-your-token",
    base_url="${baseUrl}/v1"
)

resp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "你好"}
    ]
)

print(resp.choices[0].message.content)`;

  return (
    <div className='w-full overflow-x-hidden'>
      <div className='w-full border-b border-semi-color-border min-h-[420px] relative overflow-hidden'>
        <div className='blur-ball blur-ball-indigo' />
        <div className='blur-ball blur-ball-teal' />
        <div className='max-w-6xl mx-auto px-4 md:px-6 pt-28 pb-16'>
          <Tag color='cyan' shape='circle' size='large'>
            Orcas Ai Api
          </Tag>
          <Title heading={1} className='!mt-5 !mb-4'>
            {t('接入文档')}
          </Title>
          <Paragraph className='!text-lg !text-semi-color-text-1 !max-w-3xl'>
            {t(
              '这是一份面向使用方的接入说明。当前站点不仅支持 OpenAI 协议，也支持 Gemini、Claude 以及其他常见大模型中转协议。你只需要准备令牌、确认所用协议、替换对应 Base URL，并按接口规范发起请求。',
            )}
          </Paragraph>
          <div className='flex flex-wrap gap-3 mt-8'>
            <Button
              theme='solid'
              type='primary'
              icon={<IconKey />}
              className='!rounded-3xl'
              onClick={() => window.location.assign('/console/token')}
            >
              {t('去获取密钥')}
            </Button>
            <Button
              icon={<IconCopy />}
              className='!rounded-3xl'
              onClick={() => handleCopy(`${baseUrl}/v1`, t('已复制 Base URL'))}
            >
              {t('复制 Base URL')}
            </Button>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14 space-y-6'>
        <Card className='!rounded-3xl'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='rounded-2xl bg-semi-color-fill-0 p-5'>
              <div className='flex items-center gap-2 mb-3'>
                <IconLink />
                <Text strong>{t('Base URL')}</Text>
              </div>
              <Paragraph className='!mb-3'>{baseUrl}/v1</Paragraph>
              <Button
                size='small'
                icon={<IconCopy />}
                onClick={() => handleCopy(`${baseUrl}/v1`, t('已复制 Base URL'))}
              >
                {t('复制')}
              </Button>
            </div>

            <div className='rounded-2xl bg-semi-color-fill-0 p-5'>
              <div className='flex items-center gap-2 mb-3'>
                <IconKey />
                <Text strong>{t('鉴权方式')}</Text>
              </div>
              <Paragraph className='!mb-0'>
                Authorization: Bearer sk-your-token
              </Paragraph>
            </div>

            <div className='rounded-2xl bg-semi-color-fill-0 p-5'>
              <div className='flex items-center gap-2 mb-3'>
                <IconFile />
                <Text strong>{t('常用入口')}</Text>
              </div>
              <Paragraph className='!mb-0'>
                {t(
                  '支持 OpenAI、Gemini、Claude 等协议，以及聊天、Responses、Embeddings、Images、Audio 等常见能力',
                )}
              </Paragraph>
            </div>
          </div>
        </Card>

        <Card className='!rounded-3xl' bodyStyle={{ padding: 28 }}>
          <Title heading={3}>{t('接入步骤')}</Title>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
            <div className='rounded-2xl border border-semi-color-border p-5'>
              <Text strong>1. {t('获取 API 密钥')}</Text>
              <Paragraph className='!mt-3 !mb-0'>
                {t(
                  '登录控制台后创建令牌。接入方拿到令牌后，就可以像对接 OpenAI 一样发起请求。',
                )}
              </Paragraph>
            </div>
            <div className='rounded-2xl border border-semi-color-border p-5'>
              <Text strong>2. {t('替换客户端 Base URL')}</Text>
              <Paragraph className='!mt-3 !mb-0'>
                {t(
                  '把 SDK 或业务代码里的基础地址改为当前站点的 /v1，例如上面的 Base URL。',
                )}
              </Paragraph>
            </div>
            <div className='rounded-2xl border border-semi-color-border p-5'>
              <Text strong>3. {t('请求时带上 Bearer Token')}</Text>
              <Paragraph className='!mt-3 !mb-0'>
                {t(
                  '请求头使用 Authorization: Bearer YOUR_TOKEN，不需要额外改协议。',
                )}
              </Paragraph>
            </div>
            <div className='rounded-2xl border border-semi-color-border p-5'>
              <Text strong>4. {t('按模型名称发起调用')}</Text>
              <Paragraph className='!mt-3 !mb-0'>
                {t(
                  '模型名以控制台配置为准。调用方只需要传 model 字段，网关会把请求路由到对应上游。',
                )}
              </Paragraph>
            </div>
          </div>
        </Card>

        <Card className='!rounded-3xl' bodyStyle={{ padding: 28 }}>
          <Title heading={3}>{t('接口地址')}</Title>
          <Paragraph className='!text-semi-color-text-1'>
            {t(
              '以下是当前站点可直接使用的常见接口地址。不同客户端可以按自身协议选择 OpenAI、Gemini 或 Claude 风格接口；多数 OpenAI SDK 只需要把 Base URL 改为本域名 /v1 即可。',
            )}
          </Paragraph>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-5'>
            {endpointExamples.map((item) => (
              <div
                key={item.endpoint}
                className='rounded-2xl border border-semi-color-border p-4 flex items-center justify-between gap-3'
              >
                <div className='min-w-0'>
                  <Text strong>{item.endpoint}</Text>
                  <Paragraph
                    className='!mb-0 !mt-1 !text-semi-color-text-1'
                    ellipsis={{ rows: 1, showTooltip: true }}
                  >
                    {item.full}
                  </Paragraph>
                </div>
                <Button
                  size='small'
                  icon={<IconCopy />}
                  onClick={() => handleCopy(item.full, t('已复制接口地址'))}
                >
                  {t('复制')}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className='!rounded-3xl' bodyStyle={{ padding: 28 }}>
          <Title heading={3}>{t('请求示例')}</Title>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 mt-5'>
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <IconTerminal />
                <Text strong>cURL</Text>
              </div>
              <pre className={codeBlockClassName}>
                <code>{curlExample}</code>
              </pre>
            </div>
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <IconPlay />
                <Text strong>Python OpenAI SDK</Text>
              </div>
              <pre className={codeBlockClassName}>
                <code>{openaiExample}</code>
              </pre>
            </div>
          </div>
        </Card>

        <Card className='!rounded-3xl' bodyStyle={{ padding: 28 }}>
          <Title heading={3}>{t('给使用方的说明模板')}</Title>
          <Paragraph className='!text-semi-color-text-1'>
            {t('如果你要把这套 API 提供给第三方使用，可以直接把下面这段说明发给对方。')}
          </Paragraph>
          <pre className={`${codeBlockClassName} mt-4`}>
            <code>{`1. Base URL: ${baseUrl}/v1
2. API Key: 由平台分配
3. 鉴权方式: Authorization: Bearer YOUR_TOKEN
4. 支持协议: OpenAI / Gemini / Claude
5. 常用接口: Chat Completions / Responses / Embeddings / Images / Audio
6. 模型名称: 以平台提供的模型列表为准
7. 如果你原本使用 OpenAI SDK，只需要把 base_url 改成这里的地址即可`}</code>
          </pre>
        </Card>

        <Card className='!rounded-3xl' bodyStyle={{ padding: 28 }}>
          <Title heading={3}>{t('下一步')}</Title>
          <div className='flex flex-wrap gap-3 mt-4'>
            <Link to='/console/token'>
              <Button theme='solid' type='primary' className='!rounded-3xl'>
                {t('去创建令牌')}
              </Button>
            </Link>
            <Link to='/about'>
              <Button className='!rounded-3xl'>{t('查看关于页面')}</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Docs;
