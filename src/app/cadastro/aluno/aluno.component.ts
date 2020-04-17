import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/models/aluno';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  criarFormulario() {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  adicionar() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid){
      this.aluno = Object.assign({}, this.aluno, this.cadastroForm.value);
      console.log(this.aluno);
    } else {
      console.log('Formulario invalido');
    }
  }
}


// Para validar CPF ou outros campos, esse modulo foi instaldo e está sendo usado
  // https://www.npmjs.com/package/ng-brazil

// Outras validações, não instalei mas caso necessario pode instalar
  // https://www.npmjs.com/package/ng2-validation