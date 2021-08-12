function validationpass(values) {
    let errors = {}

    if(!values.pass){
        errors.password="Password is Required."
    }
    else if(values.pass.length < 8)
    {
        errors.pass="Password must be minimum 8 character long"
    }
   
    else if(values.pass !== values.confirmpass)
    {
        errors.confirmpass="Password did not match"
    }
    return errors
}

export default validationpass
