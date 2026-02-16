import closeWithGrace from "close-with-grace";
import * as dotenv from "dotenv";
import Fastify from "fastify";
import app from "./src/app";

dotenv.config();

const server = Fastify({
  logger: true,
});

server.register(app);

closeWithGrace(
  { delay: parseInt(process.env.FASTIFY_CLOSE_GRACE_DELAY!) || 500 },
  async function ({ signal, err, manual }) {
    if (err) {
      server.log.error(err);
    }

    await server.close();
  } as closeWithGrace.CloseWithGraceAsyncCallback
);

server.listen({ port: parseInt(process.env.PORT!) || 8000 }, (err: any) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
