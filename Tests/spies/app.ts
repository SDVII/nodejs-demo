import * as db from "./db"

export const handleSignup : Function = (email:string,password:string) =>{
    db.saveUser({
        email,
        password
    });
}