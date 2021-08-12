function validationDepartmentProfile(values) {
    let errors = {}

    if(!values.location){
        errors.email="Email is Required."
    }
   
    else if(!values.name)
    {
        errors.address="Adress is Required."
    }
   
    else if(!values.label)
    {
        errors.city="City is Required."
    }
    else if(!values.description)
    {
        errors.state="State is Required."
    }
   
    return errors
}

export default validationDepartmentProfile
