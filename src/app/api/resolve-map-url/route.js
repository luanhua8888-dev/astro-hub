import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        // Follow redirects to get final URL
        const response = await fetch(url, {
            method: 'HEAD',
            redirect: 'follow',
        });

        const finalUrl = response.url || url;
        
        // Extract coordinates from URL
        const patterns = [
            /@(-?\d+\.?\d*),(-?\d+\.?\d*),?\d*z?/,
            /[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/,
            /\/place\/[^@]+@(-?\d+\.?\d*),(-?\d+\.?\d*)/,
        ];

        for (const pattern of patterns) {
            const match = finalUrl.match(pattern);
            if (match) {
                return NextResponse.json({
                    latitude: parseFloat(match[1]),
                    longitude: parseFloat(match[2]),
                    finalUrl,
                });
            }
        }

        return NextResponse.json({ error: 'Could not extract coordinates' }, { status: 400 });
    } catch (error) {
        console.error('Error resolving map URL:', error);
        return NextResponse.json({ error: 'Failed to resolve URL' }, { status: 500 });
    }
}

