import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card-change-pin',
  templateUrl: './card-change-pin.component.html',
  styleUrls: ['./card-change-pin.component.css']
})
export class CardChangePinComponent implements OnInit {

  constructor(private _fb: FormBuilder, private _cardSvc: CardService) { }

  cardForm: FormGroup;
  pin: AbstractControl;

  private _createForm(): FormGroup {
    const obj: FormGroup = this._fb.group({
      pin: [null, [Validators.required]]
    });

    return obj;
  }

  private _formBinder(form: FormGroup): void {
    this.pin = form.get('pin');
  }

  submitCard() {
    this._cardSvc.postNewCard(card).subscribe(result => {
      console.log('Card saved!');
    });

  }



  ngOnInit() {
  }

}
