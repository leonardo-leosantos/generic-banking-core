import { Email } from "../valueObjects/email.js";
import { Phone } from "../valueObjects/phone.js";

export type ContactType = "email" | "phone";

export class Contact {
    private readonly _id: string;
    private readonly _value: Email | Phone;
    private _isPrincipal: boolean;

    constructor(id: string, value: Email | Phone, isPrincipal: boolean = false) {
        this._id = id;
        this._value = value;
        this._isPrincipal = isPrincipal;
    }

    public get id(): string {
        return this._id;
    }

    public get type(): ContactType {
        return this._value instanceof Email ? "email" : "phone";
    }

    public get value(): Email | Phone {
        return this._value;
    }

    public get isPrincipal(): boolean {
        return this._isPrincipal;
    }

    public markAsPrincipal(): void {
        this._isPrincipal = true;
    }

    public unmarkAsPrincipal(): void {
        this._isPrincipal = false;
    }
}
