function validationLocationProfile(values) {
    let errors = {}

    if(!values.email){
        errors.email="Email is Required."
    }
    else if(!/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(values.email))
    {
        errors.email="Email is Invalid"
    }
    else if(!values.address)
    {
        errors.address="Adress is Required."
    }
   
    else if(!values.city)
    {
        errors.city="City is Required."
    }
    else if(!values.state)
    {
        errors.state="State is Required."
    }
    else if(!values.zipcode)
    {
        errors.zipcode="Zip Code is Required."
    }
    else if(!values.phone1)
    {
        errors.phone1="Phone No is Required."
    }
    else if(!values.phone2)
    {
        errors.phone2="Phone No is Required."
    }
    return errors
}

export default validationLocationProfile
