function validation(values) {
    let errors = {}

    if(!values.email){
        errors.email="Email is Required."
    }
    else if(/\$+@\$+\.\$+/.test(values.email))
    {
        errors.email="Email is Invalid"
    }

    if(!values.password){
        errors.password="Password is Required."
    }
    else if(values.password.length < 8)
    {
        errors.password="Password must be minimum 8 character long"
    }
    
    return errors
}

export default validation
