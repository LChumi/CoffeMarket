import { environment } from "@environments/environment";

const imageUrl = environment.imagesUrl;

export function getUrlImage(sku: string): string {
  if (!sku) return `${imageUrl}/default/bunna`;
  return `${imageUrl}/${sku}/bunna`;
}
