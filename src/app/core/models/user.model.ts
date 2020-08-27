export class User {

  public name:          string;
  public email:         string;
  public createdAt:     string;
  public profileLink:   string;
  public thumbUrl:      string;
  public username:      string;
  public url:           string;
  public following:     number;
  public followers:     number;
  public repositories:  number;

  public static build = ( data: any ) => {
    const {
      name,
      email,
      created_at,
      html_url,
      avatar_url,
      login,
      url,
      following,
      followers,
      public_repos,
    } = data;

    const user = new User();

    user.name =         name;
    user.email =        email ? email : 'Privado';
    user.createdAt =    created_at;
    user.profileLink =  html_url;
    user.thumbUrl =     avatar_url;
    user.username =     login;
    user.url =          url;
    user.following =    following;
    user.followers =    followers;
    user.repositories = public_repos;
    return user;
  }

}

