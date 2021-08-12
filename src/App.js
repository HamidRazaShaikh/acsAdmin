import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./Components/Login";
import './assets/css/login.css';
import User1 from './Components/User1';
import 'bootstrap/dist/css/bootstrap.min.css';
import Updatepwd from './Components/updatepassword';
import Log from './Components/form';
import Updatemail from './Components/updateemail';
import Orgprofile from './Components/orgprofile';
import LocationProfile from './Components/locationprofile';
import AllLocations from './Components/alllocations';
import LocationProfileUpdate from './Components/locationprofileupdate';
import DepartmentProfile from './Components/departmentprofile';
import AllDepartment from './Components/alldepartments';
import DepartmentProfileUpdate from './Components/departmentprofileupdate';
import ViewDepartment from './Components/viewdepartments';
import MedicalProcedure from './Components/medicalprocedure';
import AllMedicalProcedure from './Components/allmedicalprocedure';
import UpdateMedicalProcedure from './Components/updatemedicalprocedure';
import PolicyGroup from './Components/policygroup';
import AllPolicyGroup from './Components/allpolicygroup';
import AllLimits from './Components/alllimits';
import AddUser from './Components/addusers';
import AllUsers from './Components/allusers';
import UserDetailProfile from './Components/userdetailprofile';
import UserContact from './Components/usercontact';
import UserEmail from './Components/useremail';
import UserPassword from './Components/userpassword';
import UserStatus from './Components/useraccess';
import UserPolicy from './Components/userpolicy';
import UserDepartment from './Components/userdepartment';
import CustomizedDialogs from './Components/popup';
import GetEmail from './Components/getEmail';
import UpdateOrgProfile from './Components/updateorgprofile';
import Allpatients from './Components/allpatients';
import UpdatePolicyGroup from './Components/updatepolicygroup';
import Addlimit from './Components/addlimit';







// import './App.scss';

function App() {
  return (
<div>
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
          <Login />
          </Route>

          <Route path="/User1">
            <User1 />
          </Route>
          < Route path="/getEmail">
            <GetEmail />
          </Route>
          < Route path="/updateemail">
            <Updatemail />
          </Route>
          <Route path="/updatepassword">
            <Updatepwd />
          </Route>
          <Route path="/orgprofile">
            <Orgprofile />
          </Route>
          <Route path="/updateorgprofile">
            <UpdateOrgProfile />
          </Route>
          <Route path="/locationprofile">
            <LocationProfile />
          </Route>
          <Route path="/alllocations">
            <AllLocations />
          </Route>
          <Route path="/locationprofileupdate/:id">
            <LocationProfileUpdate />
          </Route>
          <Route path="/departmentprofile">
            <DepartmentProfile />
          </Route>
          <Route path="/alldepartments">
            <AllDepartment />
          </Route>
          <Route path="/departmentprofileupdate/:id">
            <DepartmentProfileUpdate />
          </Route>
          <Route path="/viewdepartments">
            <ViewDepartment />
          </Route>
          <Route path="/medicalprocedure">
            <MedicalProcedure/>
          </Route>
          <Route path="/allmedicalprocedure">
            <AllMedicalProcedure/>
          </Route>
          <Route path="/updatemedicalprocedure/:id">
            <UpdateMedicalProcedure/>
          </Route>
          <Route path="/policygroup">
            <PolicyGroup />
          </Route>
          <Route path="/allpolicygroup">
            <AllPolicyGroup />
          </Route>
          <Route path="/updatepolicygroup/:id">
            <UpdatePolicyGroup />
          </Route>
          <Route path="/alllimits">
            <AllLimits />
          </Route>
          <Route path="/addusers">
            <AddUser />
          </Route>
          <Route path="/allusers">
            <AllUsers />
          </Route>
          <Route path="/userdetailprofile/:id">
            <UserDetailProfile />
          </Route>
          <Route path="/usercontact/:id">
            <UserContact />
          </Route>
          <Route path="/useremail/:id">
            <UserEmail />
          </Route>
          <Route path="/userpassword/:id">
            <UserPassword />
          </Route>
          <Route path="/useraccess/:id">
            <UserStatus />
          </Route>
          <Route path="/userpolicy/:id">
            <UserPolicy />
          </Route>
          <Route path="/userdepartment/:id">
            <UserDepartment />
          </Route>
          < Route path="/popup">
            <CustomizedDialogs />
          </Route>
          < Route path="/addlimit">
            <Addlimit />
          </Route>
          < Route path="/allpatients">
            <Allpatients />
          </Route>
          < Route path="/form">
            <Log />
          </Route>
         
          
          
        </Switch>
      </div>

    </Router >
    </div>

  );
}

export default App;


