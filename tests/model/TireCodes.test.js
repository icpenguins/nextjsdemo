'using strict'

import TireCodes, {
    tireConstruction,
    tireIntendedUse,
    tireLoadIndex,
    tireLoadRange,
    tireSpeedRating
} from '../../model/TireCodes'

describe('model:TireCodes - validate TireCodes class returns correct enum values', () => {
    it('should return the correct tire construction', () => {
        expect(TireCodes.getTireConstruction('R')).toBe('Radial')
        expect(TireCodes.getTireConstruction('r')).toBe('Radial')
        expect(TireCodes.getTireConstruction(undefined)).toBe('Cross-ply')
        expect(TireCodes.getTireConstruction('')).toBe('Cross-ply')
        expect(TireCodes.getTireConstruction(null)).toBe('Cross-ply')
        expect(() => { TireCodes.getTireConstruction('T') }).toThrow()
    })

    it('should return the correct tire intended use', () => {
        expect(TireCodes.getTireIntendedUse('LT')).toBe('Light Truck')
        expect(TireCodes.getTireIntendedUse('lt')).toBe('Light Truck')
        expect(() => { TireCodes.getTireIntendedUse(undefined) }).toThrow()
        expect(() => { TireCodes.getTireIntendedUse('') }).toThrow()
        expect(() => { TireCodes.getTireIntendedUse(null) }).toThrow()
        expect(() => { TireCodes.getTireIntendedUse('D') }).toThrow()
    })

    it('should return the correct load index weights', () => {
        expect(TireCodes.getTireLoadIndex(60)).toStrictEqual({ kg: 250, lb: 550 })
        expect(() => { TireCodes.getTireLoadIndex(undefined) }).toThrow()
        expect(() => { TireCodes.getTireLoadIndex('') }).toThrow()
        expect(() => { TireCodes.getTireLoadIndex(null) }).toThrow()
        expect(() => { TireCodes.getTireLoadIndex('K') }).toThrow()
        expect(() => { TireCodes.getTireLoadIndex(59) }).toThrow()
        expect(() => { TireCodes.getTireLoadIndex(140) }).toThrow()
    })

    it('should return the correct ply rating for the load range', () => {
        expect(TireCodes.getTireLoadRange('A')).toBe(2)
        expect(TireCodes.getTireLoadRange('n')).toBe(24)
        expect(() => { TireCodes.getTireLoadRange(undefined) }).toThrow()
        expect(() => { TireCodes.getTireLoadRange('') }).toThrow()
        expect(() => { TireCodes.getTireLoadRange(null) }).toThrow()
        expect(() => { TireCodes.getTireLoadRange('K') }).toThrow()
    })

    it('should return the correct tire speed rating', () => {
        expect(TireCodes.getTireSpeedRating('A1')).toStrictEqual({ kph: 5, mph: 3, over: false, parenthesis: false })
        expect(() => { TireCodes.getTireSpeedRating(undefined) }).toThrow()
        expect(() => { TireCodes.getTireSpeedRating('') }).toThrow()
        expect(() => { TireCodes.getTireSpeedRating(null) }).toThrow()
        expect(() => { TireCodes.getTireSpeedRating('I') }).toThrow()

        // special types
        expect(TireCodes.getTireSpeedRating('W', true)).toStrictEqual({ kph: 270, mph: 168, over: true, parenthesis: true })
        expect(TireCodes.getTireSpeedRating('(W)')).toStrictEqual({ kph: 270, mph: 168, over: true, parenthesis: true })
        expect(() => { TireCodes.getTireSpeedRating('(W') }).toThrow()
        expect(() => { TireCodes.getTireSpeedRating('W)') }).toThrow()
        expect(() => { TireCodes.getTireSpeedRating('(G)') }).toThrow()
    })
})

describe('model:TireCodes - validate TireCodes class returns correct enum values', () => {
    it('should parse a valid tire code', () => {
        let parsed = TireCodes.parseTireCodes('P195/60R15 87S')

        // P
        expect(parsed.type.value).toBe('P')
        expect(parsed.type.details).toBe(tireIntendedUse[parsed.type.value])

        // 195
        expect(parsed.width.value).toBe(195)

        // '/'
        expect(parsed.flotation.value).toBe('\/')
        expect(parsed.flotation.details).toBe(false)

        // 60
        expect(parsed.ratio.value).toBe(60)

        // R
        expect(parsed.construction.value).toBe('R')
        expect(parsed.construction.details).toBe(tireConstruction[parsed.construction.value])

        // 15
        expect(parsed.rimSize.value).toBe(15)

        // 87
        expect(parsed.loadIndex.value.single).toBe(87)
        expect(parsed.loadIndex.details.single).toStrictEqual(tireLoadIndex[parsed.loadIndex.value.single])

        // S
        expect(parsed.speedRating.value).toBe('S')
        expect(parsed.speedRating.details).toStrictEqual(tireSpeedRating[parsed.speedRating.value])
    })

    it('should parse a valid tire code with a double load index', () => {
        let parsed = TireCodes.parseTireCodes('LT325/65R18/E 127/124R')

        // E
        expect(parsed.loadRange.value).toBe('E')
        expect(parsed.loadRange.details).toStrictEqual(tireLoadRange[parsed.loadRange.value])

        // 127
        expect(parsed.loadIndex.value.single).toBe(127)
        expect(parsed.loadIndex.details.single).toStrictEqual(tireLoadIndex[parsed.loadIndex.value.single])

        // 124
        expect(parsed.loadIndex.value.dual).toBe(124)
        expect(parsed.loadIndex.details.dual).toStrictEqual(tireLoadIndex[parsed.loadIndex.value.dual])
    })

    it('should parse a valid tire code with flotation', () => {
        let parsed = TireCodes.parseTireCodes('35x12.50R15/C 113Q')

        // x or flotation
        expect(parsed.flotation.value).toBe('x')
        expect(parsed.flotation.details).toBe(true)
    })

    it('should parse a valid tire code with additional information', () => {
        let parsed = TireCodes.parseTireCodes('225/50R17 98V XL')

        expect(parsed.additional.value).toBe('XL')
    })

    it('should fail correctly', () => {
        expect(() => { TireCodes.parseTireCodes(undefined) }).toThrow()
        expect(() => { TireCodes.parseTireCodes('') }).toThrow()
        expect(() => { TireCodes.parseTireCodes(null) }).toThrow()
    })

    it('should inform of no matches', () => {
        expect(() => { TireCodes.parseTireCodes('nomatch') }).toThrow()
    })

    it('should inform of errors in matches', () => {
        let res = TireCodes.parseTireCodes('P195/60K15')

        expect(res.error.length).toBe(1)
        expect(res.error[0].name).toBe('construction')
        expect(res.error[0].error).not.toBeNull()
    })
})
