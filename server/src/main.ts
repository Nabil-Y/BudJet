import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import helmet from "helmet";
import * as morgan from "morgan";
import { customLoggers } from "./utils/loggers";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix("api/v1");

  const { httpLogger, appLogger } = customLoggers;
  app.use(
    morgan(":method :url :status - :response-time ms", {
      stream: {
        write: (message) => httpLogger.log(message),
      },
    })
  );

  const port = process.env.PORT || "Port not specified";
  await app.listen(port);
  appLogger.log(`Application is running on port ${port}}`);
}

bootstrap();
