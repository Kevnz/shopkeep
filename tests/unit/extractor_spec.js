import assert from 'assert';
import extractor from '../../auth/extractor';
let profile = {"provider":"google","id":"123456712365432134222","displayName":"Test User",
"name":{"familyName":"User","givenName":"Test"},
"emails":[{"value":"test.user@fakemail.com","type":"account"}],
"photos":[{"value":"http://placekitten.com/g/50/50"}],"gender":"digital"
};//profile has more but don't need


describe('extractor module', () =>{
    it('should return a flattened object given a google profile', (done) => {
        extractor(profile, (err, extractedProfile) =>{
            assert.equal(extractedProfile.email, 'test.user@fakemail.com');
            done();
        });
    });
});