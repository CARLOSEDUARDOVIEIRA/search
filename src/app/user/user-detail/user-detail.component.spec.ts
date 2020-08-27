import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { By } from '@angular/platform-browser';
import { UserMock } from 'src/app/core/mocks/users.mock';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserDetailComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.user = UserMock;
    fixture.detectChanges();
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });


  it('Deve exibir nome do usuário', () => {
    const htmlNome = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    expect(htmlNome.textContent).toContain('Carlos');
  });

  it('Ao clicar no botão voltar Deve emitir evento para remover usuário selecionado e exibir lista novamente', () => {
    spyOn(component['toUserList'], 'next').and.returnValue(null);
    const backBtn = fixture.debugElement.query(By.css('.backBtn')).nativeElement;
    backBtn.click();
    expect(component['toUserList'].next).toHaveBeenCalled();
  });

  it('Ao clicar em visitar perfil Deve abrir nova guia do navegador redirecionando para o perfil do usuário', () => {
    spyOn(window, 'open').and.returnValue(null);
    const showProfileBtn = fixture.debugElement.query(By.css('.btn')).nativeElement;
    showProfileBtn.click();
    expect(window.open).toHaveBeenCalledWith(UserMock.profileLink, '_blank');
  });
});
