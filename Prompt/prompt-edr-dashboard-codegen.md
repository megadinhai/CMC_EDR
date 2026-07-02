# PROMPT: SINH CODE "EDR DEFAULT DASHBOARD" (React + Tailwind + Zustand + Mock API)

> Copy toàn bộ nội dung dưới đây và dán vào **Claude Code** (hoặc Figma Make). Đây là prompt hoàn chỉnh, không cần chỉnh sửa thêm.

---

## 0. VAI TRÒ & MỤC TIÊU

Bạn là **Senior Frontend Engineer** chuyên xây dựng SOC/EDR security dashboard. Hãy tạo cho tôi **toàn bộ source code** của màn hình **EDR Default Dashboard** dưới dạng một dự án React chia module rõ ràng.

**Nguồn tham chiếu bắt buộc:**
- Thiết kế giao diện (bố cục, màu sắc, spacing, typography):
  `https://www.figma.com/design/98LKzTomvjr4pwGT2990gX/CMC-%7C-EDR--07-10-2025-?node-id=22263-142887`
- Đặc tả nghiệp vụ: theo mục **2–4** bên dưới (đã trích từ tài liệu BA).

Khi có mâu thuẫn giữa văn bản và Figma: **layout/màu sắc theo Figma**, **logic dữ liệu theo đặc tả BA**.

---

## 1. TECH STACK & RÀNG BUỘC KỸ THUẬT

- **React 18 + TypeScript** (dùng function component + hooks, không dùng class component).
- **Vite** làm build tool.
- **TailwindCSS** cho toàn bộ styling (không viết CSS-in-JS, không styled-components). Định nghĩa design tokens (màu severity, màu status…) trong `tailwind.config.ts`.
- **Zustand** cho state management (mỗi nhóm widget có store riêng hoặc slice riêng — xem mục 5).
- **Thư viện chart**: dùng **Recharts** (donut/pie, bar, column, line). Bọc lại thành component wrapper của riêng dự án để dễ thay thế.
- **Mock API**: dùng **MSW (Mock Service Worker)** để giả lập REST API. Toàn bộ dữ liệu mock phải **thỏa mãn 100% quy tắc đồng nhất dữ liệu** ở mục 4.
- **Data fetching**: dùng `@tanstack/react-query` gọi API, kết quả đẩy vào Zustand (hoặc để React Query quản cache còn Zustand chỉ giữ UI state như time range đã chọn). Hãy chọn phương án sạch và giải thích ngắn gọn lựa chọn trong README.
- Code phải **type-safe** (khai báo interface/type cho mọi API response).
- Hỗ trợ 3 trạng thái hiển thị cho **mỗi** widget: `loading` (skeleton), `no-data` ("No Data"), `error`.

---

## 2. TỔNG QUAN CHỨC NĂNG

Dashboard hiển thị tổng quan các chỉ số EDR theo **5 nhóm**: Agents, Events, Detection Engine, Alerts, Case. Tác nhân: System Admin, SOC Manager.

**Tiền điều kiện (giả định đã đăng nhập, có quyền xem):** không cần làm màn login, nhưng scaffold nên có chỗ để cắm auth guard sau này.

---

## 3. ĐẶC TẢ TỪNG WIDGET (14 widget)

> Mỗi widget ghi rõ: loại chart, nguồn dữ liệu (để đặt tên endpoint mock cho sát nghiệp vụ), và cách hiển thị.

### Nhóm 1 — AGENTS
1. **Top Agents** — *Bar chart (ngang)* — nguồn: OpenSearch.
   - Tối đa 10 agent phát sinh log/event nhiều nhất, sắp giảm dần.
   - Mỗi dòng: tên agent, thanh bar, số lượng log bên phải.
2. **Agent by Status** — *Donut* — nguồn: MySQL.
   - 2 giá trị: Online / Offline. Tổng ở giữa donut = Online + Offline.
   - Legend: màu + trạng thái + số lượng.
3. **Agent by OS Type** — *Donut* — nguồn: MySQL.
   - Theo OS: Windows, Linux, CentOS, RedHat, Ubuntu… mỗi OS 1 màu. Tổng ở giữa. Legend: màu + tên OS + số lượng.

### Nhóm 2 — EVENTS
4. **Event by Time** — *Column chart* — nguồn: OpenSearch.
   - Số lượng event theo thời gian. Time interval **tự động** theo time range. Hover cột → tooltip số lượng cụ thể.

### Nhóm 3 — DETECTION ENGINE
5. **Top Tactics** — *Donut* — nguồn: OpenSearch.
   - Group by Tactic, Count by AlertID. Tối đa 10 tactics. Tổng tactic ở giữa. Legend: màu + tên tactic + số lượng + **% tỉ lệ**.
6. **Rule Level by Attack** — *Bar chart (ngang)* — nguồn: OpenSearch.
   - Group by Technique, Count by AlertID, giảm dần. Tối đa 10 dòng: tên kỹ thuật + bar + số lượng.
7. **Rule Level by Time** — *Line chart* — nguồn: OpenSearch.
   - Trục X = thời gian (interval tự động), trục Y = số lượng rule.
   - Các đường theo level: **Information, Low, Medium, High, Critical**. Legend: màu + level + số lượng. Hover → tooltip.

### Nhóm 4 — ALERTS
8. **Alert by Severity** — *Number cards* — nguồn: OpenSearch.
   - 5 thẻ số, thứ tự trái→phải: **Critical, High, Medium, Low, Information**.
9. **Alert by Status** — *Donut* — nguồn: OpenSearch.
   - Trạng thái: **Escalated, New, Acknowledged**. Tổng alert ở giữa. Legend: màu + trạng thái + số lượng.
10. **Alert by Time** — *Column chart* — nguồn: OpenSearch.
    - Số lượng alert theo thời gian, interval tự động, hover → số lượng.

### Nhóm 5 — CASE
11. **Case by Severity** — *Number cards* — nguồn: MySQL.
    - 5 thẻ số, thứ tự: **Critical, High, Medium, Low, Informational**.
12. **Case by Status** — *Donut* — nguồn: MySQL.
    - Trạng thái: **Close, In progress, New**. Tổng case ở giữa. Legend: màu + trạng thái + số lượng.
13. **Case by Assignee** — *Bar chart (ngang)* — nguồn: MySQL.
    - Số lượng case **open** theo người được phân công, giảm dần, tối đa 10 assignee. Mỗi dòng: tên assignee + bar + số lượng.
14. **Case by Incident Tags** — *Donut* — nguồn: MySQL.
    - Theo trường Incident, 3 tag: **False positive, Suspicious, Incident**. Tổng ở giữa. Legend: màu + tag + số lượng.

---

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES — BẮT BUỘC ĐÚNG)

**4.1. Time Range**
- Toàn bộ dashboard hiển thị dữ liệu theo time range người dùng chọn.
- Mặc định khi mở lần đầu: **Last 7 days**.
- Có **DateTime Picker** với Quick range (Last 15 min, Last 1 hour, Last 24 hours, Last 7 days, Last 30 days, Custom range). Đổi time range → gọi lại API → cập nhật toàn bộ widget.

**4.2. Đồng nhất dữ liệu (Data Consistency) — mock data phải khớp tuyệt đối:**
- Tổng agent ở **Agent by Status** = tổng agent ở **Agent by OS Type**.
- Tổng alert ở **Alert by Severity** = tổng alert ở **Alert by Status**.
- Tổng case ở **Case by Severity** = tổng case ở **Case by Status** = tổng case ở **Case by Incident Tags**.
- Viết một **hàm validate** trong tầng mock (chạy khi khởi tạo) để assert 3 ràng buộc trên; nếu sai thì throw để dev phát hiện ngay.

**4.3. Trạng thái No Data**
- Nếu time range không có dữ liệu → mỗi widget không có data hiển thị trạng thái **"No Data"** riêng (không làm hỏng cả trang).

---

## 5. THIẾT KẾ STATE (ZUSTAND)

- `useDashboardStore`: giữ **time range** hiện tại (preset + custom start/end), action `setTimeRange`, cờ `isRefreshing`, action `refreshAll`.
- Tách state theo nhóm nếu cần (agents / events / detection / alerts / cases) hoặc để React Query giữ data từng widget, Zustand chỉ giữ filter dùng chung. Chọn 1 hướng, làm nhất quán.
- Selector phải tránh re-render thừa (dùng shallow / selector hợp lý).

---

## 6. MOCK API (MSW)

Thiết kế endpoint theo hướng **gom nhóm để tối ưu tải trang** nhưng vẫn tách được:
- `GET /api/dashboard/overview?from=...&to=...` → trả toàn bộ 14 widget trong 1 response (mặc định trang dùng cái này).
- Đồng thời expose endpoint lẻ cho từng nhóm để reload cục bộ:
  `/api/dashboard/agents`, `/api/dashboard/events`, `/api/dashboard/detection`, `/api/dashboard/alerts`, `/api/dashboard/cases` — tất cả nhận `from`, `to`.
- Response phải có TypeScript type rõ ràng, và tạo **2 bộ dữ liệu mock**:
  1. Bộ "đầy đủ" (thỏa 4.2).
  2. Bộ "No Data" (mảng rỗng / count = 0) để test 4.3 — kích hoạt được qua query param hoặc một preset time range đặc biệt.
- Thêm độ trễ giả lập (~300–800ms) để thấy skeleton loading.

---

## 7. CẤU TRÚC THƯ MỤC (CHIA MODULE)

Hãy tạo cây thư mục kiểu sau (điều chỉnh hợp lý nếu tốt hơn, nhưng giữ tính module hóa theo nhóm nghiệp vụ):

```
src/
  app/                      # App shell, layout, routing
    Layout.tsx
    App.tsx
  components/               # Component tái sử dụng, "dumb"
    charts/                 # DonutChart, BarChart, ColumnChart, LineChart, NumberCard (wrapper Recharts)
    ui/                     # Card, WidgetContainer, Skeleton, NoData, ErrorState, Legend
    filters/                # DateTimePicker, QuickRange
  features/                 # Chia theo 5 nhóm nghiệp vụ
    agents/                 # widget TopAgents, AgentByStatus, AgentByOsType + hooks
    events/                 # EventByTime
    detection/              # TopTactics, RuleLevelByAttack, RuleLevelByTime
    alerts/                 # AlertBySeverity, AlertByStatus, AlertByTime
    cases/                  # CaseBySeverity, CaseByStatus, CaseByAssignee, CaseByIncidentTags
  store/                    # Zustand stores/slices
  api/                      # client, query keys, react-query hooks
  mocks/                    # MSW handlers + mock data generators + consistency validator
  types/                    # Shared TypeScript types (Severity, Status, WidgetResponse...)
  lib/                      # helpers: time interval calc, color maps, formatters
  pages/
    DashboardPage.tsx       # Ghép toàn bộ 14 widget theo layout Figma
  main.tsx
```

---

## 8. YÊU CẦU GIAO DIỆN

- Bố cục lưới (grid) responsive bám theo Figma; ưu tiên desktop trước.
- Map màu theo severity/status nhất quán toàn app, khai báo tập trung trong `lib/colors.ts` + `tailwind.config.ts`:
  - Severity: Critical (đỏ đậm), High (cam), Medium (vàng), Low (xanh dương nhạt), Information/Informational (xám/xanh nhạt).
  - Status agent: Online (xanh lá), Offline (xám).
- Header dashboard: tiêu đề + DateTime Picker (góc phải) + nút Refresh.
- Mỗi widget nằm trong 1 Card thống nhất: tiêu đề + vùng chart + trạng thái loading/no-data/error.

---

## 9. HÀM TIỆN ÍCH BẮT BUỘC

- `getTimeInterval(from, to)`: tự chọn interval (phút/giờ/ngày) cho các chart theo thời gian dựa trên độ dài time range (dùng cho Event by Time, Alert by Time, Rule Level by Time).
- `formatNumber(n)`: rút gọn số lớn (1.2k, 3.4M).
- Validator đồng nhất dữ liệu (mục 4.2).

---

## 10. DELIVERABLES & TIÊU CHÍ NGHIỆM THU

Hãy sinh:
1. Toàn bộ file source theo cấu trúc mục 7, chạy được ngay với `npm install && npm run dev`.
2. `package.json` với đầy đủ dependency.
3. `README.md`: cách chạy, giải thích kiến trúc state, cách bật bộ mock "No Data".
4. MSW đã setup sẵn, tự bật ở môi trường dev.

**Chấp nhận khi:**
- Mở app → hiển thị đủ 14 widget với time range mặc định Last 7 days.
- Đổi time range → mọi widget reload theo range mới.
- 3 ràng buộc đồng nhất dữ liệu (4.2) đúng tuyệt đối và có validator kiểm tra.
- Có đủ trạng thái loading / no-data / error.
- Code TypeScript không lỗi type, chia module rõ ràng.

---

## 11. CÁCH LÀM VIỆC

Hãy **scaffold theo thứ tự**: (1) khởi tạo dự án + config → (2) types + colors + tokens → (3) mock data + validator + MSW handlers → (4) api layer + store → (5) chart wrappers + ui components → (6) từng feature widget → (7) ghép `DashboardPage` → (8) README.

Nếu có điểm nào trong đặc tả chưa rõ, hãy **giả định hợp lý và ghi chú lại trong README**, đừng dừng lại hỏi. Bắt đầu ngay.
