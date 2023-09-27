//#region :
//#endregion

//REMEMBER TO ADD FUNCTION TO MODULE EXPORTS BELOW!

//#region Random string file generator: 
function random_stuff(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
//#endregion










module.exports = {
    random_stuff,
  };