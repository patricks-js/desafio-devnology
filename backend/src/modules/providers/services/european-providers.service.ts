import { HttpService } from "@nestjs/axios";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { EuropeanProviderProductDTO } from "../dtos/european-provider.dto";
import { ProductDTO } from "../dtos/product.dto";
import { EuropeanProviderMapper } from "../mappers/european-provider.mapper";

@Injectable()
export class EuropeanProvidersService {
  private readonly baseUrl = process.env.EUROPEAN_PROVIDER_API_URL ?? "";

  constructor(
    private readonly httpService: HttpService,
    private readonly mapper: EuropeanProviderMapper,
  ) {}

  async getProducts(): Promise<ProductDTO[]> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<EuropeanProviderProductDTO[]>(this.baseUrl),
      );

      return this.mapper.toProductDTOList(response.data);
    } catch (error) {
      if (error.response?.status === 400) {
        throw new BadRequestException(`Bad request: ${error.response.data}`);
      }

      throw new InternalServerErrorException(
        "Unexpected error while fetching european products",
      );
    }
  }

  async getProductById(id: string): Promise<ProductDTO> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<EuropeanProviderProductDTO>(
          `${this.baseUrl}/${id}`,
        ),
      );

      return this.mapper.toProductDTO(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException(
          `Product with id ${id} not found in European provider`,
        );
      }

      if (error.response?.status === 400) {
        throw new BadRequestException(`Bad request: ${error.response.data}`);
      }

      throw new InternalServerErrorException(
        "Unexpected error while fetching european product",
      );
    }
  }
}
