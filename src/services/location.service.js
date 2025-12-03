/**
 * Service for Vietnam Administrative Units API (Updated after merger 2025)
 * API Documentation: https://production.cas.so/address-kit/2025-07-01/
 */
const API_BASE_URL = 'https://production.cas.so/address-kit/2025-07-01';

export const LocationService = {
    // Get all provinces (34 provinces after merger)
    getProvinces: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/provinces`);
            if (!response.ok) throw new Error('Failed to fetch provinces');
            const data = await response.json();
            // Transform to match expected format
            return data.provinces.map(p => ({
                code: parseInt(p.code),
                name: p.name,
                administrativeLevel: p.administrativeLevel,
                decree: p.decree
            }));
        } catch (error) {
            console.error('Error fetching provinces:', error);
            throw error;
        }
    },

    // Get districts by province code
    // Note: New API may not have districts endpoint, so we extract from communes
    getDistrictsByProvince: async (provinceCode) => {
        try {
            // Format province code with leading zero if needed
            const formattedCode = provinceCode.toString().padStart(2, '0');
            
            // Try districts endpoint first
            try {
                const response = await fetch(`${API_BASE_URL}/provinces/${formattedCode}/districts`);
                if (response.ok) {
                    const data = await response.json();
                    return (data.districts || []).map(d => ({
                        code: parseInt(d.code),
                        name: d.name,
                        administrativeLevel: d.administrativeLevel,
                        provinceCode: parseInt(d.provinceCode),
                        provinceName: d.provinceName
                    }));
                }
            } catch (e) {
                // Districts endpoint may not exist, extract from communes
            }
            
            // If districts endpoint doesn't exist, return empty array
            // Districts may not be a separate level in the new API structure
            // User can still select communes directly from province
            return [];
        } catch (error) {
            console.error('Error fetching districts:', error);
            // Return empty array if districts can't be fetched
            return [];
        }
    },

    // Get wards/communes by province code (directly from province)
    getWardsByProvince: async (provinceCode) => {
        try {
            // Format province code with leading zero if needed
            const formattedCode = provinceCode.toString().padStart(2, '0');
            const response = await fetch(`${API_BASE_URL}/provinces/${formattedCode}/communes`);
            if (!response.ok) throw new Error('Failed to fetch communes');
            const data = await response.json();
            // Transform to match expected format
            return (data.communes || []).map(w => ({
                code: parseInt(w.code),
                name: w.name.trim().replace(/\n/g, ' '), // Remove newlines and replace with space
                administrativeLevel: w.administrativeLevel,
                provinceCode: parseInt(w.provinceCode),
                provinceName: w.provinceName
            }));
        } catch (error) {
            console.error('Error fetching communes:', error);
            throw error;
        }
    },

    // Get all communes (for filtering)
    getAllCommunes: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/communes`);
            if (!response.ok) throw new Error('Failed to fetch communes');
            const data = await response.json();
            return (data.communes || []).map(w => ({
                code: parseInt(w.code),
                name: w.name.trim().replace(/\n/g, ' '),
                administrativeLevel: w.administrativeLevel,
                provinceCode: parseInt(w.provinceCode),
                provinceName: w.provinceName
            }));
        } catch (error) {
            console.error('Error fetching all communes:', error);
            throw error;
        }
    },

    // Get wards by district code (if district endpoint exists)
    getWardsByDistrict: async (districtCode) => {
        try {
            // Try to get wards by district, if not available, return empty
            // Note: New API structure may not have district-level endpoint
            // We'll filter communes by district name if needed
            return [];
        } catch (error) {
            console.error('Error fetching wards by district:', error);
            return [];
        }
    },
};

