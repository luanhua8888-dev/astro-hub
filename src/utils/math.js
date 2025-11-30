export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export const toRadians = (degrees) => degrees * (Math.PI / 180);

export const toDegrees = (radians) => radians * (180 / Math.PI);
