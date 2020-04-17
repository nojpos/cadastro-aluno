import { Turma } from "./turma";
export class Aluno {
  id: number;
  nome: string;
  idade: number;
  dataNascimento: Date;
  sexo: string;
  cpf: string;
  email: string;
  telefone: string;
  turma: Turma;
  endereco: string;
  cep: number;
  uf: string;
  cidade: string;
}
