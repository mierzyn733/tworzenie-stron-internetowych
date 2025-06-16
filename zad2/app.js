const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/login', (ctx) => {
  ctx.type = 'text/html; charset=utf-8';
  ctx.body = `
  <!DOCTYPE html>
  <html lang="pl">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Logowanie</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      .container { max-width: 400px; margin: 0 auto; }
      .form-group { margin-bottom: 15px; }
      label { display: block; margin-bottom: 5px; font-weight: bold; cursor: pointer; }
      input[type="text"], 
      input[type="password"] {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        margin-top: 4px;
      }
      button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 15px;
        border: none;
        cursor: pointer;
        width: 100%;
        font-size: 16px;
      }
      .error { color: red; margin-top: 5px; display: none; }
      input:invalid + .error { display: block; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Logowanie</h2>
      <form action="/login" method="POST">
        <div class="form-group">
          <label for="username">Nazwa użytkownika:</label>
          <input type="text" id="username" name="username" required>
        </div>
        
        <div class="form-group">
          <label for="password">Hasło:</label>
          <input type="password" id="password" name="password" 
                 minlength="8" required
                 title="Hasło musi mieć co najmniej 8 znaków">
          <div class="error">Hasło musi mieć co najmniej 8 znaków</div>
        </div>
        
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  </body>
  </html>
  `;
});

router.post('/login', (ctx) => {
  const { username, password } = ctx.request.body;
  
  if (password.length < 8) {
    ctx.status = 400;
    ctx.body = 'To hasło jest zbyt krótkie';
    return;
  }
  
  if (username === 'admin' && password === 'adminadmin') {
    ctx.body = '<!DOCTYPE html><html><head><title>Zalogowano</title></head><body><h1>zalogowany!</h1></body></html>';
  } else {
    ctx.status = 401;
    ctx.body = '<!DOCTYPE html><html><head><title>Błąd</title></head><body><h1>Nieprawidłowa nazwa użytkownika lub hasło</h1></body></html>';
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Serwer działa na http://127.0.0.1:${PORT}`);
});