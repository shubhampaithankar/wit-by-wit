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

    // public static nth(n: string){
    //     const suffix = [,'st','nd','rd']
    //     return !!suffix.some((e: any) => n.endsWith(e)) ? suffix[Number(n)/10%10^1&&Number(n)%10] || "th" : n
    // }
}