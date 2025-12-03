import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import zodiacData from '@/data/zodiac.json';

/**
 * API route để lấy thông tin chi tiết về cung hoàng đạo
 * Ưu tiên: Database → External API → Local JSON
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const sign = searchParams.get('sign');

        if (!sign) {
            return NextResponse.json(
                { error: 'Sign parameter is required' },
                { status: 400 }
            );
        }

        // Normalize sign name (capitalize first letter)
        const normalizedSign = sign.charAt(0).toUpperCase() + sign.slice(1);

        // Option 1: Lấy từ Database (Supabase) - Ưu tiên cao nhất
        const dbData = await getFromDatabase(normalizedSign);
        if (dbData) {
            // Transform database data to match expected format
            return NextResponse.json(transformDatabaseData(dbData));
        }

        // Option 2: Có thể fetch từ external API
        // const externalData = await fetchFromExternalAPI(normalizedSign);
        // if (externalData) return NextResponse.json(externalData);

        // Option 3: Fallback về local JSON data
        const localData = zodiacData[normalizedSign];
        if (localData) {
            return NextResponse.json(localData);
        }

        return NextResponse.json(
            { error: 'Sign not found' },
            { status: 404 }
        );
    } catch (error) {
        console.error('Error fetching zodiac details:', error);
        return NextResponse.json(
            { error: 'Failed to fetch zodiac details', message: error.message },
            { status: 500 }
        );
    }
}

/**
 * Lấy dữ liệu từ Supabase database
 */
async function getFromDatabase(sign) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || supabaseUrl.includes('placeholder') || 
            !supabaseKey || supabaseKey.includes('placeholder')) {
            // Supabase chưa được cấu hình, skip database lookup
            return null;
        }

        const supabase = createClient(supabaseUrl, supabaseKey);
        
        const { data, error } = await supabase
            .from('zodiac_details')
            .select('*')
            .eq('sign', sign)
            .single();

        if (error) {
            // Table might not exist yet, that's okay
            if (error.code === 'PGRST116' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
                console.warn(`Table zodiac_details might not exist yet. Run migration: sql/create-zodiac-details-table.sql`);
                return null;
            }
            console.warn('Database query error:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.warn('Error connecting to database:', error.message);
        return null;
    }
}

/**
 * Transform database data to match expected format
 */
function transformDatabaseData(dbData) {
    return {
        element: dbData.element,
        quality: dbData.quality,
        ruler: dbData.ruler,
        traits: dbData.traits || [],
        meaning: dbData.meaning,
        mythology: dbData.mythology,
        personality: dbData.personality || {},
        compatibility: dbData.compatibility || {},
        career: dbData.career,
        love: dbData.love,
        symbol: dbData.symbol,
        colors: dbData.colors || [],
        gemstone: dbData.gemstone,
        luckyNumbers: dbData.lucky_numbers || [],
        luckyDay: dbData.lucky_day,
    };
}

/**
 * Helper function để fetch từ external API (có thể mở rộng sau)
 */
async function fetchFromExternalAPI(sign) {
    // Có thể tích hợp với các API như:
    // - AstrologyAPI
    // - Horoscope API
    // - Custom API endpoint
    
    // Example:
    // try {
    //     const response = await fetch(`https://api.example.com/zodiac/${sign}`, {
    //         headers: {
    //             'Authorization': `Bearer ${process.env.API_KEY}`
    //         }
    //     });
    //     if (response.ok) {
    //         return await response.json();
    //     }
    // } catch (error) {
    //     console.error('External API error:', error);
    // }
    
    return null;
}

