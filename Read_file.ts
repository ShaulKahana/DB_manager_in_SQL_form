import {createReadStream, createWriteStream } from 'node:fs';
import {open,appendFile} from 'node:fs/promises';
import{User_line}from "./interfces"

export async function insert_id_to_map(user_line:User_line,user_map:Map<string,number>){

    const file =  await open("./id.txt");

    for await (const line of file.readLines()) {
      user_map.set(line.split(" ")[0],Number(line.split(" ")[1]));
      user_line.set()
    }

    await file.close();
}


export async function get_user_data(user_line: number| undefined, user_length:number){
    let start_bayts:number = user_line? user_line*user_length+user_line : 0;
    let end_bayts:number = start_bayts+user_length

    const createReader = createReadStream("./db.txt",{ start:  start_bayts, end:end_bayts });
  
    createReader.on("data", (data) => {
        let dataStr =  data.toString().split('\n').join("");
        let answer_split =  dataStr.split(",");
        answer_split.forEach(element => {
            console.log(element);
        });
    });
}


export async function delete_user_from_file(id:string){

    const createReader = createReadStream("./id.txt");   

    createReader.on("data", (data) => {

        let dataStr =  data.toString();
        dataStr = dataStr.replace(id,"         ")

        const createWriter = createWriteStream("./id.txt",{ start: 0 });
  
        createWriter.write("")

        createWriter.close()

        appendFile("./id.txt",dataStr)
    });    
}


