export declare const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'

export declare const DEFAULT_TIME_FORMAT = 'HH:mm'

export declare function format(
  input: Date,
  dateFormat: string,
  options?: {
    useUTC?: boolean
    timeZone?: string
  },
): string

export declare function isValidTimeZoneString(timeZone: string): boolean

export declare function parse(
  dateString: string,
  dateFormat?: string,
  timeZone?: string,
): ParseResult

export declare type ParseResult = {
  isValid: boolean
  date?: Date
  error?: string
} & (
  | {
      isValid: true
      date: Date
    }
  | {
      isValid: false
      error?: string
    }
)

export declare const sanitizeLocale: (locale: string) => string

export {}
