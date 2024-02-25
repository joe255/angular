import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionModalComponent } from './create-transaction-modal.component';

describe('CreateTransactionModalComponent', () => {
  let component: CreateTransactionModalComponent;
  let fixture: ComponentFixture<CreateTransactionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTransactionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTransactionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
