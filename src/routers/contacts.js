import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getAllContactsController,
         getContactByIdController,
         createContactController,
         patchContactController,
         deleteContactController
} from "../controllers/contacts.js";

export const studentRouter = Router();

studentRouter.get('/contacts', ctrlWrapper(getAllContactsController));
studentRouter.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
studentRouter.post('/contacts', ctrlWrapper(createContactController));
studentRouter.patch('/contacts/:contactId', ctrlWrapper(patchContactController));
studentRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
