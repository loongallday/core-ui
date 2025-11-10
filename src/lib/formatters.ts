import { format, parseISO } from 'date-fns'
import { enUS, th } from 'date-fns/locale'

// Supported locales
export type SupportedLocale = 'en' | 'th'

// Date-fns locale mapping
const dateFnsLocales = {
  en: enUS,
  th: th,
}

// Currency mapping
const currencies = {
  en: 'USD',
  th: 'THB',
}

/**
 * Format a date according to the user's locale
 * @param date - Date to format (Date object or ISO string)
 * @param locale - User's locale
 * @param formatStr - Optional custom format string (date-fns format)
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  locale: SupportedLocale = 'en',
  formatStr: string = 'PP'
): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, formatStr, { locale: dateFnsLocales[locale] })
  } catch (error) {
    console.error('Error formatting date:', error)
    return String(date)
  }
}

/**
 * Format a date with time according to the user's locale
 * @param date - Date to format (Date object or ISO string)
 * @param locale - User's locale
 * @returns Formatted date and time string
 */
export function formatDateTime(
  date: Date | string,
  locale: SupportedLocale = 'en'
): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, 'PPp', { locale: dateFnsLocales[locale] })
  } catch (error) {
    console.error('Error formatting date time:', error)
    return String(date)
  }
}

/**
 * Format a number according to the user's locale
 * @param value - Number to format
 * @param locale - User's locale
 * @param options - Intl.NumberFormat options
 * @returns Formatted number string
 */
export function formatNumber(
  value: number,
  locale: SupportedLocale = 'en',
  options?: Intl.NumberFormatOptions
): string {
  try {
    const localeCode = locale === 'th' ? 'th-TH' : 'en-US'
    return new Intl.NumberFormat(localeCode, options).format(value)
  } catch (error) {
    console.error('Error formatting number:', error)
    return String(value)
  }
}

/**
 * Format a currency value according to the user's locale
 * @param amount - Amount to format
 * @param locale - User's locale
 * @param currency - Optional currency code (defaults to locale's currency)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  locale: SupportedLocale = 'en',
  currency?: string
): string {
  try {
    const localeCode = locale === 'th' ? 'th-TH' : 'en-US'
    const currencyCode = currency || currencies[locale]
    
    return new Intl.NumberFormat(localeCode, {
      style: 'currency',
      currency: currencyCode,
    }).format(amount)
  } catch (error) {
    console.error('Error formatting currency:', error)
    return String(amount)
  }
}

/**
 * Format a relative time (e.g., "2 hours ago")
 * @param date - Date to format (Date object or ISO string)
 * @param locale - User's locale
 * @returns Formatted relative time string
 */
export function formatRelativeTime(
  date: Date | string,
  locale: SupportedLocale = 'en'
): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

    const localeCode = locale === 'th' ? 'th-TH' : 'en-US'
    const rtf = new Intl.RelativeTimeFormat(localeCode, { numeric: 'auto' })

    // Calculate the appropriate unit
    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, 'second')
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute')
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour')
    } else if (diffInSeconds < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day')
    } else if (diffInSeconds < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month')
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year')
    }
  } catch (error) {
    console.error('Error formatting relative time:', error)
    return String(date)
  }
}

/**
 * Format a percentage according to the user's locale
 * @param value - Value to format (0.5 = 50%)
 * @param locale - User's locale
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercentage(
  value: number,
  locale: SupportedLocale = 'en',
  decimals: number = 2
): string {
  try {
    const localeCode = locale === 'th' ? 'th-TH' : 'en-US'
    return new Intl.NumberFormat(localeCode, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value)
  } catch (error) {
    console.error('Error formatting percentage:', error)
    return String(value)
  }
}

