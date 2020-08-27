import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { UserListMock } from './../../core/mocks/users.mock';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.userList = UserListMock;
    fixture.detectChanges();
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('Deve exibir listar os cards de todos os usuários recebidos', () => {
    const allCardsHtml = fixture.debugElement.queryAll(By.css('.user-card'));
    expect(allCardsHtml.length).toEqual(component.userList.length);
  });

  it('Ao clicar para ver detalhes do usuário Deve emitir um evento chamando detalhes do usuário', () => {
    spyOn(component['callUser'], 'next').and.returnValue(null);
    const userCardHtml = fixture.debugElement.query(By.css('.users-card > div')).nativeElement;
    userCardHtml.click();
    expect(component['callUser'].next).toHaveBeenCalled();
  });
});
