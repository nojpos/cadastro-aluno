import { Turma } from "./turma";
export class Aluno {
  id: number;
  nome: string;
  dataNascimento: Date;
  sexo: string;
  cpf: string;
  email: string;
  telefone: string;
  turma: Turma;
}
