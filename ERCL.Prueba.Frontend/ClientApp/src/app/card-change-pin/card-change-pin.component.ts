import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '../model/card.interface';
import { CardService } from '../services/card.service';
import { pinValidator } from '../validators/pin.validator';

@Component({
  selector: 'app-card-change-pin',
  templateUrl: './card-change-pin.component.html',
  styleUrls: ['./card-change-pin.component.css']
})
export class CardChangePinComponent implements OnInit {

  constructor(private _fb: FormBuilder,
              private _cardSvc: CardService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  cardID: string;

  cardForm: FormGroup;
  pin: AbstractControl;

  currentCard: Card;

  private _createForm(): FormGroup {
    const obj: FormGroup = this._fb.group({
      pin: ['', [Validators.required, pinValidator()]]
    });

    return obj;
  }

  private _formBinder(form: FormGroup): void {
    this.pin = form.get('pin');
  }

  private _getCardCurrentInfo(id: string): void {
    this._cardSvc.getCardByGuid(id).subscribe(card => {
      this.currentCard = card;
    });
  }

  submitCard() {
    const newPin = this.pin.value;

    this._cardSvc.patchCardPin(this.cardID, newPin).subscribe(result => {
      console.log('Card updated!');
      console.log(result);
      this._router.navigate(['/']);
    });

  }


  ngOnInit() {
    this.cardID = this._route.snapshot.paramMap.get('id');
    this._getCardCurrentInfo(this.cardID);

    this.cardForm = this._createForm();
    this._formBinder(this.cardForm);
  }

}
