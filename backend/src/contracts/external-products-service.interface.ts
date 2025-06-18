export interface IExternalProducts {
  getProducts(): Promise<string[]>;
  getProductById(id: string): Promise<string>;
}
