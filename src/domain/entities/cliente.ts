export class Cliente {
    private readonly id: string;
    private readonly name: string;
    private contato: Contato[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.contato = [];
    }

    public addContato(contato: Contato) {
        this.contato.push(contato);
    }
}

export class Contato {
    private readonly id: string;
    private readonly email: string;
    private readonly phone: string;

    constructor(id: string, email: string, phone: string) {
        this.id = id;
        this.email = email;
        this.phone = phone;
    }
}