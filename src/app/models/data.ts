
// classe para criar modelos de objetos
export class Model {
  constructor(objeto?) {
      Object.assign(this, objeto);
  }
}
// classe usuario extendendo a classe Model
export class Data extends Model {
    jsonRetorno: Array<any>;
    query: string;
}
