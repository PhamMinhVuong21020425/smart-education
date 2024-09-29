# Smart Education

## Thành viên nhóm 9

- Nguyễn Quang Anh - 21020116
- Nguyễn Xuân Hòa - 21020072
- Phạm Minh Vương - 21020425

## Các chức năng chính

### Chức năng cho Người dùng chưa đăng ký (Guest):

- Đăng ký tài khoản: Có thể đăng ký tài khoản với vai trò là một Học viên hoặc một Giảng viên. Tài khoản đăng ký cần phải được kích hoạt thông qua việc hệ thống sẽ gửi email xác thực người dùng. Khi đăng ký là một Giảng viên thì cần phải được Admin phê duyệt và chấp nhận.

- Xem thông tin chi tiết của giảng viên, khóa học.

- Tìm kiếm thông tin giảng viên hoặc khóa học theo từ khóa.

- Các thông tin cần được sắp xếp dựa trên tiêu chí nhất định như khóa học có nhiều học viên đăng ký hoặc giảng viên có nhiều học viên theo học nhất.

### Chức năng cho Học viên (Student):

- Bao gồm tất cả các chức năng của Người dùng chưa đăng ký.

- Đăng nhập, đăng xuất tài khoản, quên mật khẩu.

- Xem và chỉnh sửa thông tin cá nhân, đổi mật khẩu.

- Đăng ký khóa học.

- Nhận email thông báo khi giảng viên chấp nhận hoặc từ chối lượt đăng ký.

- Xem danh sách khóa học đã đăng ký: Có thể lọc danh sách theo cấp độ của khóa học hoặc trạng thái đăng ký.

- Xem các tiết học/bài giảng trong khóa học đã đăng ký thành công.

- Quản lý tiến độ học tập của mình trong khóa học bằng cách đánh dấu các tiết học đã hoàn thành.

- Làm bài kiểm tra của khóa học: Bài kiểm tra bao gồm các câu hỏi trắc nghiệm có các đáp án để chọn.

- Xem kết quả bài kiểm tra: Có thể xem điểm và nhìn thấy đáp án những câu mình đã chọn là đúng hay sai.

### Chức năng cho Giảng viên (Instructor):

- Đăng nhập, đăng xuất tài khoản, quên mật khẩu.

- Xem và chỉnh sửa thông tin cá nhân, đổi mật khẩu.

- Xem danh sách khóa học được quản lý bởi giảng viên đó.

- Quản lý khóa học: Thêm, sửa, xóa khóa học. Chỉ được xóa khi khóa học không có học viên nào đăng ký.

- Quản lý tiết học/bài giảng trong khóa học: Có thể upload pdf, video...

- Quản lý bài kiểm tra của khóa học.

- Nhận email thông báo khi có học viên đăng ký khóa học.

- Phê duyệt (chấp nhận hoặc từ chối) yêu cầu đăng ký khóa học của học viên.

- Xem tiến độ, kết quả bài kiểm tra của từng học viên trong khóa học.

- Thêm nhận xét, đánh giá cho từng sinh viên trong khóa học.

- Tạo phòng học online.

- Tạo diễn đàn trao đổi, thảo luận.

### Chức năng cho Người quản lý hệ thống (Admin):

- Đăng nhập, đăng xuất tài khoản, xác thực, đổi mật khẩu.

- Xem số liệu thống kê về hệ thống: số khóa học, số giảng viên, số học viên…

- Phê duyệt yêu cầu đăng ký tài khoản với vai trò là một Giảng viên.

- Quản lý người dùng: Xem danh sách, tìm kiếm, xem chi tiết thông tin người dùng, kích hoạt tài khoản, khóa người dùng.

### Chức năng hệ thống (System):

- Tự động gửi thông báo về các hoạt động liên quan đến lớp học.

- Lưu trữ hoạt động của người dùng.

- Chuyển đổi ngôn ngữ giữa tiếng Anh và tiếng Việt.

## Available Scripts

### `npm run dev:start`

Run the server in development mode.

### `npm run server:start`

Run the server in development with debug mode.

### `npm run tailwind:css`

Watch changes when coding UI with tailwind.

### `npm run lint`

Check for linting errors.

### `npm run lint:fix`

Fix linting errors.

### `npm run format`

Format code with prettier rules.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm run migrate:generate ./src/migration/<migration_name>`

Generate a file migration containing the most recent changes that have not yet been run to the schema.

### `npm run migrate:run`

Execute all pending migrations.

### `npm run migrate:revert`

Rollback the most recently executed migration.

### `npm run migrate:show`

Show all migrations and whether they've been run or not.

[X] = Migration has been ran

[ ] = Migration is pending/unapplied
