import { Injectable } from "@nestjs/common";
import { BrazilianProviderProductDTO } from "../dtos/brazilian-provider.dto";
import { ProductDTO } from "../dtos/product.dto";

@Injectable()
export class BrazilianProviderMapper {
  public toProductDTOList(rawProducts: any[]): ProductDTO[] {
    const result: ProductDTO[] = [];

    for (const entry of rawProducts) {
      if (Array.isArray(entry)) {
        for (const item of entry) {
          const normalized = this.toProductDTO(item);

          if (normalized) result.push(normalized);
        }
      } else if (typeof entry === "object") {
        const keys = Object.keys(entry);

        for (const key of keys) {
          const item = entry[key];

          if (typeof item === "object" && item !== null && "id" in item) {
            const normalized = this.toProductDTO(item);
            if (normalized) result.push(normalized);
          }
        }
      }
    }

    const uniqueById = new Map<string, ProductDTO>();
    for (const product of result) {
      uniqueById.set(product.id, product);
    }

    return Array.from(uniqueById.values());
  }

  public toProductDTO(raw: BrazilianProviderProductDTO): ProductDTO | null {
    if (!raw || typeof raw !== "object") return null;

    const priceInCents = Number(raw.preco) * 100 || 0;

    return {
      id: `provider_br_${raw.id}`,
      name: raw.nome ?? raw.name ?? "Produto sem nome",
      description: raw.descricao ?? "",
      category: raw.categoria ?? "",
      imagesUrl: [raw.imagem],
      price: priceInCents,
      material: raw.material ?? "",
      department: raw.departamento ?? "",
      hasDiscount: false,
      discountPercentage: 0,
    };
  }
}
