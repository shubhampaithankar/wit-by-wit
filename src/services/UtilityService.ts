export class UtilityService {
    public static calculateResult = (score: any) => {
        score = Number(score)
        switch (true) {
            case score > 1 && score <= 30:
                return { result: 'Failed', grade: 'Poor' }
            case score > 30 && score <= 75:
                return { result: 'Passed', grade: 'Average' }
            case score > 75 && score <= 100:
                return { result: 'Passed', grade: 'Excellent' }
            default:
                return { result: '--', grade: '--' }
        }
    }

    public static getNumberWithOrdinal (n: any) {
        let suffix = ["th", "st", "nd", "rd"]
        if (suffix.some(e => n.endsWith(e))) return n

        n = Number(n)
        let v = n % 100
        return n + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
    }
}