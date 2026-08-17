import type { Contact } from "./contact.js";
import type { Cpf } from "../valueObjects/cpf.js";
import type { Cnpj } from "../valueObjects/cnpj.js";

export class Customer {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _document: Cpf | Cnpj;
    // Entity aggregate - Contact
    private readonly _contacts: Contact[];

    constructor(id: string, name: string, document: Cpf | Cnpj) {
        this._id = id;
        this._name = name;
        this._document = document;
        this._contacts = [];
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get document(): Cpf | Cnpj {
        return this._document;
    }

    public get contacts(): readonly Contact[] {
        return this._contacts;
    }

    public addContact(contact: Contact): void {
        // TODO: enforce aggregate invariants here (e.g. single principal contact)
        this._contacts.push(contact);
    }

    // TODO: "active" rule — at least one principal contact required to open an account
}
