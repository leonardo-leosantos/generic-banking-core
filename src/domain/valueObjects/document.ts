export type DocumentType = "cpf" | "cnpj";

/**
 * Contract every identification document must honour.
 * The domain depends on this abstraction, never on Cpf/Cnpj directly.
 */
export interface Document {
    readonly value: string;
    readonly type: DocumentType;
    equals(other: unknown): boolean;
}
