export const getLifePathNumber = (day, month, year) => {
    const sumDigits = (num) => {
        return num.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
    };

    let d = sumDigits(day);
    let m = sumDigits(month);
    let y = sumDigits(year);

    while (d > 9 && d !== 11 && d !== 22) d = sumDigits(d);
    while (m > 9 && m !== 11 && m !== 22) m = sumDigits(m);
    while (y > 9 && y !== 11 && y !== 22) y = sumDigits(y);

    let total = d + m + y;

    // Reduce to single digit or master number
    while (total > 9 && total !== 11 && total !== 22 && total !== 33) {
        total = sumDigits(total);
    }

    return total;
};
