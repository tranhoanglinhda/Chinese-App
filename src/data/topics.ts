import { Topic } from '../types';

export const topics: Topic[] = [
  {
    id: "multi-attribute",
    title: "Định ngữ đa tầng (多项定语)",
    description: "Học cách sắp xếp các thành phần bổ nghĩa cho danh từ theo đúng thứ tự.",
    icon: "Layers",
    questions: [
      {
        id: 1,
        scrambled: [
          { id: "1-1", text: "书包" },
          { id: "1-2", text: "红色的" },
          { id: "1-3", text: "我的" }
        ],
        correctIds: ["1-3", "1-2", "1-1"],
        translation: "Cái cặp sách màu đỏ của tôi",
        explanation: "Thứ tự: Sở hữu (我的) -> Màu sắc (红色的) -> Trung tâm ngữ (书包)."
      },
      {
        id: 2,
        scrambled: [
          { id: "2-1", text: "一个" },
          { id: "2-2", text: "孩子" },
          { id: "2-3", text: "聪明的" }
        ],
        correctIds: ["2-1", "2-3", "2-2"],
        translation: "Một đứa trẻ thông minh",
        explanation: "Thứ tự: Số lượng (一个) -> Miêu tả (聪明的) -> Trung tâm ngữ (孩子)."
      },
      {
        id: 3,
        scrambled: [
          { id: "3-1", text: "新" },
          { id: "3-2", text: "雨伞" },
          { id: "3-3", text: "这把" }
        ],
        correctIds: ["3-3", "3-1", "3-2"],
        translation: "Chiếc ô mới này",
        explanation: "Thứ tự: Chỉ thị (这把) -> Trạng thái (新) -> Trung tâm ngữ (雨伞)."
      },
      {
        id: 4,
        scrambled: [
          { id: "4-1", text: "衣服" },
          { id: "4-2", text: "两件" },
          { id: "4-3", text: "漂亮的" }
        ],
        correctIds: ["4-2", "4-3", "4-1"],
        translation: "Hai bộ quần áo đẹp",
        explanation: "Thứ tự: Số lượng (两件) -> Miêu tả (漂亮的) -> Trung tâm ngữ (衣服)."
      },
      {
        id: 5,
        scrambled: [
          { id: "5-1", text: "皮鞋" },
          { id: "5-2", text: "黑色" },
          { id: "5-3", text: "妈妈的" },
          { id: "5-4", text: "那双" }
        ],
        correctIds: ["5-3", "5-4", "5-2", "5-1"],
        translation: "Đôi giày da màu đen đó của mẹ",
        explanation: "Thứ tự: Sở hữu (妈妈的) -> Chỉ thị (那双) -> Màu sắc (黑色) -> Trung tâm ngữ (皮鞋)."
      },
      {
        id: 6,
        scrambled: [
          { id: "6-1", text: "衣服" },
          { id: "6-2", text: "很多" },
          { id: "6-3", text: "漂亮" },
          { id: "6-4", text: "她的" }
        ],
        correctIds: ["6-4", "6-3", "6-1", "6-2"],
        translation: "Quần áo đẹp của cô ấy rất nhiều.",
        explanation: "Thứ tự: Sở hữu (她的) -> Miêu tả (漂亮) -> Danh từ (衣服) -> Vị ngữ (很多)."
      },
      {
        id: 7,
        scrambled: [
          { id: "7-1", text: "丢了" },
          { id: "7-2", text: "旧书" },
          { id: "7-3", text: "那本" }
        ],
        correctIds: ["7-3", "7-2", "7-1"],
        translation: "Quyển sách cũ đó mất rồi.",
        explanation: "Thứ tự: Chỉ thị/Số lượng (那本) -> Tính chất (旧) -> Danh từ (书) -> Vị ngữ (丢了)."
      },
      {
        id: 8,
        scrambled: [
          { id: "8-1", text: "一本书" },
          { id: "8-2", text: "找不到" },
          { id: "8-3", text: "了" },
          { id: "8-4", text: "她的" }
        ],
        correctIds: ["8-4", "8-1", "8-2", "8-3"],
        translation: "Một quyển sách của cô ấy không tìm thấy nữa.",
        explanation: "Thứ tự: Sở hữu (她的) -> Số lượng (一本书) -> Vị ngữ (找不到了)."
      },
      {
        id: 9,
        scrambled: [
          { id: "9-1", text: "北京" },
          { id: "9-2", text: "历史" },
          { id: "9-3", text: "建筑" },
          { id: "9-4", text: "著名的" }
        ],
        correctIds: ["9-1", "9-4", "9-2", "9-3"],
        translation: "Các công trình kiến trúc lịch sử nổi tiếng của Bắc Kinh",
        explanation: "Thứ tự: Địa điểm (北京) -> Miêu tả (著名的) -> Loại hình (历史) -> Trung tâm ngữ (建筑)."
      },
      {
        id: 10,
        scrambled: [
          { id: "10-1", text: "全国" },
          { id: "10-2", text: "一年的" },
          { id: "10-3", text: "财政收入" }
        ],
        correctIds: ["10-1", "10-2", "10-3"],
        translation: "Thu nhập tài chính một năm của cả nước",
        explanation: "Thứ tự: Phạm vi (全国) -> Thời gian (一年的) -> Trung tâm ngữ (财政收入)."
      },
      {
        id: 11,
        scrambled: [
          { id: "11-1", text: "母亲" },
          { id: "11-2", text: "八十多岁的" },
          { id: "11-3", text: "我的" }
        ],
        correctIds: ["11-3", "11-2", "11-1"],
        translation: "Người mẹ ngoài 80 tuổi của tôi",
        explanation: "Thứ tự: Sở hữu (我的) -> Trạng thái/Đặc điểm (八十多岁的) -> Trung tâm ngữ (母亲)."
      },
      {
        id: 12,
        scrambled: [
          { id: "12-1", text: "家具" },
          { id: "12-2", text: "房间里的" },
          { id: "12-3", text: "古色古香的" }
        ],
        correctIds: ["12-2", "12-3", "12-1"],
        translation: "Đồ đạc mang phong cách cổ xưa trong phòng",
        explanation: "Thứ tự: Địa điểm (房间里的) -> Miêu tả tính chất (古色古香的) -> Trung tâm ngữ (家具)."
      },
      {
        id: 13,
        scrambled: [
          { id: "13-1", text: "词典" },
          { id: "13-2", text: "汉语" },
          { id: "13-3", text: "从朋友那儿借来的" }
        ],
        correctIds: ["13-3", "13-2", "13-1"],
        translation: "Quyển từ điển tiếng Trung mượn từ chỗ bạn bè",
        explanation: "Thứ tự: Cụm động từ miêu tả (从朋友那儿借來的) -> Loại hình chuyên môn (汉语) -> Trung tâm ngữ (词典)."
      },
      {
        id: 14,
        scrambled: [
          { id: "14-1", text: "衣服" },
          { id: "14-2", text: "有地方特色的" },
          { id: "14-3", text: "布" }
        ],
        correctIds: ["14-2", "14-3", "14-1"],
        translation: "Quần áo vải mang đặc sắc địa phương",
        explanation: "Thứ tự: Miêu tả tính chất (有地方特色的) -> Chất liệu (布) -> Trung tâm ngữ (衣服)."
      },
      {
        id: 15,
        scrambled: [
          { id: "15-1", text: "很重要" },
          { id: "15-2", text: "这段话" },
          { id: "15-3", text: "老师的" },
          { id: "15-4", text: "黑板上" }
        ],
        correctIds: ["15-4", "15-3", "15-2", "15-1"],
        translation: "Đoạn lời này của giáo viên trên bảng đen rất quan trọng.",
        explanation: "Thứ tự: Địa điểm (黑板上) -> Sở hữu (老师的) -> Trung tâm ngữ (这段话)."
      },
      {
        id: 16,
        scrambled: [
          { id: "16-1", text: "同事" },
          { id: "16-2", text: "过去的" },
          { id: "16-3", text: "一位" },
          { id: "16-4", text: "我们单位" }
        ],
        correctIds: ["16-4", "16-2", "16-3", "16-1"],
        translation: "Một người đồng nghiệp cũ của đơn vị chúng tôi",
        explanation: "Thứ tự: Đơn vị sở hữu (Chúng ta đơn vị) -> Thời gian (过去的) -> Số lượng (一位) -> Trung tâm ngữ (同事)."
      },
      {
        id: 17,
        scrambled: [
          { id: "17-1", text: "尴尬" },
          { id: "17-2", text: "问题" },
          { id: "17-3", text: "难以启齿的" }
        ],
        correctIds: ["17-3", "17-1", "17-2"],
        translation: "Vấn đề lúng túng khó nói ra",
        explanation: "Thứ tự: Cụm miêu tả dài (难以启齿的) -> Tính từ ngắn (尴尬) -> Trung tâm ngữ (问题)."
      },
      {
        id: 18,
        scrambled: [
          { id: "18-1", text: "活动室" },
          { id: "18-2", text: "关门" },
          { id: "18-3", text: "操场" },
          { id: "18-4", text: "北面的" },
          { id: "18-5", text: "那间" },
          { id: "18-6", text: "了" }
        ],
        correctIds: ["18-3", "18-4", "18-5", "18-1", "18-2", "18-6"],
        translation: "Phòng sinh hoạt đó ở phía bắc sân vận động đóng cửa rồi.",
        explanation: "Thứ tự: Địa điểm (操场北面的) -> Chỉ thị/Số lượng (那间) -> Trung tâm ngữ (活动室) -> Vị ngữ."
      },
      {
        id: 19,
        scrambled: [
          { id: "19-1", text: "这是一张" },
          { id: "19-2", text: "彩色照片" },
          { id: "19-3", text: "从报纸上剪下来的" }
        ],
        correctIds: ["19-1", "19-3", "19-2"],
        translation: "Đây là một tấm ảnh màu cắt xuống từ báo chí.",
        explanation: "Thứ tự: Chỉ thị/Số lượng (这是一张) -> Cụm động từ miêu tả (从报纸上剪下来的) -> Trung tâm ngữ (彩色照片)."
      },
      {
        id: 20,
        scrambled: [
          { id: "20-1", text: "一封" },
          { id: "20-2", text: "乱七八糟的" },
          { id: "20-3", text: "信" },
          { id: "20-4", text: "草草写成的" }
        ],
        correctIds: ["20-4", "20-2", "20-1", "20-3"],
        translation: "Một lá thư lộn xộn viết vội",
        explanation: "Thứ tự: Cụm động từ miêu tả (草草写成的) -> Miêu tả trạng thái (乱七八糟的) -> Số lượng (一封) -> Trung tâm ngữ (信)."
      },
      {
        id: 21,
        scrambled: [
          { id: "21-1", text: "吸引了很多游客" },
          { id: "21-2", text: "家具" },
          { id: "21-3", text: "房间里的" },
          { id: "21-4", text: "古色古香的" }
        ],
        correctIds: ["21-3", "21-4", "21-2", "21-1"],
        translation: "Đồ đạc mang phong cách cổ xưa trong phòng đã thu hút rất nhiều du khách.",
        explanation: "Thứ tự: Địa điểm (房间里的) -> Miêu tả (古色古香的) -> Danh từ chính (家具) -> Vị ngữ."
      },
      {
        id: 22,
        scrambled: [
          { id: "22-1", text: "是" },
          { id: "22-2", text: "文章" },
          { id: "22-3", text: "这是一一" },
          { id: "22-4", text: "篇" },
          { id: "22-5", text: "刚写完的" },
          { id: "22-6", text: "乱七八糟的" }
        ],
        correctIds: ["22-3", "22-4", "22-5", "22-6", "22-2"],
        alternativeCorrectIds: [
          ["22-3", "22-5", "22-6", "22-4", "22-2"]
        ],
        translation: "Đây là một bài văn lộn xộn vừa viết xong.",
        explanation: "Câu này có thể để '一篇' ở trước hoặc sau định ngữ miêu tả."
      },
      {
        id: 23,
        scrambled: [
          { id: "23-1", text: "那个" },
          { id: "23-2", text: "个子比一般人高的" },
          { id: "23-3", text: "年轻" },
          { id: "23-4", text: "工人" },
          { id: "23-5", text: "今天迟到了" }
        ],
        correctIds: ["23-1", "23-2", "23-3", "23-4", "23-5"],
        alternativeCorrectIds: [
          ["23-2", "23-1", "23-3", "23-4", "23-5"]
        ],
        translation: "Người công nhân trẻ cao hơn người bình thường đó hôm nay đã đến muộn.",
        explanation: "Thành phần chỉ thị '那个' có thể đứng trước hoặc sau cụm miêu tả dài '个子比一般人高的'."
      },
      {
        id: 24,
        scrambled: [
          { id: "24-1", text: "衬衫" },
          { id: "24-2", text: "丝绸" },
          { id: "24-3", text: "一件" },
          { id: "24-4", text: "非常漂亮的" },
          { id: "24-5", text: "我有一" }
        ],
        correctIds: ["24-5", "24-3", "24-4", "24-2", "24-1"],
        translation: "Tôi có một chiếc áo sơ mi lụa rất đẹp.",
        explanation: "Thứ tự: Số lượng (一件) -> Miêu tả (非常漂亮的) -> Chất liệu (丝绸) -> Danh từ (衬衫)."
      },
      {
        id: 25,
        scrambled: [
          { id: "25-1", text: "那条" },
          { id: "25-2", text: "山溪" },
          { id: "25-3", text: "木屋后面的" },
          { id: "25-4", text: "清澈" },
          { id: "25-5", text: "他就象" }
        ],
        correctIds: ["25-5", "25-1", "25-3", "25-4", "25-2"],
        alternativeCorrectIds: [
          ["25-5", "25-3", "25-1", "25-4", "25-2"]
        ],
        translation: "Anh ấy giống như con suối trong vắt phía sau ngôi nhà gỗ đó.",
        explanation: "Chỉ thị '那条' có thể đứng trước hoặc sau cụm địa điểm '木屋后面的'."
      },
      {
        id: 26,
        scrambled: [
          { id: "26-1", text: "一个" },
          { id: "26-2", text: "最大的" },
          { id: "26-3", text: "工业城市" },
          { id: "26-4", text: "上海是" },
          { id: "26-5", text: "中国" }
        ],
        correctIds: ["26-4", "26-5", "26-2", "26-1", "26-3"],
        translation: "Thượng Hải là một thành phố công nghiệp lớn nhất của Trung Quốc.",
        explanation: "Thứ tự: Phạm vi (中国) -> Trạng thái so sánh nhất (最大的) -> Số lượng (一个) -> Trung tâm ngữ (工业城市)."
      },
      {
        id: 27,
        scrambled: [
          { id: "27-1", text: "同事" },
          { id: "27-2", text: "已经辞职了" },
          { id: "27-3", text: "年轻" },
          { id: "27-4", text: "一位" },
          { id: "27-5", text: "过去的一" },
          { id: "27-6", text: "我们单位" }
        ],
        correctIds: ["27-6", "27-5", "27-4", "27-3", "27-1", "27-2"],
        translation: "Một người đồng nghiệp trẻ tuổi trước đây của đơn vị chúng tôi đã từ chức rồi.",
        explanation: "Thứ tự: Đơn vị (我们单位) -> Thời gian (过去的) -> Số lượng (一位) -> Miêu tả (年轻) -> Trung tâm ngữ."
      },
      {
        id: 28,
        scrambled: [
          { id: "28-1", text: "从朋友那里借来的" },
          { id: "28-2", text: "藏族服装" },
          { id: "28-3", text: "漂亮的" },
          { id: "28-4", text: "一身" },
          { id: "28-5", text: "她穿了" }
        ],
        correctIds: ["28-5", "28-4", "28-1", "28-3", "28-2"],
        alternativeCorrectIds: [
          ["28-5", "28-1", "28-4", "28-3", "28-2"]
        ],
        translation: "Cô ấy mặc một bộ trang phục Tây Tạng xinh đẹp mượn từ chỗ bạn bè.",
        explanation: "Cụm động từ '从朋友那里借来的' có thể đứng trước hoặc sau số lượng '一身'."
      },
      {
        id: 29,
        scrambled: [
          { id: "29-1", text: "羊皮大衣" },
          { id: "29-2", text: "那件" },
          { id: "29-3", text: "刚买的" },
          { id: "29-4", text: "也拿来了" },
          { id: "29-5", text: "她的" }
        ],
        correctIds: ["29-5", "29-2", "29-3", "29-1", "29-4"],
        alternativeCorrectIds: [
          ["29-5", "29-3", "29-2", "29-1", "29-4"]
        ],
        translation: "Chiếc áo khoác da cừu vừa mới mua đó của cô ấy cũng mang đến rồi.",
        explanation: "Thứ tự: Sở hữu (她的) -> Chỉ thị/Hành động miêu tả có thể đổi chỗ linh hoạt."
      },
      {
        id: 30,
        scrambled: [
          { id: "30-1", text: "精美的" },
          { id: "30-2", text: "词典" },
          { id: "30-3", text: "我的" },
          { id: "30-4", text: "汉语" },
          { id: "30-5", text: "非常贵" },
          { id: "30-6", text: "那本" }
        ],
        correctIds: ["30-3", "30-6", "30-1", "30-4", "30-2", "30-5"],
        translation: "Quyển từ điển tiếng Trung tinh xảo đó của tôi rất đắt.",
        explanation: "Thứ tự: Sở hữu (我的) -> Chỉ thị (那本) -> Miêu tả (精美的) -> Chuyên môn (汉语) -> Danh từ (词典)."
      }
    ],
    theory: `
# Lý thuyết về Định ngữ đa tầng (多项定语)

### 1. Định nghĩa định ngữ và định ngữ đa tầng

**Định ngữ** là thành phần đứng trước danh từ (trung tâm ngữ) để tu sức, hạn định hoặc miêu tả cho danh từ đó. Trong tiếng Trung, định ngữ giúp xác định rõ đối tượng được nhắc đến.

**Định ngữ đa tầng** là trường hợp có từ hai định ngữ trở lên cùng bổ nghĩa cho một danh từ. Việc sắp xếp các định ngữ này phải tuân theo một trật tự logic và chuẩn mực ngữ pháp.

---

### 2. Phân loại định ngữ

Định ngữ được chia làm hai loại dựa trên chức năng:

*   **Định ngữ hạn định (限制性定语):** Xác định phạm vi, số lượng, thời gian, nơi chốn hoặc quan hệ sở hữu. Trả lời cho câu hỏi: *Của ai? Cái nào? Bao nhiêu?*
*   **Định ngữ miêu tả (描写性定语):** Miêu tả tính chất, trạng thái hoặc đặc điểm của sự vật. Trả lời cho câu hỏi: *Như thế nào?*

---

### 3. Thứ tự sắp xếp định ngữ

Thông thường, trình tự sắp xếp định ngữ trong tiếng Trung tuân theo các quy tắc chính sau:

**Quy tắc [1]: Hạn định trước, miêu tả sau (先限制后描写)**
Đây là nguyên tắc cơ bản nhất: các thành phần xác định đối tượng luôn đứng trước các thành phần miêu tả tính chất.
*   *Ví dụ:* **我的** (hạn định) **漂亮** (miêu tả) 衣服 (Quần áo đẹp của tôi).

**Quy tắc [2]: Trật từ trong nhóm hạn định**
Thứ tự các thành phần hạn định thường là: 
> **Địa điểm / Phạm vi → Sở hữu → Thời gian → Số lượng**
*   *Ví dụ:* **学校** (địa điểm) **老师的** (sở hữu) **三本** (số lượng) 书.

**Quy tắc [3]: Miêu tả tính trạng đứng gần trung tâm ngữ**
Các từ miêu tả bản chất hoặc đặc điểm tính trạng của sự vật thường đứng sát danh từ trung tâm nhất.
*   *Ví dụ:* 一件漂亮的**新**衬衫 (Một chiếc áo sơ mi mới xinh đẹp - "mới" là đặc điểm trực tiếp của áo).

**Quy tắc [4]: Động từ miêu tả đứng trước tính từ miêu tả**
Các cụm từ miêu tả có tính chất hành động (thường là cụm động từ hoặc cụm chủ vị) thường đứng trước các tính từ miêu tả đơn thuần.
*   *Ví dụ:* **他刚买的** (động từ) **红** (tính từ) 领带 (Chiếc cà vạt màu đỏ anh ấy vừa mới mua).

---

### 4. Ví dụ cụ thể

Phân tích trật tự: *"Vị giáo viên tiếng Trung xinh đẹp mới đến đó của trường tôi"*

**[学校的] [一位] [新来的] [漂亮的] [汉语] 老师**

1.  **学校的:** Địa điểm/Phạm vi [1]
2.  **一位:** Số lượng [2]
3.  **新來的:** Cụm động từ miêu tả (mới đến) [3]
4.  **漂亮的:** Tính từ miêu tả (xinh đẹp) [4]
5.  **汉语:** Đặc điểm chuyên môn - Sát trung tâm ngữ [5]
6.  **老师:** **DANH TỪ TRUNG TÂM**

---
Lưu ý: Thứ tự nêu trên chỉ là thứ tự thường xuất hiện nhất (thứ tự mang tính chất khuynh hướng), trong thực tế sử dụng ngôn ngữ đôi khi sẽ có những trường hợp ngoại lệ (ví dụ đối với định ngữ số lượng có thể thay đổi vị trí tùy vào mục đích nhấn mạnh).
`
  },
  {
    id: "multi-adverbial",
    title: "Trạng ngữ đa tầng (多项状语)",
    description: "Học cách sắp xếp các thành phần trạng ngữ trước động từ/tính từ. (Sắp ra mắt)",
    icon: "ListOrdered",
    questions: [],
    theory: `
# Lý thuyết về Trạng ngữ đa tầng (多项状语)

*(Nội dung này đang được biên soạn...)*

---

Trạng ngữ là thành phần đứng trước động từ hoặc tính từ để bổ nghĩa về thời gian, địa điểm, cách thức, đối tượng... 

Khi có nhiều trạng ngữ, trật tự thường là:
1.  **Thời gian** (Khi nào?)
2.  **Địa điểm / Nơi chốn** (Ở đâu?)
3.  **Đối tượng / Cách thức** (Cùng ai? Như thế nào?)
4.  **ĐỘNG TỪ / TÍNH TỪ**

Hẹn gặp lại bạn ở phiên bản cập nhật tiếp theo!
`
  }
];
