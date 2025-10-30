import { NextResponse } from 'next/server';
import { getConfig } from '@/lib/config';

export async function GET() {
  const config = await getConfig();
  const sites = config.SourceConfig || [];

return NextResponse.json({
  sites: [...],
  parses: [{ name: '默认解析', type: 0, url: 'https://jx.jsonplayer.com/player/?url=' }],
  flags: ['youku', 'qq', 'iqiyi'],
  wallpaper: '',
  spider: '',
  lives: [],
  rules: {}
});

}
