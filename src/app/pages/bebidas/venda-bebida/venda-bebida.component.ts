import {Component} from '@angular/core';
import {BebidaControllerService} from "../../../api/services/bebida-controller.service";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {BebidaDescontoDTO} from "../../../api/models/bebida-desconto-dto";

@Component({
  selector: 'app-venda-bebida',
  templateUrl: './venda-bebida.component.html',
  styleUrls: ['./venda-bebida.component.scss']
})
export class VendaBebidaComponent {

  // pra ser mandada pro back
  bebida: { codigo: string; quantidade: string } = {
    quantidade: '',
    codigo: '',
  }

  // serve pro retorno do back
  bebidaDescontoDTO = new BebidaDescontoDTO('', '', '','')
  //controla o Informações do desconto
  temDadosDeRetorno = false

  constructor(
    public bebidaService: BebidaControllerService,
    private dialog: MatDialog,
  ) {
  }

  enviar(): void {
    if (this.bebida.quantidade === '' || this.bebida.codigo === '') {
      this.informarErro();
      // quando a função é void vc pode retornar vazio
      return;
    }

    if (!(this.isNumber(this.bebida.quantidade) && this.isNumber(this.bebida.codigo))) {
      this.informarErro();
      return;
    }

    // faz a chamada pro service
    this.bebidaService.orcar(this.bebida.quantidade, this.bebida.codigo)
      .subscribe((resultado: any) => {
        this.bebidaDescontoDTO = new BebidaDescontoDTO(
          resultado.marca,
          `R$ ${resultado.valorDesconto}, 00`,
          `R$ ${resultado.valorTotal}, 00`,
          resultado.numeroDesconto
        )
        this.temDadosDeRetorno = true;
      }, erro => {
        console.log("Erro:" + erro);
      })
    console.log(this.bebidaDescontoDTO)
  }

  limpar(): void {
    this.bebida.codigo = '';
    this.bebida.quantidade = '';
    this.bebidaDescontoDTO.marca = '';
    this.bebidaDescontoDTO.valorTotal = '';
    this.bebidaDescontoDTO.valorDesconto = '';
    this.temDadosDeRetorno = false;
    this.load();
  }

  informarErro() {
    this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Mensagem!!!',
        mensagem: 'Campo(s) inválido(s)!',
        textoBotoes: {
          ok: 'ok',
        },
      },
    });
  }

  isNumber(n: any): boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  load() {
    (sessionStorage['refresh'] == 'true' || !sessionStorage['refresh'])
    && location.reload();
    sessionStorage['refresh'] = false;
  }

}
