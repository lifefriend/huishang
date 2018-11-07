import * as Koa from 'koa';
import * as Router from "koa-router";
import * as db from "./db/db"
 
const app = new Koa();
 
app.use(async (ctx, next) => {
  // Log the request to the console
  console.log("Url: ", ctx.url);
  // Pass the request to the next middleware function
  await next();
})
 
const router = new Router();
 
router.get('/getAll', async (ctx) => {
  ctx.body = await db.findAll();
})
router.get('/create', async (ctx) => {
  ctx.body = await db.create();
})

router.get('/*', async (ctx) => {
  ctx.body = "Hi TS!";
})
 
app.use(router.routes());
 
app.listen(8080);
 
console.log("Server running on port 8080");