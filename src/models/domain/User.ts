export class User {
  id: string;
  email: string;
  roles: string[] = [];

  public get isAdmin(): boolean {
    return this.roles.includes("ADMIN");
  }

  public get ifNotAdmin(): User | undefined {
    return this.isAdmin ? undefined : this;
  }
}
