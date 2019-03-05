export class Library {
    isLend: boolean;
    description: string;
  
    constructor(public name: string, public username: string) {
      this.isLend = false;
    }
}