export class CPF {
    private readonly _value: string;

    constructor(value: string) {
        if (!this.validate(value)) {
            throw new Error("Invalid CPF")
        }
        this._value = value
    }

    public get value(): string {
        return this._value;
    }

    private validate (value: string) : boolean {
        if (value) {
            // TODO: validar cpf
            return true;
        } 
        return false;
    }
}
