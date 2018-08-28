export const add : Function = (a:number,b:number) => a + b;
export const square : Function = (a:number) => a * a;
export const asyncAdd : Function = (a:number,b:number) =>{
   return new Promise((resolve,reject) => {
       resolve(a+b);
   })
}
