import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    spider: "",
    wallpaper: "",
    sites: [
      {
        key: "aqyzy",
        name: "🎬爱奇艺",
        type: 1,
        api: "https://iqiyizyapi.com/api.php/provide/vod",
        searchable: 1,
        quickSearch: 1,
        filterable: 1
      }
    ],
    parses: [
      {
        name: "默认解析",
        type: 0,
        url: "https://jx.jsonplayer.com/player/?url="
      }
    ],
    flags: ["youku", "qq", "iqiyi"],
    lives: [],
    rules: {}
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
