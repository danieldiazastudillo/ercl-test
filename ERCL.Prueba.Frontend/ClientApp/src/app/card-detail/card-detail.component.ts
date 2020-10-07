import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../model/card.interface';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {

  constructor(private _cardSvc: CardService,
              private _route: ActivatedRoute) { }

  cardID: string;
  currentCard: Card;

  private _getCardCurrentInfo(id: string): void {
    this._cardSvc.getCardByGuid(id).subscribe(card => {
      this.currentCard = card;
    });
  }

  ngOnInit() {
    this.cardID = this._route.snapshot.paramMap.get('id');
    this._getCardCurrentInfo(this.cardID);
  }

}
