import { NextResponse } from 'next/server';

/**
 * API route để proxy request đến AZTRO API
 * Tránh CORS issue khi gọi từ client-side
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const sign = searchParams.get('sign');
        const day = searchParams.get('day') || 'today';

        if (!sign) {
            return NextResponse.json(
                { error: 'Sign parameter is required' },
                { status: 400 }
            );
        }

        // Gọi AZTRO API từ server-side (không có CORS issue)
        const response = await fetch(
            `https://aztro.sameerkumar.website/?sign=${sign.toLowerCase()}&day=${day}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            // Log chi tiết lỗi nhưng không throw để có thể fallback
            const errorText = await response.text().catch(() => 'Unknown error');
            console.error(`AZTRO API error ${response.status}:`, errorText);
            return NextResponse.json(
                { 
                    error: 'AZTRO API unavailable', 
                    message: `Service returned ${response.status}`,
                    status: response.status 
                },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json({
            sign: sign,
            date: data.current_date,
            prediction: data.description,
            luckyNumber: parseInt(data.lucky_number) || null,
            luckyTime: data.lucky_time,
            mood: data.mood,
            color: data.color,
            compatibility: data.compatibility,
            dateRange: data.date_range,
        });
    } catch (error) {
        console.error('Error fetching horoscope from API:', error);
        return NextResponse.json(
            { error: 'Failed to fetch horoscope', message: error.message },
            { status: 500 }
        );
    }
}

