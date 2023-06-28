import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {BebidaDto} from "../../../api/models/bebida-dto";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BebidaControllerService} from "../../../api/services/bebida-controller.service";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-list-bebida',
  templateUrl: './list-bebida.component.html',
  styleUrls: ['./list-bebida.component.scss']
})
export class ListBebidaComponent implements OnInit {
  colunasMostrar = ['id', 'marca', 'valorBebida', 'tipoBebida', 'categoriaBebida', "action"];
  bebidaListaDataSource: MatTableDataSource<BebidaDto> = new MatTableDataSource<BebidaDto>([]);

  constructor(
    public bebidaService: BebidaControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.bebidaService.listAll().subscribe(data => {
      this.bebidaListaDataSource.data = data;
    })
  }

  remover(bebidaDto: BebidaDto) {
    console.log("Removido", bebidaDto.id);
    this.bebidaService.remover({id: bebidaDto.id || 0})
      .subscribe(retorno => {
          this.buscarDados();
          this.showMensagemSimples("Excluído com sucesso ",5000);
          console.log("Exlcusão:", retorno);
        }, error => {
          if (error.status === 404) {
            this.showMensagemSimples("Bebida não existe mais")
          } else {
            this.showMensagemSimples("Erro ao excluir");
            console.log("Erro:", error);
          }
        }
      )
  }

  confirmarExcluir(bebidaDto: BebidaDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${bebidaDto.marca} (ID: ${bebidaDto.id})?`,
        textoBotoes: {
          ok: 'Confirmar',
          cancel: 'Cancelar',
        },
        dado: bebidaDto
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
      if (confirmed?.resultado) {
        this.remover(confirmed.dado);
      }
    });
  }
  showMensagemSimples( mensagem: string, duracao: number = 2000) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
