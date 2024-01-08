/**
 * Không đc chứa toàn bộ số
 * Không có ký tự đặc biệt ngoại trừ _
 * Chỉ từ 4 - 15 ký tự
 */
export const REGEX_USERNAME = /^(?![0-9]+$)[A-Za-z0-9_]{4,15}$/
