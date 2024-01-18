### Refresh Token

1 User có thể có nhiều refresh_token tượng trưng cho nhiều thiết bị khác nhau họ sử dụng để đăng nhập

### Verify email

User truy cập link đc gửi qua mail => Nhận đc email_verify_token => Tìm User, changeStatus tài khoản => Trả về access và refresh token bởi có thể User gửi verify req ở máy tính nhưng mà lại xác thực từ điện thoại.

### Đăng ký

Khi người dùng mới đăng ký thì trạng thái tài khoản: Unverified.

Khi chung ta sign JWT thi truyen luon trang thai verify cua nguoi dung vao payload. De trong middleware luon nam giu trang thai verify cua nguoi dung.

## Thuật toán dành cho new feeds

Lấy ra các tweet của người mình follow và bản thân mình theo thứ tự thời gian, chưa có gợi ý.
