import { TESTIMONIALS_DATA } from "@/data/static";
import { Testimonial } from "@/data/types";

export async function getTestimonialsData(): Promise<Testimonial[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return TESTIMONIALS_DATA;
}