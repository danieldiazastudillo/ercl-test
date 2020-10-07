import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewCard } from '../model/card-new.model';
import { Card } from '../model/card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService {

  private _apiUrl: string;
  private _cardDataEndpoint: string;

  constructor(private _http: HttpClient) {
    this._apiUrl = environment.API_BASE_URL;
    this._cardDataEndpoint = environment.CARD_DATA_BASE_URL;
  }

  /**
   * Post new Card
   * @param card Card Model (New Entity)
   */
  postNewCard(card: NewCard): Observable<string> {
    const queryUrl = `${this._apiUrl}/${this._cardDataEndpoint}/new`;
    return this._http.post<string>(queryUrl, card);
  }

  /**
   * Get all cards in API
   */
  getAllCards(): Observable<Card[]> {
    const queryUrl = `${this._apiUrl}/${this._cardDataEndpoint}/all`;
    return this._http.get<Card[]>(queryUrl);
  }


  /**
   * Get Card for specified ID/GUID
   * @param id Card GUID
   */
  getCardByGuid(id: string): Observable<Card> {
    const queryUrl = `${this._apiUrl}/${this._cardDataEndpoint}/id/${id}`;
    return this._http.get<Card>(queryUrl);
  }


  /**
   * Sets new Card PIN for a given ID
   * @param id Card GUID
   * @param pin New Card PIN
   */
  patchCardPin(id: string, pin: string): Observable<Card> {
    const queryUrl = `${this._apiUrl}/${this._cardDataEndpoint}/update/pin/${id}`;

    const obj = {
      pin: pin
    };

    return this._http.patch<Card>(queryUrl, obj);
  }


  /**
   * Adds ammount to current Card Ammount
   * @param id Card GUID
   * @param ammount Ammount to SUM (arithmetic) to current ammount (can be negative or zero)
   */
  patchCardAmmount(id: string, ammount: number): Observable<Card> {
    const queryUrl = `${this._apiUrl}/${this._cardDataEndpoint}/update/ammount/${id}`;

    const obj = {
      ammount: ammount
    };

    return this._http.patch<Card>(queryUrl, obj);
  }

}
