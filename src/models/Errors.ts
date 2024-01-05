import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
/**
 * Có 2 loại lỗi:
 *  - Lỗi thường
 * {
 *   message: string
 *   status: number
 *   error_info?: any
 * }
 * - Lỗi validation (422)
 * {
 *   message: string,
 *   errors: {
 *     [field: string]: {
 *       msg: string
 *       [key: string]: unknown
 *     }
 *   }
 * }
 */

/**
 * Type của dạng errors trả về từ express-validator
 */
type ErrorsType = Record<
  string,
  {
    msg: string
    [key: string]: unknown
  }
>

/**
 * Class của lỗi thông thường, tự gửi lên status code
 */
export class ErrorWithStatus {
  message: string
  status: number

  /**
   * Creates a new instance of ErrorWithStatus.
   * @param message - The error message.
   * @param status - The status code associated with the error.
   */
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

/**
 * Class của lỗi liên quan tới Entity: 422 status code
 */
export class EntityError extends ErrorWithStatus {
  errors: ErrorsType

  /**
   * Creates a new instance of EntityError.
   * @param message - The error message.
   * @param errors - The errors associated with the entity.
   */
  constructor({ message = USERS_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
