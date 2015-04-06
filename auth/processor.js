import extractor from './extractor';

export default  (token, tokenSecret, profile, done) => {
    extractor(profile, (err, user) => {
        console.log(user);
        done(null, user);
    });
}