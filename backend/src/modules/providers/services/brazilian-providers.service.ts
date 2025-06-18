import { HttpService } from "@nestjs/axios";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { BrazilianProviderProductDTO } from "../dtos/brazilian-provider.dto";
import { ProductDTO } from "../dtos/product.dto";
import { BrazilianProviderMapper } from "../mappers/brazilian-provider.mapper";

@Injectable()
export class BrazilianProvidersService {
  private readonly baseUrl = process.env.BRAZILIAN_PROVIDER_API_URL ?? "";

  constructor(
    private readonly httpService: HttpService,
    private readonly mapper: BrazilianProviderMapper,
  ) {}

  async getProducts(): Promise<ProductDTO[]> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<any[]>(this.baseUrl),
      );

      return this.mapper.toProductDTOList(response.data);
    } catch (error) {
      if (error.response?.status === 400) {
        throw new BadRequestException(`Bad request: ${error.response.data}`);
      }

      throw new InternalServerErrorException(
        "Unexpected error while fetching product",
      );
    }
  }

  async getProductById(id: string): Promise<ProductDTO> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<BrazilianProviderProductDTO>(
          `${this.baseUrl}/${id}`,
        ),
      );

      const product = this.mapper.toProductDTO(response.data);
      if (!product) {
        throw new NotFoundException(
          `Product with id ${id} could not be processed.`,
        );
      }

      return product;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      if (error.response?.status === 400) {
        throw new BadRequestException(`Bad request: ${error.response.data}`);
      }

      throw new InternalServerErrorException(
        "Unexpected error while fetching product",
      );
    }
  }
}
