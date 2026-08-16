import type { CPF } from "../valueObjects/cpf.js";
import type { Email } from "../valueObjects/email.js";

export class Cliente {
    private readonly id: string;
    private readonly name: string;
    private contatos: Contato[];
    private cpf: CPF;

    constructor(id: string, name: string, cpf: CPF) {
        this.id = id;
        this.name = name;
        this.contatos = [];
        this.cpf = cpf
    }

    public addContato(contato: Contato) {
        this.contatos.push(contato);
    }
}

export class Contato {
    private readonly _id: string;
    private readonly _email: Email;
    private readonly _phone: string;

    constructor(id: string, email: Email, phone: string) {
        this._id = id;
        this._email = email;
        this._phone = phone;
    }
}