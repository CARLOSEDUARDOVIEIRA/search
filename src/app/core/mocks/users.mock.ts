import { User } from '../models/user.model';

export const UnformattedUser = {
  name: 'Carlos',
  email: 'dullvieira@gmail.com',
  created_at: new Date(),
  html_url: 'https://github.com/carloseduardovieira',
  avatar_url: '',
  login: 'carloseduardovieira',
  url: 'https://api.github.com/users/carloseduardovieira',
  following: 1,
  followers: 1,
  public_repos: 18,
};

export const UserMock = User.build( UnformattedUser );

const userTwo = {...UserMock};
userTwo.username = 'buscahub';

export const UserListMock = [
  UserMock,
  userTwo,
];
