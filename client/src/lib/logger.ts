/**
 * Centralized logger utility for concise, structured logging
 * Automatically disabled in production builds
 */

const isDev = import.meta.env.DEV;
const isDebug = import.meta.env.DEV; // Can be toggled via env var if needed

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

/**
 * Format log message with context
 */
function formatMessage(prefix: string, message: string, context?: LogContext): string {
  if (context && Object.keys(context).length > 0) {
    const contextStr = Object.entries(context)
      .map(([key, value]) => {
        // Handle undefined, null, and other non-serializable values
        let str: string;
        if (value === undefined) {
          str = 'undefined';
        } else if (value === null) {
          str = 'null';
        } else if (typeof value === 'string') {
          str = value;
        } else {
          try {
            str = JSON.stringify(value);
            // JSON.stringify can return undefined for some values (functions, symbols)
            if (str === undefined) {
              str = String(value);
            }
          } catch (e) {
            // Handle circular references or other serialization errors
            str = String(value);
          }
        }
        // Truncate long values for readability
        return `${key}: ${str.length > 50 ? str.substring(0, 50) + '...' : str}`;
      })
      .join(', ');
    return `[${prefix}] ${message}${contextStr ? ` (${contextStr})` : ''}`;
  }
  return `[${prefix}] ${message}`;
}

/**
 * Logger class with log levels
 */
class Logger {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  debug(message: string, context?: LogContext): void {
    if (isDebug) {
      console.debug(formatMessage(this.prefix, message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    if (isDev) {
      console.log(formatMessage(this.prefix, message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    if (isDev) {
      console.warn(formatMessage(this.prefix, message, context), context);
    }
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    // Always log errors, even in production (but formatted)
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(formatMessage(this.prefix, message, { ...context, error: errorMessage }), error);
  }
}

/**
 * Create a logger instance with a prefix
 */
export function createLogger(prefix: string): Logger {
  return new Logger(prefix);
}

/**
 * Default logger for general use
 */
export const logger = createLogger('App');

