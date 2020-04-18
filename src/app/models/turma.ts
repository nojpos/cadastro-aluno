export class Turma {
  numero: number;
  nome: string;

  constructor(numero: number, nome: string) {
    this.numero = numero;
    this.nome = nome;
  }

  static listaTurmas = [
    new Turma(604, 'Qualidade e Auditoria de Software'),
    new Turma(707, 'Matemática Discreta'),
  ]
}
