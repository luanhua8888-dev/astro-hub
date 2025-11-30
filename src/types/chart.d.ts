export interface PlanetPosition {
    sign: string;
    degree: number;
    absoluteDegree: number;
}

export interface BirthChart {
    positions: Record<string, PlanetPosition>;
    aspects: Aspect[];
}

export interface Aspect {
    planet1: string;
    planet2: string;
    type: string;
    angle: number;
}
