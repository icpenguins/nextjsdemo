'using strict'

/**
 * A generalized regular expression to match a given tire code. The regex is written in a manner to purposely enable
 * incorrect values to be placed in the tire code so that error messaging can happen down stream. A non-permissive
 * regex could look like the following.
 * 
 * /([pP]|[lL][tT]|[sS][tT]|[tT])?(\d+)([x\/])([0-9.]+)([hsvHSV]?[bdrBDR])(\d+)(?:(?:\/|\s)?([a-zA-Z])?\s(\d+|\d+\/\d+)(\(?[a-zA-Z]\)?)(?: )?([a-zA-Z-]+)?)?/
 * 
 * Type:         $1
 * Width:        $2
 * Ratio:        $3
 * Construction: $4
 * Rim Size:     $5
 * Load Range:   $6
 * Load Index:   $7
 * Speed Rating: $8
 * Additional:   $9
 */
const tireCodeRegex = /([a-zA-Z]{1,2})?(\d+)([x\/])([0-9.]+)([a-zA-Z]{1,2})(\d+)(?:(?:\/|\s)?([a-zA-Z])?\s(\d+|\d+\/\d+)(\(?[a-zA-Z]\)?)(?:\s)?([a-zA-Z-]+)?)?/

/**
 * The different types of tire construction.
 * 
 * @author https://en.wikipedia.org/wiki/Tire_code
 */
export const tireConstruction = {
    /**
     * Bias Belt
     */
    B: 'Bias Belt',
    /**
     * Diagonal
     */
    D: 'Diagonal',
    /**
     * If omitted, it is a cross-ply tire
     */
    None: 'Cross-ply',
    /**
     * Radial
     */
    R: 'Radial'
}

/**
 * The intended use for the tire.
 * 
 * @author https://en.wikipedia.org/wiki/Tire_code
 */
export const tireIntendedUse = {
    /**
     * Passenger Car
     */
    P: 'Passenger Car',
    /**
     * Light Truck
     */
    LT: 'Light Truck',
    /**
     * Special Trailer
     */
    ST: 'Special Trailer',
    /**
     * Temporary (restricted usage for "space-saver" spare wheels)
     */
    T: 'Temporary'
}

/**
 * 
 * @author https://en.wikipedia.org/wiki/Tire_code
 */
export const tireLoadIndex = {
    60: { kg: 250, lb: 550 },
    61: { kg: 257, lb: 567 },
    62: { kg: 265, lb: 584 },
    63: { kg: 272, lb: 600 },
    64: { kg: 280, lb: 620 },
    65: { kg: 290, lb: 640 },
    66: { kg: 300, lb: 660 },
    67: { kg: 307, lb: 677 },
    68: { kg: 315, lb: 694 },
    69: { kg: 325, lb: 717 },
    70: { kg: 335, lb: 739 },
    71: { kg: 345, lb: 761 },
    72: { kg: 355, lb: 783 },
    73: { kg: 365, lb: 805 },
    74: { kg: 375, lb: 827 },
    75: { kg: 387, lb: 853 },
    76: { kg: 400, lb: 880 },
    77: { kg: 412, lb: 908 },
    78: { kg: 425, lb: 937 },
    79: { kg: 437, lb: 963 },
    80: { kg: 450, lb: 990 },
    81: { kg: 462, lb: 1019 },
    82: { kg: 475, lb: 1047 },
    83: { kg: 487, lb: 1074 },
    84: { kg: 500, lb: 1100 },
    85: { kg: 515, lb: 1135 },
    86: { kg: 530, lb: 1170 },
    87: { kg: 545, lb: 1202 },
    88: { kg: 560, lb: 1230 },
    89: { kg: 580, lb: 1280 },
    90: { kg: 600, lb: 1300 },
    91: { kg: 615, lb: 1356 },
    92: { kg: 630, lb: 1390 },
    93: { kg: 650, lb: 1430 },
    94: { kg: 670, lb: 1480 },
    95: { kg: 690, lb: 1520 },
    96: { kg: 710, lb: 1570 },
    97: { kg: 730, lb: 1610 },
    98: { kg: 750, lb: 1650 },
    99: { kg: 775, lb: 1709 },
    100: { kg: 800, lb: 1800 },
    101: { kg: 825, lb: 1819 },
    102: { kg: 850, lb: 1870 },
    103: { kg: 875, lb: 1929 },
    104: { kg: 900, lb: 2000 },
    105: { kg: 925, lb: 2039 },
    106: { kg: 950, lb: 2090 },
    107: { kg: 975, lb: 2150 },
    108: { kg: 1000, lb: 2200 },
    109: { kg: 1030, lb: 2270 },
    110: { kg: 1060, lb: 2340 },
    111: { kg: 1090, lb: 2400 },
    112: { kg: 1120, lb: 2470 },
    113: { kg: 1150, lb: 2540 },
    114: { kg: 1180, lb: 2600 },
    115: { kg: 1215, lb: 2679 },
    116: { kg: 1250, lb: 2760 },
    117: { kg: 1285, lb: 2833 },
    118: { kg: 1320, lb: 2910 },
    119: { kg: 1360, lb: 3000 },
    120: { kg: 1400, lb: 3100 },
    121: { kg: 1450, lb: 3200 },
    122: { kg: 1500, lb: 3300 },
    123: { kg: 1550, lb: 3420 },
    124: { kg: 1600, lb: 3500 },
    125: { kg: 1650, lb: 3640 },
    126: { kg: 1700, lb: 3700 },
    127: { kg: 1750, lb: 3860 },
    128: { kg: 1800, lb: 4000 },
    129: { kg: 1850, lb: 4080 },
    130: { kg: 1900, lb: 4200 },
    131: { kg: 1950, lb: 4300 },
    132: { kg: 2000, lb: 4400 },
    133: { kg: 2065, lb: 4553 },
    134: { kg: 2125, lb: 4685 },
    135: { kg: 2185, lb: 4817 },
    136: { kg: 2245, lb: 4949 },
    137: { kg: 2305, lb: 5082 },
    138: { kg: 2365, lb: 5214 },
    139: { kg: 2435, lb: 5368 }
}

/**
 * The Load Range letter on tires indicates their ply rating.
 *
 * @author https://en.wikipedia.org/wiki/Tire_code
 */
export const tireLoadRange = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
    E: 10,
    F: 12,
    G: 14,
    H: 16,
    // No I
    J: 18,
    // No K
    L: 20,
    M: 22,
    N: 24

}

/**
 * The tire speed rating.
 * 
 * @author https://en.wikipedia.org/wiki/Tire_code
 */
export const tireSpeedRating = {
    A1: { kph: 5, mph: 3, over: false, parenthesis: false },
    A2: { kph: 10, mph: 6, over: false, parenthesis: false },
    A3: { kph: 15, mph: 9, over: false, parenthesis: false },
    A4: { kph: 20, mph: 12, over: false, parenthesis: false },
    A5: { kph: 25, mph: 16, over: false, parenthesis: false },
    A6: { kph: 30, mph: 19, over: false, parenthesis: false },
    A7: { kph: 35, mph: 22, over: false, parenthesis: false },
    A8: { kph: 40, mph: 25, over: false, parenthesis: false },
    B: { kph: 50, mph: 31, over: false, parenthesis: false },
    C: { kph: 60, mph: 37, over: false, parenthesis: false },
    D: { kph: 65, mph: 40, over: false, parenthesis: false },
    E: { kph: 70, mph: 43, over: false, parenthesis: false },
    F: { kph: 80, mph: 50, over: false, parenthesis: false },
    G: { kph: 90, mph: 56, over: false, parenthesis: false },
    H: { kph: 210, mph: 130, over: false, parenthesis: false },
    J: { kph: 100, mph: 62, over: false, parenthesis: false },
    K: { kph: 110, mph: 68, over: false, parenthesis: false },
    L: { kph: 120, mph: 75, over: false, parenthesis: false },
    M: { kph: 130, mph: 81, over: false, parenthesis: false },
    N: { kph: 140, mph: 87, over: false, parenthesis: false },
    P: { kph: 150, mph: 94, over: false, parenthesis: false },
    Q: { kph: 160, mph: 100, over: false, parenthesis: false },
    R: { kph: 170, mph: 106, over: false, parenthesis: false },
    S: { kph: 180, mph: 112, over: false, parenthesis: false },
    T: { kph: 190, mph: 118, over: false, parenthesis: false },
    U: { kph: 200, mph: 124, over: false, parenthesis: false },
    V: { kph: 240, mph: 149, over: false, parenthesis: false },
    W: { kph: 270, mph: 168, over: false, parenthesis: false },
    WP: { kph: 270, mph: 168, over: true, parenthesis: true },
    Y: { kph: 300, mph: 186, over: false, parenthesis: false },
    YP: { kph: 300, mph: 186, over: true, parenthesis: true },
    Z: { kph: 240, mph: 149, over: true, parenthesis: false }
}

/**
 * A set of static functions which provide details to the various tire codes.
 */
export default class TireCodes {
    /**
     * Looks up the tire's construction type from the given character.
     * 
     * @example getTireConstruction('R') returns 'Radial'
     * 
     * @param {string} value the tire's construction character.
     */
    static getTireConstruction(value) {
        if (value === undefined || value === '' || value === null) {
            value = 'None'
        } else {
            value = value.toUpperCase()
        }

        if (!tireConstruction.hasOwnProperty(value)) {
            throw Error(`The tire construction type '${value}' was not found.`)
        }

        return tireConstruction[value]
    }

    /**
     * Looks up the tire's intended use from a character or characters representing
     * the abbreviation value.
     * 
     * @example getTireIntendedUse('LT') returns 'Light Truck'
     * 
     * @param {string} value the tire's intended use character.
     */
    static getTireIntendedUse(value) {
        if (value === undefined || value === '' || value === null) {
            throw Error('Please specify an character for the intended use of the tire.')
        } else {
            value = value.toUpperCase()
        }

        if (!tireIntendedUse.hasOwnProperty(value)) {
            throw Error(`The tire's intended use of '${value}' was not found.`)
        }

        return tireIntendedUse[value]
    }

    /**
     * A correct load index will return a weight rating for the tire in both kilograms (kg) and pounds (lb).
     *
     * @param {Number} value should be an integer between 60 and 139.
     */
    static getTireLoadIndex(value) {
        if (value === undefined || value === '' || value === null) {
            throw Error('Please specify a load index number for the tire.')
        }

        if (!tireLoadIndex.hasOwnProperty(value)) {
            throw Error(`The load index '${value}' is not valid. Please use a value between 60 and 139.`)
        }

        return tireLoadIndex[value]
    }

    /**
     * Looks up the ply rating for the tire range.
     *
     * @param {string} value the tire's load range character.
     */
    static getTireLoadRange(value) {
        if (value === undefined || value === '' || value === null) {
            throw Error('Please specify a load range character for the tire.')
        } else {
            value = value.toUpperCase()
        }

        if (!tireLoadRange.hasOwnProperty(value)) {
            throw Error(`A tire cannot have a load range of '${value}'.`)
        }

        return tireLoadRange[value]
    }

    /**
     * Gets the speed rating details for the given code.
     *
     * @param {string} value the speed rating code.
     * @param {boolean} hasParenthesis if the speed rating code has parenthesis.
     */
    static getTireSpeedRating(value, hasParenthesis = false) {
        if (value === undefined || value === '' || value === null) {
            throw Error('Please specify a speed rating value for the tire.')
        } else {
            value = value.toUpperCase()
        }

        if (value.includes('(') && value.includes(')')) {
            hasParenthesis = true
        }

        if (hasParenthesis) {
            value = value.replace('(', '')
            value = value.replace(')', '')
            
            value += 'P'
        }

        if (!tireSpeedRating.hasOwnProperty(value)) {
            throw Error(`A tire cannot have a load range of '${value}'.`)
        }

        return tireSpeedRating[value]
    }

    static parseTireCodes(value) {
        const regGroups = [
            'type',
            'width',
            'flotation',
            'ratio',
            'construction',
            'rimSize',
            'loadRange',
            'loadIndex',
            'speedRating',
            'additional'
        ]

        let res =  {
            original: value,
            type: undefined,
            width: undefined,
            flotation: undefined,
            ratio: undefined,
            construction: undefined,
            rimSize: undefined,
            loadIndex: undefined,
            loadRange: undefined,
            speedRating: undefined,
            additional: undefined,
            error: []
        }

        if (value === undefined || value === '' || value === null) {
            throw Error('Please specify a valid tire code to parse for information.')
        }

        const match = tireCodeRegex.exec(value)

        if (!match) {
            throw Error(`The provided tire codes '${value}' found no tire information.`)
        }

        for (let i = 1; i < match.length; i++) {
            let name = regGroups[i - 1]

            if (match[i] === undefined) {
                continue
            }

            try {
                switch(i) {
                    case 2: // width
                    case 4: // ratio
                    case 6: // rim size
                        res[name] = this.setTireCodeValues(match[i], true)
                        break
                    case 10: // additional
                        res[name] = this.setTireCodeValues(match[i])
                        break
                    case 1: // type
                        res[name] = this.setTireCodeValues(match[i], false, this.getTireIntendedUse(match[i]))
                        break
                    case 3:
                        let x = match[i].toLowerCase()
                        res[name] = this.setTireCodeValues(match[i], false, x === 'x' ? true : false)
                        break
                    case 5: // construction
                        res[name] = this.setTireCodeValues(match[i], false, this.getTireConstruction(match[i]))
                        break
                    case 7: // load range
                        res[name] = this.setTireCodeValues(match[i], false, this.getTireLoadRange(match[i]))
                        break
                    case 8: // load index
                        let liParsed = this.parseTireLoadIndex(match[i])

                        res[name] = this.setTireCodeValues(liParsed.value, false, liParsed.details)
                        break
                    case 9: // speed rating
                        res[name] = this.setTireCodeValues(match[i], false, this.getTireSpeedRating(match[i]))
                        break
                    default:
                        throw Error('Unexpected expression found in groups.')
                }
            } catch (e) {
                res.error.push({ name: name, error: e.message })
            }
        }

        return res
    }

    /**
     * Parses a load index rating of a tire.
     *
     * @param {String} value the load index rating of the tire
     * 
     * @returns {Object} the value and details for a single and dual configuration
     */
    static parseTireLoadIndex(value) {
        let res = {
            value: {
                single: undefined,
                dual: undefined
            },
            details: {
                single: undefined,
                dual: undefined
            }
        }

        if (!value.includes('\/')) {
            res.value.single = parseInt(value)
            res.details.single = this.getTireLoadIndex(value)
        } else {
            let dual = value.split('\/')

            res.value.single = parseInt(dual[0])
            res.details.single = this.getTireLoadIndex(dual[0])

            res.value.dual = parseInt(dual[1])
            res.details.dual = this.getTireLoadIndex(dual[1])
        }

        return res
    }

    /**
     * Sets the tire code values while parsing the tire code provided.
     * @private
     * 
     * @param {Object} value the original value
     * @param {Boolean} isNumber if the value is supposed to be a number
     * @param {Object} details the details, if any
     * 
     * @returns {Object} an object
     */
    static setTireCodeValues(value, isNumber = false, details) {
        if (isNumber) {
            value = parseFloat(value)
        }

        return {
            value: value,
            details: details === undefined ? undefined : details
        }
    }
}
