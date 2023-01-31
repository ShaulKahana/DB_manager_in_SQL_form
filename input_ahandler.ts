import * as readline from "node:readline/promises";
import {stdin as input, stdout as output } from "node:process";
import{addUser}from './add_User';
import{searchUser}from './search_User';
import{User_line}from "./interfces"
import {insert_id_to_map} from './Read_file';
import {deleteUser} from './Delete_user';


let user_line:User_line = new User_line;

const user_map = new Map();




async function db_maneger() {
    const rl = readline.createInterface({ input, output, terminal: false });
    let action:string ;

    setTimeout((function printName()
    {console.log("Hello and welcome, what would you like to do (add || search || exit || delete)? ")}),500)

    action = await rl.question("");

    switch (action) {
        case "add":
            addUser(user_line,user_map).then(() => {db_maneger(); })
            break;

        case "search":
            searchUser(user_map).then(() => {db_maneger(); })
            break;

        case "delete":
            deleteUser(user_map).then(() => {db_maneger(); })
            break;

        case "exit":
            console.log("Have a good day");
            rl.close();
            process.exit()

        default:
            console.error("Must choose 'add' or 'search' or 'delete' or 'exit'!\n");
            db_maneger()
            break;
    }
}


insert_id_to_map(user_line,user_map).then(() => {db_maneger(); })