import { Component, OnInit } from "@angular/core";
import { Aluno } from "src/app/models/aluno";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MASKS, NgBrazilValidators } from "ng-brazil";
import { Turma } from "src/app/models/turma";
import { Uf } from "src/app/uteis/uf";
import { DadosSexo } from './data';

@Component({
  selector: "app-aluno",
  templateUrl: "./aluno.component.html",
  styles: [""],
})
export class AlunoComponent implements OnInit {

  MASKS = MASKS;
  cadastroForm: FormGroup;

  alert: boolean = false;
  cadastrado: boolean = false;

  aluno: Aluno;
  turmas: Turma[] = Turma.listaTurmas;
  alunos: Aluno[] = [];
  ufs: Uf[] = Uf.listaUf;

  single: any[];
  view: any[] = [400, 300];

  dadosSexo: DadosSexo[] = DadosSexo.listadados;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Sexo';
  showYAxisLabel = true;
  yAxisLabel = 'Alunos';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#AAAAAA']
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  onSelect(event) {
    console.log(event);
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
      turma: [{ value: "", disabled: true }, [Validators.required]],
      endereco: ["", [Validators.required, Validators.minLength(30)]],
      cep: ["", [Validators.required, NgBrazilValidators.cep]],
      uf: ["", Validators.required],
      cidade: ["", Validators.required],
      docValidado: [false, []],
    });
  }

  limparFomulario() {
    this.cadastroForm.reset({
      nome: "",
      dataNascimento: "",
      sexo: "Masculino",
      cpf: "",
      email: "",
      telefone: "",
      turma: 604,
      endereco: "",
      cep: "",
      uf: "",
      cidade: "",
      docValidado: false,
    });
    this.alert = false;
    this.cadastroForm.controls["turma"].disable();
  }

  calculaIdade(dtHoje: Date, dtAluno: Date) {
    if (dtHoje.getMonth() + 1 >= dtAluno.getMonth() + 1) {
      if (dtHoje.getDate() >= dtAluno.getDate()) {
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
  }

  adicionar() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.atualizarDadosObjeto();

      this.alunos.push(this.aluno);
      this.adicionarDadosChart(this.aluno);
      
      this.limparFomulario();
      this.aluno = new Aluno();

      this.cadastrado = true;
      setTimeout(() => {
        this.cadastrado = false;
      }, 2000);
    } else {
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 2000);
    }
  }

  fecharAlert() {
    this.alert = false;
  }

  ativaDesativa(valor: any) {
    if (valor) {
      this.cadastroForm.controls["turma"].enable();
    } else {
      this.cadastroForm.controls["turma"].disable();
    }
  }

  adicionarDadosChart(aluno: Aluno) {
    let posicaoAtualizar = this.dadosSexo.findIndex((cd) => cd.name === aluno.sexo)

    this.dadosSexo[posicaoAtualizar].value += 1;
    this.dadosSexo = [...this.dadosSexo];

    console.log(this.dadosSexo)
  }
}
