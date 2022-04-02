const middleware = {
    middleware: (req, res, next) => {
        console.log(req.params) // { id: 'hi' }
        req.user = {
            username: "Tran Van Dung",
            password: 'Dung123',
            age: 21
        }
        console.log("Xin chao");
        next();
    }
}
module.exports = middleware;