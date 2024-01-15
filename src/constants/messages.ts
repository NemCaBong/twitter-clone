export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  USER_NOT_FOUND: 'User not found',
  EMAIL_IS_INVALID: 'Email is invalid',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be from 6 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Confirm password length must be from 6 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be ISO8601',
  LOGIN_SUCCESS: 'Login success',
  REGISTER_SUCCESS: 'Register success',
  ACCESS_TOKEN_IS_INVALID: 'Access token is invalid',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',
  LOGOUT_SUCCESS: 'Logout success',
  REFRESH_TOKEN_SUCCESS: 'Refresh token success',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  EMAIL_VERIFY_SUCCESS: 'Email verify success',
  RESEND_VERIFY_EMAIL_SUCCESS: 'Resend verify email success',
  EMAIL_NOT_FOUND: 'Email not found',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  FORGOT_PASSWORD_TOKEN_IS_INVALID: 'Forgot password token is invalid',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'Verify forgot password token success',
  RESET_PASSWORD_SUCCESS: 'Reset password success',
  GET_ME_SUCCESS: 'Get my profile success',
  USER_NOT_VERIFIED: 'User not verified',
  BIO_MUST_BE_STRING: 'Bio must be a string',
  BIO_LENGTH: 'Bio length must be from 1 to 200',
  LOCATION_MUST_BE_STRING: 'Location must be a string',
  LOCATION_LENGTH: 'Location length must be from 1 to 200',
  WEBSITE_MUST_BE_STRING: 'Website must be a string',
  WEBSITE_LENGTH: 'Website length must be from 1 to 200',
  USERNAME_MUST_BE_STRING: 'Username must be a string',
  USERNAME_LENGTH: 'Username length must be from 1 to 50',
  IMAGE_URL_MUST_BE_STRING: 'Avatar must be a string',
  IMAGE_URL_LENGTH: 'Avatar length must be from 1 to 200',
  UPDATE_ME_SUCCESS: 'Update my profile success',
  GET_PROFILE_SUCCESS: 'Get profile success',
  FOLLOW_SUCCESS: 'Follow success',
  FOLLOWED_USER_NOT_FOUND: 'Followed user not found',
  FOLLOWED: 'Followed',
  INVALID_USER_ID: 'Invalid user id',
  NOT_FOLLOWED_YET: 'Not followed yet',
  UNFOLLOW_SUCCESS: 'Unfollow success',
  USERNAME_INVALID:
    'Username must be 4-15 characters long and contain only letters, numbers, underscores, not only numbers',
  USERNAME_EXISTED: 'Username existed',
  OLD_PASSWORD_IS_NOT_MATCH: 'Old password is not match',
  CHANGE_PASSWORD_SUCCESS: 'Change password success',
  GMAIL_NOT_VERIFIED: 'Gmail not verified',
  UPLOAD_SUCCESS: 'Upload success',
  GET_VIDEO_STATUS_SUCCESS: 'Get video status success'
} as const

export const TWEETS_MESSAGES = {
  INVALID_TYPE: 'Invalid type',
  INVALID_AUDIENCE: 'Invalid audience',
  PARENT_ID_MUST_BE_A_VALID_TWEET_ID: 'Parent id must be a valid tweet id',
  PARENT_ID_MUST_BE_NULL: 'Parent id must be null',
  CONTENT_MUST_BE_NOT_EMPTY_STRING: 'Content must be not empty string',
  HASHTAGS_MUST_BE_ARRAY_OF_STRING: 'Hashtags must be array of string',
  MENTIONS_MUST_BE_ARRAY_OF_USER_ID: 'Mentions must be array of user id',
  MEDIA_MUST_BE_ARRAY_OF_MEDIA_OBJECT: 'Media must be array of media object',
  INVALID_TWEET_ID: 'Invalid tweet id',
  TWEET_NOT_FOUND: 'Tweet not found',
  TWEET_NOT_PUBLIC: 'Tweet not public'
} as const

export const BOOKMARKS_MESSAGES = {
  BOOKMARK_TWEET_SUCCESS: 'Bookmark tweet successfully',
  UNBOOKMARK_TWEET_SUCCESS: 'Unbookmark tweet successfully'
}
