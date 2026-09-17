# QUY TẮC LÀM VIỆC VỚI CLAUDE

## 1. Ngôn ngữ

Tất cả nội dung giải thích, phân tích, báo cáo, kết quả thực hiện, cảnh báo, câu hỏi và tài liệu dự án phải được viết bằng TIẾNG VIỆT.

Bao gồm:
- Requirement analysis
- Technical analysis
- Architecture explanation
- User flow
- API analysis
- QA report
- Error explanation
- Implementation summary
- TODO
- Open questions
- Assumptions
- Decision log

Chỉ sử dụng tiếng Anh cho:
- Source code
- Variable names
- Function names
- Class names
- Component names
- File/folder names khi phù hợp với coding convention
- API field names
- Technical terms bắt buộc phải giữ nguyên

Nếu sử dụng một technical term bằng tiếng Anh, hãy giải thích ý nghĩa bằng tiếng Việt khi cần thiết.

Ví dụ:

"Availability (tình trạng phòng còn trống)"

thay vì chỉ viết:

"Availability"

## 2. Nguồn sự thật

File PDF requirement là nguồn thông tin chính của business requirement.

Không được tự ý thêm hoặc thay đổi business requirement.

Nếu requirement không rõ:
- Ghi rõ [CHƯA XÁC ĐỊNH]
- Giải thích vấn đề
- Đưa ra câu hỏi cần xác nhận

Không được tự giả định rồi coi đó là requirement chính thức.

## 3. API

Không được tự tạo hoặc đoán:
- API endpoint
- Request parameter
- Response structure
- Authentication method
- Permission

Nếu chưa có API documentation chính thức, phải đánh dấu là:

[CHƯA XÁC NHẬN API]

## 4. Security

Không được:
- Hard-code API key
- Hard-code password
- Hard-code secret
- Commit secret vào Git
- Expose server-side credentials ra frontend

Secret phải được quản lý bằng environment variables.

## 5. Coding

Ưu tiên:
- Code đơn giản
- Component có thể tái sử dụng
- Không duplicate code
- Không over-engineering
- Không sửa code không liên quan
- Không tự ý thay đổi architecture đã thống nhất

## 6. Sau mỗi phase

Phải báo cáo bằng tiếng Việt:

### Đã hoàn thành
...

### Chưa hoàn thành
...

### Vấn đề phát hiện
...

### Cần tôi xác nhận
...

### Phase tiếp theo
...
