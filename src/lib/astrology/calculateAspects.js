export const calculateAspects = (planets) => {
    const aspects = [];
    const planetNames = Object.keys(planets);

    const aspectTypes = [
        { name: "Conjunction", angle: 0, orb: 8 },
        { name: "Opposition", angle: 180, orb: 8 },
        { name: "Trine", angle: 120, orb: 8 },
        { name: "Square", angle: 90, orb: 8 },
        { name: "Sextile", angle: 60, orb: 6 },
    ];

    for (let i = 0; i < planetNames.length; i++) {
        for (let j = i + 1; j < planetNames.length; j++) {
            const p1 = planets[planetNames[i]];
            const p2 = planets[planetNames[j]];

            const diff = Math.abs(p1.absoluteDegree - p2.absoluteDegree);
            const angle = Math.min(diff, 360 - diff);

            for (const aspect of aspectTypes) {
                if (Math.abs(angle - aspect.angle) <= aspect.orb) {
                    aspects.push({
                        planet1: planetNames[i],
                        planet2: planetNames[j],
                        type: aspect.name,
                        angle: angle.toFixed(2),
                    });
                }
            }
        }
    }

    return aspects;
};
