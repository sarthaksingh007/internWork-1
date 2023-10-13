import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import URLAPI from "../API/URLAPI";
function AddDomain() {
  const [domainList, setDomainList] = useState(null);
  const [data, setData] = useState(null);
  const history = useHistory();
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("domainList", domainList);
    try {
      const config = {
        headers: {
          "Content-Type": undefined,
        },
      };
      const response = await axios.post(
        `${URLAPI}/uploadFiles`,
        formData,
        config
      );
      console.log(response.data);
      setData(response.data);

      // Send response to another API endpoint
      const otherApiConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const otherApiResponse = await axios.post(
        `${URLAPI}/domains`,
        response.data,
        otherApiConfig
      );
      console.log(otherApiResponse.data);
    } catch (error) {
      console.error(error);
    }
  }

  const EmailSand = () => {
    history.push("/DomainCountry");
  };
  return (
    <>
      <h3>
        <i class="bi bi-geo-alt-fill"></i>
        <span> Applications /</span>Add Domain
      </h3>
      <div className="container pt-5" style={{ marginTop: "12rem" }}>
        <div className="d-flex justify-content-between">
          <div className="form-input">
            <label htmlFor="domainList">Domain List :</label>
            <div className="d-flex justify-content-between">
              <input
                type="file"
                name="domainList"
                id="domainList"
                onChange={(event) => setDomainList(event.target.files[0])}
              />
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary p-1"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div class="row mt-5">
          <div class="col">
            <h2>Valid emails:</h2>
          </div>
          <div class="col">
            {/* {data && data.domains && ( */}
            <h4>
              Total Domains:{" "}
              {/* <span className="ml-2 text-success">{data.domains.length}</span> */}
              <span className="ml-2 text-success">0</span>
            </h4>
            {/* )} */}
          </div>
        </div>
        {/* {data && data.domains && ( */}
        <table class="table table-hover">
          <thead>
            <tr >
              <th className="p-1" scope="col">#SL.</th>
              <th className="p-1" scope="col">Domain</th>
              <th className="p-1" scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.domains.map((domain, index) => ( */}
            {/* <tr key={index}> */}
            <tr>
              {/* <th scope="row">{index + 1}</th> */}
              <th className="p-1" scope="row">1</th>

              {/* <td>{data.domains[index]}</td> */}
              <td className="p-1">example.com</td>
              <td className="p-1">
                <button type="button" class="btn btn-success p-1">
                  Upload successfully
                </button>
              </td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
        {/* )} */}
      </div>
    </>
  );
}
export default AddDomain;
