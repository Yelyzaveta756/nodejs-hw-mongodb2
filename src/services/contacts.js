import { ContactsCollection } from "../db/models/contacts.js";

export const getAllContacts = async () => {
    const contacts = ContactsCollection.find();
    return contacts;
};

export const getContactById = async (contactId) => {
    const contact = ContactsCollection.findById(contactId);
    return contact;
};

export const createContact = async (payload) => {
    const newContact = ContactsCollection.create(payload);
    return newContact;
};

export const patchContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
          new: true,
          includeResultMetadata: true,
          ...options,
        },);

        if (!rawResult || !rawResult.value) return null;

        return {
          student: rawResult.value,
          isNew: Boolean(rawResult?.lastErrorObject?.upserted),
        };
};

export const deleteContact = async (contactId) => {
    const student = await ContactsCollection.findOneAndDelete({
        _id: contactId,
      });

      return student;
};
