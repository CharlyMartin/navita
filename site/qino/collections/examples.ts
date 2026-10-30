import { z } from "zod";
import qino from "../";

export const exampleCollection = qino.defineCollection({
  directory: "examples",
  extension: ".md",
  schema: z.object({}),
});
