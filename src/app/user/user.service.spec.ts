import { environment } from "./../../environments/environment";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { UserService } from "./user.service";
import { UserMock, UnformattedUser } from "./../core/mocks/users.mock";

describe("UserService", () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("Deve criar", () => {
    expect(service).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });

  describe("#fetchAllUsers", () => {
    const name = UserMock.username;
    const endpoint = `${environment.backendUrl}/users?q=${name}`;

    it("Deve chamar a API github passando o endpoint e parâmetros corretos e receber a lista de usuários como resposta", () => {
      service.fetchAllUsers(name).subscribe((users) => {
        expect(users).toEqual([UserMock]);
      });

      const req = httpMock.expectOne(endpoint);
      expect(req.request.method).toBe("GET");
      req.flush({ items: [UnformattedUser] });
    });
  });

  describe("#fetchUser", () => {
    const endpoint = UserMock.url;
    it("Deve chamar a API github passando o endpoint e parametros corretos e receber os detalhes do usuário como resposta", () => {
      service.fetchUser(endpoint).subscribe((userDetail) => {
        expect(userDetail).toEqual(UserMock);
      });

      const req = httpMock.expectOne(endpoint);
      expect(req.request.method).toBe("GET");
      req.flush(UnformattedUser);
    });

    it("Deve tratar mensagem de erro 500 quando este retornado pelo servidor", () => {
      service.fetchUser(endpoint).subscribe(
        () => fail("Deveria ter logado erro"),
        (error) => {
          expect(error).toContain(
            `Encontramos uma falha ao obter detalhes do usuário!
              Por favor tente novamente mais tarde, se persistir entre em contato com nossa equipe de suporte.`
          );
        }
      );

      const req = httpMock.expectOne(endpoint);
      req.error(new ErrorEvent("Error"), { status: 500 });
    });

    it("Deve tratar mensagem de erro 404 quando este retornado pelo servidor", () => {
      service.fetchUser(endpoint).subscribe(
        () => fail("Deveria ter logado erro"),
        (error) => {
          expect(error).toContain("Usuário não encontrado!");
        }
      );

      const req = httpMock.expectOne(endpoint);
      req.error(new ErrorEvent("Error"), { status: 404 });
    });
  });
});
