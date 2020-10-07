import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from '../model/card.interface';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  cards$: Observable<Card[]> = of([]);

  constructor(private _cardSvc: CardService) {
  }

  private _getAllCards() {
    this.cards$ = this._cardSvc.getAllCards();
  }

  ngOnInit() {
    this._getAllCards();
  }
}
