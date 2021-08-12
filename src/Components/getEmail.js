import React, { useState, useEffect } from "react";
import axios from "axios";
import Updatemail from "./updateemail";


export default function GetEmail() {
  const [organization, setorganization] = useState("");

  const getData = () => {
    axios
      .get("/v1/fe/root/org/organization/all")
      .then((response) => {
        const Alldata = response.data.payload.organization;

        setorganization(Alldata);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {organization !== "" && <Updatemail organization={organization} />}
    </div>
  );
}
