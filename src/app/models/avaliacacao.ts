export class Avaliacao {
    universidade!: number;
    curso!: number;
    geral!: number;
    limpeza: number;
    professores: number;
    instalacoes: number;
    estacionamento: number;
    lanchonetes: number;
    ensino: number;
    materiais: number;
    conteudo: number;
    constructor() {
        this.geral = 0;
        this.limpeza = 0;
        this.professores = 0;
        this.instalacoes = 0;
        this.estacionamento = 0;
        this.lanchonetes = 0;
        this.ensino = 0;
        this.materiais = 0;
        this.conteudo = 0;
    }
}
