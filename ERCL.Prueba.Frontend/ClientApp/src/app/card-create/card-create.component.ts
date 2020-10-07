import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewCard } from '../model/card-new.model';
import { CardService } from '../services/card.service';
import { matchValidator } from '../validators/match.validator';
import { pinValidator } from '../validators/pin.validator';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.css']
})
export class CardCreateComponent implements OnInit {

  constructor(private _fb: FormBuilder,
              private _cardSvc: CardService,
              private _router: Router) { }

  cardForm: FormGroup;
  name: AbstractControl;
  pan: AbstractControl;
  pin: AbstractControl;
  confirmPin: AbstractControl;

  private _createForm(): FormGroup {
    const obj: FormGroup = this._fb.group({
      name: ['', [Validators.required]],
      pan: ['', [Validators.required]],
      pin: ['', [Validators.required, pinValidator()]],
      confirmPin: ['', [Validators.required, pinValidator(), matchValidator('pin')]]
    });

    return obj;
  }

  private _formBinder(form: FormGroup): void {
    this.name = form.get('name');
    this.pan = form.get('pan');
    this.pin = form.get('pin');
    this.confirmPin = form.get('confirmPin');
  }

  private _prepareFormData(form: FormGroup): NewCard {
    const model: NewCard = {
      name: this.name.value,
      pan: this.pan.value,
      pin: this.pin.value,
      confirmPin: this.confirmPin.value as string
    };

    return model;
  }

  submitCard() {
    const card: NewCard = this._prepareFormData(this.cardForm);

    this._cardSvc.postNewCard(card).subscribe(result => {
      console.log('Card saved!');
      this._router.navigate(['/']);
    });

  }

  ngOnInit() {
    this.cardForm = this._createForm();
    this._formBinder(this.cardForm);
  }

}
