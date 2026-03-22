import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: 'D:/Projects/talesorea/tina/__generated__/.cache/1774172542705', url: 'http://localhost:4001/graphql', token: 'ffafc957631558f92475687dc353594544811606', queries,  });
export default client;
  