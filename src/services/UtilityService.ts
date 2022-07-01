export class UtilityService {
    public static calculateResult = (score: number) => {
        score = Number(score)
        switch (true) {
            case score < 30:
                return { result: 'Failed', grade: 'Poor' }
            case score > 30 && score < 75:
                return { result: 'Passed', grade: 'Average' }
            case score > 75 && score < 100:
                return { result: 'Passed', grade: 'Excellent' }
            default:
                return { result: '--', grade: '--' }
        }
    }
}