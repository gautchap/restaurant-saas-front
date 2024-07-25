import type { Item } from "@/types/itemSchema";
import { nanoid } from "nanoid";

type ListItemsType = Omit<Item, "userId" | "x" | "y">;

export const ListItems = [
    {
        id: nanoid(3),
        type: "table",
        name: "Table 1",
        shape: "rectangle",
        chairPos: [1, 2, 3, 4],
        tableNumber: 0,
    },
    {
        id: nanoid(3),
        type: "table",
        name: "Table 2",
        shape: "circle",
        chairPos: [1, 2, 3, 4],
        tableNumber: 0,
    },
    {
        id: nanoid(3),
        type: "chair",
        name: "Chaise",
        shape: "circle",
        chairPos: [1, 2, 3, 4],
        tableNumber: 0,
    },
] satisfies ListItemsType[];
