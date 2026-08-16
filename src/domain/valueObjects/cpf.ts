export class CPF {
    private readonly _value: string;

    public get value(): string {
        return this._value;
    }

    constructor(numero: string) {
        if (!this.validate(numero)) {
            throw new Error("CPJ Inválido")
        }
        this._value = numero
    }

    private validate (value: string) : boolean {
        if (value) {
            // TODO: validar cpf
            return true;
        } 
        return false;
    }
}
