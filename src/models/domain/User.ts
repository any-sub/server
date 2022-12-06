export class User {
  id: number;
  email: string;
  roles: string[] = [];

  public get isAdmin(): boolean {
    return this.roles.includes("ADMIN");
  }

  public get ifNotAdmin(): User | undefined {
    return this.isAdmin ? undefined : this;
  }
}
