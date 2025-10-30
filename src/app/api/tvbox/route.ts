import { NextRequest, NextResponse } from 'next/server';
import { getConfig } from '@/lib/config';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = (searchParams.get('mode') || '').toLowerCase();

    const config = await getConfig();
    const baseUrl = `${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('host')}`;

    const sourceConfigs = config.SourceConfig || [];
    const enabledSources = sourceConfigs.filter(s => !s.disabled && s.api?.trim());

    const sites = enabledSources.map(source => ({
      key: source.key || source.name,
      name: source.name,
      type: 1,
      api: source.api,
      searchable: 1,
      quickSearch: 1,
      filterable: 1,
      changeable: 1,
      ext: '',
      playerUrl: '',
      hide: 0,
      categories: ["电影", "电视剧", "综艺", "动漫", "纪录片", "短剧"],
      header: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36',
        Connection: 'close'
      },
      timeout: 10000,
      retry: 2
    }));

    const tvboxConfig = {
      spider: '',
      wallpaper: `${baseUrl}/logo.png`,
      sites,
      parses: [
        {
          name: "默认解析",
          type: 0,
          url: "https://jx.jsonplayer.com/player/?url="
        }
      ],
      flags: [
        "youku", "qq", "iqiyi", "qiyi", "letv", "sohu", "tudou", "pptv",
        "mgtv", "wasu", "bilibili", "le", "duoduozy", "renrenmi", "xigua",
        "优酷", "腾讯", "爱奇艺", "奇艺", "乐视", "搜狐", "土豆", "PPTV",
        "芒果", "华数", "哔哩", "1905"
      ],
      lives: [],
      rules: {},
      ads: [],
      doh: []
    };

    return NextResponse.json(tvboxConfig, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('TVBox接口异常:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
