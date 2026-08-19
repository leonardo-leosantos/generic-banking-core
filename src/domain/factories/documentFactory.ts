import { Cnpj } from "../valueObjects/cnpj.js";
import { Cpf } from "../valueObjects/cpf.js";
import type { Document } from "../valueObjects/document.js";

interface DocumentSpec {
    readonly digits: number;
    create(value: string): Document;
}

/**
 * Why a Factory and not a Domain Service.
 *
 * They are distinct DDD building blocks, and keeping the words apart is what
 * lets a `TransferService` still mean something once it shows up:
 *
 * - Factory: owns the knowledge of HOW an object is built. Takes primitives,
 *   hides which concrete class is born, returns a new object. "14 digits means
 *   CNPJ" is assembly knowledge, not business policy.
 * - Domain Service: owns BEHAVIOUR that no entity or value object can claim,
 *   usually because it spans more than one aggregate (transferring money needs
 *   two accounts, and neither one owns the rule).
 *
 * Two checks that settle it:
 * 1. What goes in? Primitives in, new object out means factory. Domain objects
 *    in, a decision or an effect out means service.
 * 2. Delete the class: does a business rule disappear (service), or only the
 *    assembly knowledge (factory)?
 *
 * This class fails both as a service: string in, Document out, and it decides
 * nothing about the customer.
 *
 * If creating a document ever needs to consult something (is this CNPJ active?
 * is it blocklisted?), construction stops being pure and needs an outbound
 * port. At that point it is not a domain service either — it is orchestration,
 * and it belongs in the application layer.
 */
export class DocumentFactory {
    // A new document type is a new entry here — `create` stays untouched.
    private static readonly specs: readonly DocumentSpec[] = [
        { digits: 11, create: (value: string): Document => new Cpf(value) },
        { digits: 14, create: (value: string): Document => new Cnpj(value) },
    ];

    public static create(value: string): Document {
        const normalized = value.replace(/\D/g, "");
        const spec = DocumentFactory.specs.find(
            (candidate) => candidate.digits === normalized.length,
        );
        if (!spec) {
            // TODO: replace with a custom domain error (e.g. InvalidDocumentError)
            throw new Error("Invalid document");
        }
        return spec.create(normalized);
    }
}
