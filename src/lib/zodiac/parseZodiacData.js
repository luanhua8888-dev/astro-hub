export const parseZodiacData = (sign, data) => {
    if (!data || !data[sign]) return null;
    return data[sign];
};
