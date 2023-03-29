# Server cho Demo chess app, dùng NodeJs, ExpressJs, với Mongodb lưu session
## ENV
### Dev locahost
Sử dụng ENV trên Replit, nếu deploy trên localhost thì thay production="false"(dùng text thay vì true/false để không lỗi, chỉ cần dùng JSON.parse(process.env.product )
ENV co bao gồm database="....." để lưu session
### Deploy và dev
production="true", và khi đó origin sẽ là ['https://fir-match-making.web.app'], nếu production="false" origin sẽ là ['http://localhost:3000']
## Đăng nhập google
### Firebase UID
App demo sẽ không có chức năng check UID từ Firebase có trùng với UID trong list riêng, mọi UID của https://fir-match-making.web.app gửi về sẽ được tự động đăng nhập, app chính có thể bước xác nhận và tạo Role
### Session
Sử dụng Mongodb để store các Session sau khi đăng nhập từ Firebase UID
### Chỉ nhận fetch từ Client trên fir-match-making.web.app
Dùng origin ở trên, với middleware đơn giản

...
app.use((req, res, next) => {
    if (origin.includes(req.get('origin'))) {
        app.set('trust proxy', 1)
        res.setHeader("Access-Control-Allow-Origin", true);
        // res.header('Access-Control-Allow-Credentials', true)
        next()
    }
});
...
