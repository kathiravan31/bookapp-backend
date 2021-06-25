module.exports.validateRegisterInput = (username,email,password) => {
    const errors = {};

    if(username.trim() === ''){
        errors.username = 'username must not be empty'
    }
    if(email.trim() === ''){
        errors.email = 'email must not be empty'
    }else{
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

        if(!email.match(regEx)){
            errors.email = 'Email must be valid email address'
        }
    }
    if(password.trim() === ''){
        errors.password = 'password must not be empty'
    }
    return{
        errors,
        valid:Object.keys(errors).length <= 0
    }

}


module.exports.validateLoginInput = (username,password) => {
    const errors = {};

    if(username.trim() === ''){
        errors.username = 'username must not be empty'
    }
    if(password.trim() === ''){
        errors.password = 'password must not be empty'
    }
    return{
        errors,
        valid:Object.keys(errors).length <= 0
    }
}


module.exports.validateBookInput = (title,author,book_image,description,buylink,price) => {
    const errors = {};

    if(title.trim() === ''){
        errors.title = 'title must not be empty'
    }
    if(author.trim() === ''){
        errors.author = 'author must not be empty'
    }
    if(price.trim() === ''){
        errors.price = 'price must not be empty'
    }
    if(book_image.trim() === ''){
        errors.imageUri = 'imageUri must not be empty'
    }
    if(description.trim() === ''){
        errors.description = 'description must not be empty'
    }
    if(buylink.length === 0){
        errors.buylink = 'buylink must not be empty'
    }

    return{
        errors,
        valid:Object.keys(errors).length <= 0
    }
}