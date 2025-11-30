import { NextResponse } from 'next/server';

export async function POST(request) {
    // Mock auth handler
    return NextResponse.json({ message: "Auth route" });
}
