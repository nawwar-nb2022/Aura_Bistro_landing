import { MENU_DATA } from "@/data/static";
import { MenuCategory } from "@/data/types";

export async function getMenuData(): Promise<MenuCategory[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MENU_DATA;
}
