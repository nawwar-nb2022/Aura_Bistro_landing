import { FEATURES_DATA } from "@/data/static";
import { Feature } from "@/data/types";

export async function getFeaturesData(): Promise<Feature[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return FEATURES_DATA;
}