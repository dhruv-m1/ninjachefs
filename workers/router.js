
import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import MessageBroker from "./message-broker/mod.js";

const router = new Router();

router.get("/enqueue", async(ctx) => {

    await MessageBroker.enqueue('ai-assist', 'add', { _id: '1234' });

    ctx.response.body = `Done...`;
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ hostname: '127.0.0.1', port: 8011 });