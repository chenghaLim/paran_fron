import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    if (!question) throw new Error("Question is missing");

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `${question}의 내용이 포함된 책 하나를 추천해줘. 줄거리, 작가 이름, 장르, 출판일은 1990년 이후의 한국 출판 책으로 부탁해.` },
      ],
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return NextResponse.json({ error: 'OpenAI API 호출 실패' }, { status: 500 });
  }
}
