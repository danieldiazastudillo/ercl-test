import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChangePinComponent } from './card-change-pin.component';

describe('CardChangePinComponent', () => {
  let component: CardChangePinComponent;
  let fixture: ComponentFixture<CardChangePinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardChangePinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardChangePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
