//JSDocs for the countReactions function
/**
 * @function 
 * @param {object} obj A JSON object with reactions as a key. 
 * @returns Returns the total amount of reactions after counting all the individual symbols and how many of them there are.
 */
export default function countReactions(obj){
    let x = 0
    obj.reactions.forEach((elem)=>{
      x += elem.count
  
    })
    return x
  }
  