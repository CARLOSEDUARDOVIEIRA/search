import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { UserMock, UnformattedUser } from './../core/mocks/users.mock';

describe('UserService', () => {

  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UserService,
      ]
    });

    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('Deve criar', () => {
    expect(service).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });

  it('fetchAllUsers Deve chamar a API github passando um termo de filtro e receber a lista de usuários como resposta', () => {
    const name = UserMock.username;
    service.fetchAllUsers(name).subscribe( ( users ) => {
      expect(users).toEqual([UserMock]);
    });

    const req = httpMock.expectOne(`https://api.github.com/search/users?q=${name}`);
    expect(req.request.method).toBe('GET');
    req.flush({ items: [UnformattedUser] });
  });

  it('fetchUser Deve chamar a API github passando a url do usuário selecionado e receber os detalhes deste como resposta', () => {
    const url = UserMock.url;
    service.fetchUser(url).subscribe( (userDetail) => {
      expect(userDetail).toEqual(UserMock);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(UnformattedUser);
  });
});
