# Server cho Demo app, dùng NodeJs, ExpressJs, với Mongodb lưu session
## ENV
### Dev locahost
Sử dụng ENV trên Replit, nếu deploy trên localhost thì thay production="false"(dùng text thay vì true/false để không lỗi, chỉ cần dùng JSON.parse(process.env.product )
ENV co bao gồm database="....." để lưu session
### Dev enviroment
production="false"/"true" sẽ quyết định biến origin để cookie gửi qua http hay https, do Chrome và các Web browser hiện đại yêu cầu Session cookie gưi qua https khác với HTTP nên product="false" sẽ edit origin và cookie cho http(http có secure: 'auto' và sameSite:'lax') và production="true" sẽ edit cookie cho https(secure:true và sameSite:'none').
### process.env.production
production="true", và khi đó origin sẽ là ['https://fir-match-making.web.app'], nếu production="false" origin sẽ là ['http://localhost:3000']

## Đăng nhập google
### Firebase UID
App demo sẽ không có chức năng check UID từ Firebase có trùng với UID trong list riêng, mọi UID của https://fir-match-making.web.app gửi về sẽ được tự động đăng nhập, app chính có thể bước xác nhận và tạo Role
### Session
Sử dụng Mongodb để store các Session sau khi đăng nhập từ Firebase UID
### Chỉ nhận fetch từ Client trên fir-match-making.web.app
Dùng origin ở trên, với middleware đơn giản, cho phép tương lai có thể thêm các Client khác
```
app.use((req, res, next) => {
    if (origin.includes(req.get('origin'))) {
        app.set('trust proxy', 1)
        res.setHeader("Access-Control-Allow-Origin", true);
        // res.header('Access-Control-Allow-Credentials', true)
        next()
    }
});
```
## Khác
### Client github tại https://github.com/dreemurgithub/Demo_match_app

### Cách lưu từ Client mà không bị xung đột với các Client khác
Mỗi Client sẽ xử lý tầm 6-8 người chơi, tức là 6-8 key trong hashmap từ danh sách người chơi. Mỗi lệnh update vào với put request lên /write_json/edit sẽ chỉ thay đổi đúng key mà Client đang xử lí. Ví dụ có 16 cặp đấu(32 người chơi) và 4 Client xử lí 4 cặp(8 người), Client 1 sẽ xử lí key 0 tới 7, Client 2 xử lí từ 8 tới 15, Client 3 sẽ xử lí từ 16 tới 23 và Client 4 xử lí từ 24 tới 31. Như vậy mỗi lần thay đổi sẽ chỉ edit đúng key trong hashmap, không ảnh hưởng các key khác(của Client khác)
