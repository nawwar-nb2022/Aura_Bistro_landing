import { FEATURES_DATA } from "@/data/static";
import type { FeatureType } from "@/data/types";

type FeatureDataResult =
    | { success: true; data: FeatureType[] }
    | { success: false; error: string };

export async function getFeatureData(): Promise<FeatureDataResult> {
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return { success: true, data: FEATURES_DATA };
    } catch (error) {
        console.error("[ACTIONS_GET_FEATURE_ERROR]:", error);

        return { success: false, error: "Unable to load features." };
    }
}