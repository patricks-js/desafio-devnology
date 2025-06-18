import { Injectable } from "@nestjs/common";
import { EuropeanProviderProductDTO } from "../dtos/european-provider.dto";
import { ProductDTO } from "../dtos/product.dto";

@Injectable()
export class EuropeanProviderMapper {
  public toProductDTOList(rawList: EuropeanProviderProductDTO[]): ProductDTO[] {
    return rawList.map((raw) => this.toProductDTO(raw));
  }

  public toProductDTO(raw: EuropeanProviderProductDTO): ProductDTO {
    const priceInCents = Math.round(Number(raw.price) * 100) || 0;
    const discountPercentage = raw.hasDiscount ? Number(raw.discountValue) : 0;

    const discountInCents = raw.hasDiscount
      ? Math.round(priceInCents * discountPercentage)
      : 0;

    const finalPriceInCents = priceInCents - discountInCents;

    return {
      id: `provider_eu_${raw.id}`,
      name: raw.name ?? "Produto sem nome",
      description: raw.description ?? "",
      category: raw.details.adjective,
      department: "", // * Not expected in this provider
      imagesUrl: raw.gallery,
      material: raw.details?.material ?? "",
      price: finalPriceInCents,
      hasDiscount: raw.hasDiscount,
      discountPercentage: discountPercentage,
    };
  }
}
