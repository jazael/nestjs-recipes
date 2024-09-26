export class UserService() {
  private users: Array<User> = [{
  id: 1,
  email: 'userService1@email.com',
  password: 'pass'
  ]};
  public findOne({ where }: any): Promise<User> {
  return this.users
  .filter(u => {
  return u.email === where.email &&
  u.password === where.password;
  });
  }
  }