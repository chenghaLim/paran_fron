import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '',
});

export async function POST(req: Request) {
  const { question } = await req.json();
  
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' }, 
        { role: 'user', content: question+'의 내용이 포함된 책 하나를 추천해줘 내용은 줄거리,작가이름, 장르가 될 수 있고, 출판일은 1990년 이후고 책은 한국에 나온걸로 부탁해' }
      ],
      model: 'gpt-3.5-turbo',
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return NextResponse.json({ error: 'OpenAI API 호출 실패' }, { status: 500 });
  }
}
