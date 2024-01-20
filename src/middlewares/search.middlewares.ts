import { checkSchema } from 'express-validator'
import { MediaTypeQuery, PeopleFollow } from '~/constants/enums'
import { validate } from '~/utils/validation'

export const searchValidator = validate(
  checkSchema(
    {
      // chỉ cần check media_type, content, people_follow
      content: {
        isString: true
      },
      media_type: {
        optional: true,
        isIn: {
          // lấy ra mảng các value trong MediaTypeQuery
          options: [Object.values(MediaTypeQuery)]
        },
        errorMessage: `Media type must be one of ${Object.values(MediaTypeQuery).join(', ')}`
      },
      people_follow: {
        optional: true,
        isIn: {
          options: [Object.values(PeopleFollow)],
          errorMessage: 'People follow must be 0 or 1'
        }
      }
    },

    ['query']
  )
)
