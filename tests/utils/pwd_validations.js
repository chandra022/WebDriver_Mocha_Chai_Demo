const credentials = function(){
    this.pwdCheck = function( pwd ){
        if( (pwd.length >= 8) && (pwd.length <= 12 ) )  return true;
        return false;
    }
}
module.exports = new credentials();






// export function pwdCheck( pwd  ){
//     if( (pwd.length >= 8) && (pwd.length <= 12 ) )  return true;
//     return false;
// }
