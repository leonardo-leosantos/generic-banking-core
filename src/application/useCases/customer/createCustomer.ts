import { Contact } from "../../../domain/entities/contact.js";
import { Customer } from "../../../domain/entities/customer.js";
import { DocumentFactory } from "../../../domain/factories/documentFactory.js";
import { Email } from "../../../domain/valueObjects/email.js";

export class CreateCustomerUseCase {
    public createCustomer(id: string, name: string, document: string, email: string): void {
        const customerDocument = DocumentFactory.create(document);
        const emailAddress = new Email(email);
        const customer = new Customer(id, name, customerDocument);
        const contact = new Contact(id, emailAddress);

        contact.markAsPrincipal();
        customer.addContact(contact);
    }
}
