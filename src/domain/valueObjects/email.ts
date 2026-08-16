export class Email {
    private readonly _value: string;

    constructor(value:string) {
        if(!Email.validate(value)) {
            throw new Error("Invalid email");
        }

        this._value = value;
    }

    public get value(): string {
        return this._value;
    }

    private static validate(email:string) : boolean {
        if(email) {
            // TODO: validar email
            return true;
        }
        return false;
    }
}