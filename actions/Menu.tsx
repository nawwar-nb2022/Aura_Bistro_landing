import { MENU_DATA } from "@/data/static";
import { DataResult, MenuCategory } from "@/data/types";

export async function getMenuData(): Promise<Promise<DataResult<MenuCategory[]>>> {
    try {
        // Simulate network call or database query
        await new Promise((resolve) => setTimeout(resolve, 200));

        // Optional: Simulate unexpected error for testing
        // throw new Error("Database connection failed");

        return { success: true, data: MENU_DATA }
            ;
    } catch (error) {
        console.error('[ACTIONS_GET_MENU_ERROR]:', error);

        // Return safe fallback data so the UI doesn't crash
        return { success: false, error: "Unable to load menu data." };
    }
}