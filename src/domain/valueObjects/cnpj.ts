import type { Document, DocumentType } from "./document.js";

export class Cnpj implements Document {
    private static readonly firstDigitWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    private static readonly secondDigitWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    private readonly _value: string;

    constructor(value: string) {
        const normalized = Cnpj.normalize(value);
        if (!Cnpj.validate(normalized)) {
            // TODO: replace with a custom domain error (e.g. InvalidCnpjError)
            throw new Error("Invalid CNPJ");
        }
        this._value = normalized;
    }

    public get value(): string {
        return this._value;
    }

    public get type(): DocumentType {
        return "cnpj";
    }

    public equals(other: unknown): boolean {
        return other instanceof Cnpj && other._value === this._value;
    }

    private static normalize(value: string): string {
        return value.replace(/\D/g, "");
    }

    private static validate(value: string): boolean {
        if (!/^\d{14}$/.test(value)) {
            return false;
        }
        if (/^(\d)\1{13}$/.test(value)) {
            return false;
        }
        return (
            Cnpj.computeCheckDigit(value, Cnpj.firstDigitWeights) === Number(value.charAt(12)) &&
            Cnpj.computeCheckDigit(value, Cnpj.secondDigitWeights) === Number(value.charAt(13))
        );
    }

    private static computeCheckDigit(value: string, weights: readonly number[]): number {
        let sum = 0;
        for (let i = 0; i < weights.length; i++) {
            sum += Number(value.charAt(i)) * (weights[i] ?? 0);
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }
}
