/* tslint:disable */
/* eslint-disable */
export class BebidaDescontoDTO {
  marca?: string;
  valorDesconto?: string;
  valorTotal?: string;
  numeroDesconto? :string;

  constructor(marca: string, valorDesconto: string, valorTotal: string, numeroDesconto: string) {
    this.marca = marca;
    this.valorDesconto = valorDesconto;
    this.valorTotal = valorTotal;
    this.numeroDesconto = numeroDesconto;
  }
}
