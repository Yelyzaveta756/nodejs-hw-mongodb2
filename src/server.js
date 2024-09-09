import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

export default function setupServer(){
    const app = express();
    const PORT = Number(env('PORT', 3000));

    app.use(cors());

    app.use(
        pino({
        transport: {
          target: 'pino-pretty',
        },
        options: {
          colorize: true,
          translateTime: true,
          ignore: 'pid,hostname',
        },
      }),
    );
    app.use(express.json());

    app.get("/contacts", async (req, res) => {

        const contacts = await getAllContacts();
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });
    });

    app.get("/contacts/:contactId", async (req, res) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        if(!contact){
            res.status(404).json({
            message: 'Contact not found'
        });
        return;
    }

        res.json({
            status: 200,
            message: "Successfully found contact!",
            data: contact,
        });
    });

    app.use('*', (req, res) => {
        res.status(404).json({
            message: 'Not found',
        });
      });

      app.use((err, req, res, next) => {
        res.status(500).json({
          message: 'Something went wrong',
          error: err.message,
        });
      });

      app.listen(PORT, ()=> {
        console.log(`Server is running on ${PORT}`);
      });
}


