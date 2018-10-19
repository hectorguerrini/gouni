export class Avaliacao {
    universidade!: string;
    curso!: string;
    id_universidade!: number;
    id_curso!: number;
    geral!: number;
    limpeza: number;
    professores: number;
    instalacoes: number;
    estacionamento: number;
    lanchonetes: number;
    ensino: number;
    materiais: number;
    conteudo: number;
    mec: number;
    guia_estudante: number;
    mensalidade: string;
    titulo: string;
    comentario: string;
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
