import React, {useState} from 'react'
import Clogo from '../assets/images/Clogo.png';
import cover from '../assets/images/cover.png';
// import validation from './validation'
import { useHistory } from "react-router-dom";



export default function Log() {

//   const [values, setvalues] = useState({
//     email:"",
//     password:""

//   })

//   const [errors, seterrors] = useState({})
const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault()
   // seterrors(validation(values))
   const sign = { email, password };

    fetch('http://ec2-18-212-236-109.compute-1.amazonaws.com/v1/fe/root/org/admin/signin', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(sign)
    }).then((res) => {
      // history.go(-1);
      history.push('/user1');
      console.log(res.status)
    }).catch(err => {
        console.log(err)
    })

  }

//   const handleChange = (e) => {
//     setvalues({
//       ...values,
//       [e.target.name]: e.target.value,
//     }

//     )

//   }
    return (

        <div className="container-fluid">
            {/* left section */}
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <img className="imag" src={Clogo} alt="Clogo.png" />;
                    <div className=" alignment px-5 pt-5">
                        <h2 className="head font-weight-bolder">Welcome Back</h2>
                        {/* FORM */}
                        <form onSubmit={handleSubmit}>
                            <div className="control-form mt-5">
                                {/* <input className="form-control mb-3" type="email" id="email" placeholder="Email" name="email"
                                value={values.email} onChange={handleChange}/>
                                {errors.email && <p className="error">{errors.email}</p>}<br />
                                <input className="form-control" type="password" placeholder="password" id="pwd" name="password"
                                value={values.password} onChange={handleChange} />
                                {errors.password && <p className="error">{errors.password}</p>}<br /> */}
                                <input className="form-control mb-3" type="email" id="email" placeholder="Email" 
                                value={email}  onChange={(e) => setEmail(e.target.value)}/>
                                {/* {errors.email && <p className="error">{errors.email}</p>} */}<br />
                                <input className="form-control" type="password" placeholder="password" id="pwd" 
                                value={password}  onChange={(e) => setPassword(e.target.value)} />
                                {/* {errors.password && <p className="error">{errors.password}</p>}<br /> */}
                                <input className="mr-2" type="checkbox" name="checkbox" id="box" />
                                Remember me
                                <a className="text-danger ml-5 text-decoration-none" href="ForgetPWD.html">Forget
                                    password</a><br />
                                {/* button */}
                                <input type="submit" className=" w-100 btn btn-primary my-5" defaultValue="Login" style={{ padding: '3% 40%', borderRadius: '10px' }} /><br />
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
                <div className="col-md-6 col-sm-12">
                    <img className=" cover-img w-100" src={cover} alt="" />
                </div>
                {/* for row */}
            </div>
        </div >
        //   {/* for body */ }
    );
}