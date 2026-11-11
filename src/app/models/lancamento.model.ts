import { Categoria } from './categoria.model';

export interface Lancamento {
  id: number;
  descricao: string;
  valor: number;
  dataLancamento: string; 
  observacao?: string;   
  categoriaId: number;
  usuarioId: number;
  categoria?: Categoria;  
}

export type LancamentoInput = Omit<Lancamento, 'id' | 'categoria'>;