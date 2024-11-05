import { HTTP_STATUS_CODE } from 'src/constants/HTTP_STATUS_CODE'

export function Required<T>(fields: (keyof T)[]) {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      const body = args[0]

      for (const field of fields) {
        if (!body[field]) {
          return {
            statusCode: HTTP_STATUS_CODE['Bad Request'],
            body: JSON.stringify({
              message: `Missing required field: ${String(field)}`
            })
          }
        }
      }

      return originalMethod.apply(this, args)
    }

    return descriptor
  }
}
