import { Component, OnInit } from "@angular/core";
import { Aluno } from "src/app/models/aluno";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MASKS, NgBrazilValidators } from "ng-brazil";
import { Turma } from "src/app/models/turma";

@Component({
  selector: "app-aluno",
  templateUrl: "./aluno.component.html",
  styles: [""],
})
export class AlunoComponent implements OnInit {
  MASKS = MASKS;
  cadastroForm: FormGroup;

  alertInvalido: boolean = false;

  constructor(private fb: FormBuilder) {}

  aluno: Aluno;
  turmas: Array<Turma> = [
    new Turma(604, "Qualidade e Auditoria de Software"),
    new Turma(707, "Matemática Discreta"),
  ];

  alunos: Array<Aluno> = [];

  ufs: Array<String> = [
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MG",
    "MS",
    "MT",
    "PA",
    "PB",
    "PE",
    "PI",
    "PR",
    "RJ",
    "RN",
    "RO",
    "RR",
    "RS",
    "SC",
    "SE",
    "SP",
    "TO",
  ];

  ngOnInit(): void {
    this.criarFormulario();
  }

  // Aqui vão os campos do formulário
  criarFormulario() {
    this.cadastroForm = this.fb.group({
      nome: ["", [Validators.required]],
      dataNascimento: ["", [Validators.required]],
      sexo: ["Masculino", [Validators.required]],
      cpf: ["", [Validators.required, NgBrazilValidators.cpf]],
      email: ["", [Validators.required, Validators.email]],
      telefone: ["", [Validators.required, NgBrazilValidators.telefone]],
      endereco: ["", Validators.required],
      cep: ["", Validators.required],
      uf: ["", Validators.required],
      cidade: ["", Validators.required],
    });
  }

  limparFomulario() {
    this.cadastroForm.reset();
    this.alertInvalido = false;
  }

  calculaIdade(dtHoje: Date, dtAluno: Date) {
    if (dtHoje.getMonth < dtAluno.getMonth) {
      if (dtHoje.getDay() < dtAluno.getDay()) {
        return dtHoje.getFullYear() - dtAluno.getFullYear() - 1;
      } else {
        return dtHoje.getFullYear() - dtAluno.getFullYear();
      }
    }
    return dtHoje.getFullYear() - dtAluno.getFullYear() - 1;
  }

  atualizarDadosObjeto() {
    this.aluno = Object.assign({}, this.aluno, this.cadastroForm.value);

    let dtAtual: Date = new Date();

    let dt: string = this.aluno.dataNascimento.toString() + "T00:00:00";
    let dtAluno = new Date(dt);

    this.aluno.idade = this.calculaIdade(dtAtual, dtAluno);

    this.alunos.push(this.aluno);
  }

  adicionar() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.atualizarDadosObjeto();

      console.log(`AQQQ ${this.aluno}\n aaaaa ${this.cadastroForm.value}`);
      console.log(this.aluno);

      this.limparFomulario();
    } else {
      console.log("Formulário inválido");
      this.alertInvalido = true;
    }
  }
}

// Para validar CPF ou outros campos, esse modulo foi instaldo e está sendo usado
// https://www.npmjs.com/package/ng-brazil

// Outras validações, não instalei mas caso necessario pode instalar
// https://www.npmjs.com/package/ng2-validation
