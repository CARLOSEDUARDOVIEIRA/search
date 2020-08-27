import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSpinnerComponent } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserDetailComponent } from './../user/user-detail/user-detail.component';
import { UserListComponent } from './../user/user-list/user-list.component';
import { ResultsComponent } from './results.component';
import { UserListMock, UserMock } from './../core/mocks/users.mock';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs/internal/observable/of';
import { User } from '../core/models/user.model';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        ResultsComponent,
        NgxSpinnerComponent,
        UserListComponent,
        UserDetailComponent,
      ],
      providers: [],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component['spinner'], 'show').and.returnValue(null);
    spyOn(component['spinner'], 'hide').and.returnValue(null);
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('eventHandler Deve emitir evento quando houver interação com o input de search', () => {
    spyOn(component['filterString'], 'next').and.returnValue(Promise.resolve());
    const fakeString = 'carlos';
    component.eventHandler({ target: {value: fakeString} });
    expect(component['filterString'].next).toHaveBeenCalledWith(fakeString);
  });


  it('Deve fazer uma chamada à API github buscando usuários com base na string informada', () => {
    spyOn(component['userService'], 'fetchAllUsers').and.returnValue(of(UserListMock));
    spyOn(component['filterString'], 'pipe').and.returnValue(of([UserMock]));

    component.ngOnInit();
    component['filterString'].next('carloseduardovieira');

    expect(component['filterString'].pipe).toHaveBeenCalled();
    expect(component.userList).toEqual([UserMock]);
  });

  it('removeUser Deve guardar uma cópia do usuário selecionado e remover a seleção', () => {
    component.user = UserMock;
    component.removeUser();
    expect(component.lastUser).toEqual({...UserMock});
    expect(component.user).toEqual(new User());
  });

  it('callUser Deve retornar usuário salvo em cache caso seja o último usuário selecionado', () => {
    component.lastUser = UserMock;
    component.callUser(UserMock);
    expect(component.user).toEqual(UserMock);
  });

  it('callUser Deve pedir ao userService por detalhes do usuário selecionado', () => {
    spyOn(component['userService'], 'fetchUser').and.returnValue(of(UserMock));
    component.callUser(UserMock);
    expect(component['spinner'].show).toHaveBeenCalled();
    expect(component['userService'].fetchUser).toHaveBeenCalledWith(UserMock.url);
    expect(component['spinner'].hide).toHaveBeenCalled();
  });

});
