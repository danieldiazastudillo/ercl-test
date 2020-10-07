import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  get csvLink(): string {
    return `${environment.API_BASE_URL}/${environment.CARD_DATA_BASE_URL}/${environment.CSV_ENDPOINT}`;
  }

  ngOnInit() {
    this._getAllCards();
  }
}
