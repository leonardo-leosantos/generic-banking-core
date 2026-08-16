import { Contact } from "./contact.js";

export class Customer {
    private readonly _id: string;
    private readonly _name: string;
    // Entity aggregate - Contact 
    private readonly _contacts: Contact[];

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this._contacts = [];
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get contacts(): readonly Contact[] {
        return this._contacts;
    }

    public addContact(contact: Contact): void {
        // TODO: enforce aggregate invariants here (e.g. single principal contact)
        this._contacts.push(contact);
    }

    // TODO: Customer requires a valid document (CPF or CNPJ) — add when Cnpj VO exists
    // TODO: "active" rule — at least one principal contact required to open an account
}
