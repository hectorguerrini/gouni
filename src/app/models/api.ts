
export class Api {
  url: string;
  constructor(env) {
    this.url = env ? 'http://localhost:3000/gouniapi/' : 'https://gouniapi.azurewebsites.net/gouniapi/' ;
  }
}

