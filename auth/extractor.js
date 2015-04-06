export default  (profile, callback) => {
    let { id, displayName, name, emails, photos, gender } = profile;
    let email = emails[0].value;
    let photo = photos[0].value;
    let auth = 'google';
    callback(null, { 
        id, 
        displayName, 
        name, 
        email, 
        photo, 
        gender,
        auth
    });

}