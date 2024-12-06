const credentials = require( './utils/pwd_validations.js' )
const assert = require( 'assert' );

describe("validate password", ()=>{

    it("valid password check", () => {
        assert.strictEqual( credentials.pwdCheck("testing123"), true );
        assert.strictEqual( credentials.pwdCheck("testing1"), true );
        assert.strictEqual( credentials.pwdCheck("testing12345"), true );
    })
    it( "invalid password check", ()=> {
        assert.strictEqual( credentials.pwdCheck("testing"), false );
        assert.strictEqual( credentials.pwdCheck("testing1234567"), false );
    } )
})