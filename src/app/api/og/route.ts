import ogs from 'open-graph-scraper';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    const { result } = await ogs({ url });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error - fetching metadata:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metadata' },
      { status: 500 }
    );
  }
}
