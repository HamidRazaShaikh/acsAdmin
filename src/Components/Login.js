import React, {useState} from 'react'
import Clogo from '../assets/images/Clogo.png';
import cover from '../assets/images/cover.png';
import validation from './validation'
import { useHistory } from "react-router-dom";


export default function Login() {

  const [values, setvalues] = useState({ })

  const [errors, seterrors] = useState({})
  const history = useHistory();

  

  const handleSubmit = (e) => {
    e.preventDefault()
    seterrors(validation(values))
    PostApi()
   

  }

  const handleChange = (e) => {
      e.persist()
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    }

    )

  }

  const PostApi = () => {
    fetch('/v1/fe/root/org/admin/signin', {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            email: values.email,
            password: values.password,
        })
      }).then((res) => {
        // history.go(-1);
        if(res.status === 200){
            history.push('/getEmail')
        }
       
        console.log(res.status)
        
        
      }).catch(err => {
          console.log(err)
      })
      
  

  }
    return (

        <div className="container-fluid">
            {/* left section */}
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <img className="imag" src={Clogo} alt="Clogo.png" />
                    <div className=" alignment px-2 mt-1 pt-2">
                        <h2 className="head font-weight-bolder">Welcome Back</h2>
                        {/* FORM */}
                        <form onSubmit={handleSubmit}>
                            <div className="control-form mt-5">
                                <input className="form-control mb-3" type="email" id="email" placeholder="Email" name="email"
                                value={values.email} onChange={handleChange}/>
                                {errors.email && <p className="error">{errors.email}</p>}<br />
                                <input className="form-control" type="password" placeholder="password" id="pwd" name="password"
                                value={values.password} onChange={handleChange} />
                                {errors.password && <p className="error">{errors.password}</p>}<br />
                                <div className="content-right">
                                <input className="mr-2" type="checkbox" name="checkbox" id="box" />
                                <small>Remember me</small>
                                <a className="text-danger text-decoration-none fp" href="ForgetPWD.html"><small>Forget
                                    password</small></a><br />
                                    </div>
                                     
                                {/* button */}
                                <input type="submit" className=" w-100 btn btn-primary my-5 bton" defaultValue="Login" style={{ padding: '3% 40%', borderRadius: '10px' }} /><br />
                                <div className="text-center">
                                    <p className="forget">Don't have an account? &nbsp;<a className="register" href="Register.html">
                                        Register now</a>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* right section */}
                <div className="col-md-6 col-sm-12 pic">
                    <img className=" cover-img w-100" src={cover} alt="" />
                </div>
                {/* for row */}
            </div>
        </div >
        //   {/* for body */ }
    );
}
