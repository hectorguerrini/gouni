
// classe para criar modelos de objetos
export class Model {
  constructor(objeto?) {
      Object.assign(this, objeto);
  }
}
// classe usuario extendendo a classe Model
export class Data extends Model {
    message: boolean;
    jsonRetorno: any[];
    query: string;
}
