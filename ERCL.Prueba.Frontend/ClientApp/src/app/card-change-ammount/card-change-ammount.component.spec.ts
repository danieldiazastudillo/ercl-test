import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChangeAmmountComponent } from './card-change-ammount.component';

describe('CardChangeAmmountComponent', () => {
  let component: CardChangeAmmountComponent;
  let fixture: ComponentFixture<CardChangeAmmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardChangeAmmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardChangeAmmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
