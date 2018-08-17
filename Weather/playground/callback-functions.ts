interface User {
  id: number;
  name: string;
}

let getUser = (id: number, callback: Function) => {
    let user : User = {
        id,
        name:"houmam"
    }
    callback(user);
};

getUser(31, (user:User) => {
  console.log(user);
});
