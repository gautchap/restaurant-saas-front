import type { Item } from "@/types/itemSchema";
import { nanoid } from "nanoid";

type ListItemsType = Omit<Item, "userId" | "x" | "y">;

export const ListItems = [
    { id: nanoid(3), type: "table", name: "Table 1", shape: "rectangle" },
    { id: nanoid(3), type: "table", name: "Table 2", shape: "circle" },
    { id: nanoid(3), type: "chair", name: "Chaise", shape: "circle" },
] satisfies ListItemsType[];
