const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();


router.get('/hello', (ctx) => {
  ctx.body = '<h1>Hello, world</h1>';
});


router.get('/goodbye', (ctx) => {
  ctx.body = '<h1>Goodbye, world</h1>';
});


app.use(router.routes());
app.use(router.allowedMethods());


const PORT = 8080;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Serwer działa na http://127.0.0.1:${PORT}`);
});