import { z } from "zod";
import { schema } from "./FormSchema";

export type FormData = z.infer<typeof schema>;
