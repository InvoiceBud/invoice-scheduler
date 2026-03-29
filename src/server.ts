import closeWithGrace from "close-with-grace";
import * as dotenv from "dotenv";
import Fastify from "fastify";
import app from "./app";

dotenv.config();

const fastify = Fastify({
  logger: { 
    level: process.env.NODE_ENV === "production" ? "info" : "debug", 
  }
});

fastify.register(app);

closeWithGrace(
  { delay: parseInt(process.env.FASTIFY_CLOSE_GRACE_DELAY!) || 500 },
  async function ({ signal, err, manual }) {
    if (err) {
      fastify.log.error(err);
    }

    await fastify.close();
  } as closeWithGrace.CloseWithGraceAsyncCallback,
);

fastify.listen(
  { host: "0.0.0.0", port: Number(process.env.PORT) || 8000 },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }

    fastify.log.info(`Connected to Main Server`);
  },
);
