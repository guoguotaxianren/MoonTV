import { NextResponse } from 'next/server';
import { getConfig } from '@/lib/config';

export async function GET() {
  const config = await getConfig();
  const rawSources = config.SourceConfig || [];

  // 构造 TVBox 兼容格式
  const sites = rawSources.map((item: any) => ({
    key: item.key,
    name: item.name,
    type: 1,
    api: item.api,
    searchable: 1,
    quickSearch: 1,
    filterable: 1
  }));

  return NextResponse.json({ sites });
}
