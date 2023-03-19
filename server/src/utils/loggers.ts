import { Logger } from "@nestjs/common";

export const customLoggers = {
  httpLogger: new Logger("HTTP"),
  appLogger: new Logger("HTNestApplicationTP"),
};
