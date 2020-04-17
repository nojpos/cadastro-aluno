import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/models/aluno';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MASKS, NgBrazilValidators } from 'ng-brazil';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styles: ['']
})
export class AlunoComponent implements OnInit {

  MASKS = MASKS;
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  aluno: Aluno;

  ngOnInit(): void {
    this.criarFormulario();
  }

  // Aqui vão os campos do formulário
  criarFormulario() {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      dataNascimento: [''],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  adicionar() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid){
      console.log(`AQQQ ${this.aluno}\n aaaaa ${this.cadastroForm.value}`);
      this.aluno = Object.assign({}, this.aluno,this.cadastroForm.value);
      console.log(this.aluno);
    } else {
      console.log('Formulário inválido');
    }
  }
}


// Para validar CPF ou outros campos, esse modulo foi instaldo e está sendo usado
  // https://www.npmjs.com/package/ng-brazil

// Outras validações, não instalei mas caso necessario pode instalar
  // https://www.npmjs.com/package/ng2-validation