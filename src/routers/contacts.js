import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getAllContactsController,
         getContactByIdController,
         createContactController,
         patchContactController,
         deleteContactController
} from "../controllers/contacts.js";

export const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getAllContactsController));
contactRouter.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
contactRouter.post('/contacts', ctrlWrapper(createContactController));
contactRouter.patch('/contacts/:contactId', ctrlWrapper(patchContactController));
contactRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
