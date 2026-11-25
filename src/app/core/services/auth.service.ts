
import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private chave = 'financeiro.sessao';
  private sessao = signal<LoginResponse | null>(this.restaurar());
  readonly token = computed(() => this.sessao()?.token ?? null);
  readonly autenticado = computed(() => !!this.token());

  login(dados: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/login`, dados
    ).pipe(tap(res => {
      sessionStorage.setItem(this.chave, JSON.stringify(res));
      this.sessao.set(res);
    }));
  }
  logout() {
    sessionStorage.removeItem(this.chave);
    this.sessao.set(null);
  }
  private restaurar(): LoginResponse | null {
    try {
      return JSON.parse(sessionStorage.getItem(this.chave) ?? 'null');
    } catch { return null; }
  }
}
