/**
 * Parse Google Maps URL to extract latitude and longitude
 * Supports multiple Google Maps URL formats:
 * - https://www.google.com/maps/@lat,lng,zoom
 * - https://maps.google.com/?q=lat,lng
 * - https://maps.app.goo.gl/... (short URL - requires fetch)
 * - https://www.google.com/maps/place/.../@lat,lng,zoom
 */
export const parseGoogleMapsUrl = async (url) => {
    if (!url || typeof url !== 'string') {
        return null;
    }

    try {
        // Handle short URLs (maps.app.goo.gl) - use API route to resolve
        if (url.includes('maps.app.goo.gl') || url.includes('goo.gl/maps')) {
            try {
                const response = await fetch(`/api/resolve-map-url?url=${encodeURIComponent(url)}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.latitude && data.longitude) {
                        return {
                            latitude: data.latitude,
                            longitude: data.longitude
                        };
                    }
                }
                return null;
            } catch (e) {
                console.warn('Could not resolve short URL:', e);
                return null;
            }
        }

        // Pattern 1: @lat,lng,zoom
        const pattern1 = /@(-?\d+\.?\d*),(-?\d+\.?\d*),?\d*z?/;
        const match1 = url.match(pattern1);
        if (match1) {
            return {
                latitude: parseFloat(match1[1]),
                longitude: parseFloat(match1[2])
            };
        }

        // Pattern 2: ?q=lat,lng
        const pattern2 = /[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
        const match2 = url.match(pattern2);
        if (match2) {
            return {
                latitude: parseFloat(match2[1]),
                longitude: parseFloat(match2[2])
            };
        }

        // Pattern 3: /place/.../@lat,lng
        const pattern3 = /\/place\/[^@]+@(-?\d+\.?\d*),(-?\d+\.?\d*)/;
        const match3 = url.match(pattern3);
        if (match3) {
            return {
                latitude: parseFloat(match3[1]),
                longitude: parseFloat(match3[2])
            };
        }

        return null;
    } catch (error) {
        console.error('Error parsing Google Maps URL:', error);
        return null;
    }
};

