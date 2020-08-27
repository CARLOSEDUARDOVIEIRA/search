import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve exibir a logo corretamente', () => {
    const logoHtml = fixture.debugElement.query(By.css('.logo > img')).nativeElement;
    expect(logoHtml.src).toContain('/assets/logo.png');
  });

  it('Deve exibir o título corretamente', () => {
    const titleHtml = fixture.debugElement.query(By.css('.title__begin')).nativeElement;
    expect(titleHtml.textContent).toEqual('BuscaHub');
  });

  it('Deve exibir o subtitulo corretamente', () => {
    const subTitleHtml = fixture.debugElement.query(By.css('.subtitle')).nativeElement;
    expect(subTitleHtml.textContent).toEqual('Uma nova experiência de encontrar usuários Github');
  });
});
