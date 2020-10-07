import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../model/card.interface';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card-change-ammount',
  templateUrl: './card-change-ammount.component.html',
  styleUrls: ['./card-change-ammount.component.css'],
})
export class CardChangeAmmountComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _cardSvc: CardService,
    private _route: ActivatedRoute
  ) {}

  cardID: string;
  currentCard: Card;

  cardForm: FormGroup;
  ammount: AbstractControl;

  private _createForm(): FormGroup {
    const obj: FormGroup = this._fb.group({
      ammount: [null, [Validators.required]],
    });

    return obj;
  }

  private _formBinder(form: FormGroup): void {
    this.ammount = form.get('pin');
  }

  private _getCardCurrentInfo(id: string): void {
    this._cardSvc.getCardByGuid(id).subscribe(card => {
      this.currentCard = card;
    });
  }

  submitCard() {
    const newAmmount = this.ammount.value as number;

    this._cardSvc.patchCardAmmount(this.cardID, newAmmount).subscribe(result => {
      console.log('Card saved!');
      this._getCardCurrentInfo(this.cardID);
    });

  }

  ngOnInit() {
    this.cardID = this._route.snapshot.paramMap.get('id');
    this._getCardCurrentInfo(this.cardID);

    this.cardForm = this._createForm();
    this._formBinder(this.cardForm);
  }
}
