export interface BrazilianProviderProductDTO {
  id: string;
  nome: string;
  name: string;
  descricao: string;
  categoria: string;
  imagem: string;
  preco: string;
  material: string;
  departamento: string;
  email?: string;
  password?: string;
  body?: Record<string, unknown>;
}
