import { LancamentoForm } from '../lancamento-form/lancamento-form';
import { LancamentoResponse } from '../../../models/lancamento.model';
import { LancamentoService } from '../../../core/services/lancamento.service';
import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common'


@Component({
  selector: 'app-lancamento-lista',
  imports: [CurrencyPipe, DatePipe, LancamentoForm],
  templateUrl: './lancamento-lista.html'
})
export class LancamentoLista implements OnInit {
  lancamentos = signal<LancamentoResponse[]>([]);
  carregando = signal(false);
  erro = signal('');
 
  constructor(private lancamentoService: LancamentoService) {}
  ngOnInit(): void { this.carregar(); }
 
  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');
    this.lancamentoService.listar().subscribe({
      next: dados => {
        this.lancamentos.set(dados);
        this.carregando.set(false);
      },
      error: err => {
        this.erro.set('Não foi possível carregar os lançamentos.');
        this.carregando.set(false);
        console.error(err);
      }
    });
  }
}
