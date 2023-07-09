const contactOperations = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();



async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactOperations.listContacts();
      return console.log(allContacts);
      break;

    case "get":
      const oneContact = await contactOperations.getContactById(id);
      return console.log( oneContact || null);
      break;

    case "add":
      const newContact = await contactOperations.addContact(name, email, phone);
      return console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactOperations.removeContact(id);
      return console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
