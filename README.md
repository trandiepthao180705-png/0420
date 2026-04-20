# 🌈 나의 오늘 일기 (My Today's Diary)
나의 기분과 짧은 메모를 핑크빛 엽서처럼 예쁘게 남기고 보관할 수 있는 감정 다이어리 웹앱입니다.

## 📸 스크린샷
<img width="1425" height="725" alt="화면 캡처 2026-04-20 122630" src="https://github.com/user-attachments/assets/5fd5d019-6963-4dc6-9efa-6d86fb1f3cac" />


## 🚀 사용법
1. index.html(또는 웹앱 링크)을 브라우저에서 연다.
2. 오늘의 기분을 가장 잘 나타내는 이모지를 고르고, 짧은 메모를 작성한 뒤 '저장하기' 버튼을 누른다.
3. 우측 '당신의 추억' 리스트 맨 위에 방금 작성한 일기가 추가되고 저장된 것을 확인한다.

## 🔑 AI 투명성
이 웹앱은 Google AI Studio(Gemini)를 활용하여 제작되었습니다.
제가 직접 한 부분은 [UX 로직 설계 / 프롬프트 작성 / 디자인 CSS 테마 전달 /번역 추가 요청 / README 커스터마이즈]이고,
AI가 한 부분은 [React 기반 화면 UI 코드 생성 / LocalStorage 연결 로직 구현 / 초안 문구 작성]입니다.

## 👤 만든이
이름 | 배재대학교 글로벌자율학부 | 학번 20XX-XXXX | 2026

## 🛠 제작 과정 (필수)
### UX 로직
1. 사용자가 "저장하기" 버튼을 누르면, 새 일기 항목이 리스트 맨 위에 추가되며 LocalStorage에 실시간으로 저장된다.
2. 사용자가 텍스트를 입력하지 않고 저장을 시도하면, 경고 아이콘과 함께 에러 알림 문구가 깜빡이며 우선적으로 입력을 유도한다.
3. 사용자가 이전 기록의 "휴지통" 아이콘을 클릭하면, 즉시 삭제되지 않고 실수 방지용 중앙 확인 팝업창(모달)이 뜬다.

### 최종 프롬프트 (CRAFT + CoT)
```text
tôi là sinh viên đại học cần tạo một web tên là "nhật kí tâm trạng hôm nay". bạn là một lập trình viên có thể viết code dễ hiểu . Hãy tạo một web app có chức năng hiển thị ngày hôm nay, chon imojj tâm trạng và nhập ghi chú ngắn. Dữ liệu phải được lưu bằng localstorage và vẫn còn sau khi tải trang.mỗi bản ghi có thể xóa và trước khi xóa cần hiển thị hộp thoại xác nhận. Format : viết dưới dạng file html duy nhất, bao gồm html css. tone pastel nhẹ nhàng, giao diện dạng thẻ. CoT : Hãy suy nghĩ theo từng bước :
tạo cấu trúc html và giao diện cơ bản.
tạo chức năng chọn imojj
tạo chức năng lưu và tải dữ liệu bằng localstorage.
hiển thị danh sách các ghi chú.
tạo nút xóa và hộp thoại xác nhận
xử lí trường hợp nhập trống
```

### 3P 수정 내역
- Product 관점: "앱에 Vibrant Palette 디자인 테마 스타일을 맞춰서 CSS로 적용해줘." → 밋밋했던 UI가 2단 분할 레이아웃과 그림자, 호버 애니메이션이 들어간 핑크톤의 부드럽고 세련된 디자인으로 개선됨.
- Process 관점: "모든 UI 텍스트와 날짜 표기법을 한국어로 바꿔줘." → 전체 언어가 한국어 포맷(ko-KR)으로 적용되어 국내 사용자들이 직관적으로 앱을 사용할 수 있도록 해결.
