import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitSecretComponent } from './split-secret.component';

describe('SplitSecretComponent', () => {
  let component: SplitSecretComponent;
  let fixture: ComponentFixture<SplitSecretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitSecretComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitSecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
