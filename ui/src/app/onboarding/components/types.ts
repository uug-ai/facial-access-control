import { z } from "zod";
import { schema } from "./formSchema";

export type FormData = z.infer<typeof schema>;
