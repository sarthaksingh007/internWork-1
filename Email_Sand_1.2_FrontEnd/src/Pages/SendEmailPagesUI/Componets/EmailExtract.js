import React, { useState } from "react";
import URLAPI from "../API/URLAPI";

function EmailExtract() {
  const [file, setFile] = useState(null);
  const [emails, setEmails] = useState({});

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("domainList", file);

    const response = await fetch(`${URLAPI}/extract-emails`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setEmails(data);
  };

  return (
    <>

<h3>
        <i class="bi bi-geo-alt-fill"></i>
        <span> Applications /</span>Email Extract
      </h3>
     <div className="container pt-5">
      <form onSubmit={handleFormSubmit}>
        <input type="file" name="domainList" onChange={handleFileChange} />
        <button type="submit" className="btn btn-primary p-1">Extract Emails</button>
      </form>
      <hr></hr>
      <table className="table table-striped-columns ">
        <thead>
          <tr className="">
            <th>#SL</th>
            <th>Domain</th>
            <th>Emails</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(emails).map((domain, i) => (
            <tr  key={domain}>
              <td>
                <h3>{i + 1}</h3>
              </td>
              <td >
                <h3 className="d-flex justify-content-center align-items-center">{domain}</h3>
              </td>
              <td>
                <ul className="overflow-auto" style={{ maxHeight: "150px" }}>
                  {emails[domain].map((email, i) => (
                    <p key={email}>
                      {i + 1}.{email}
                    </p>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
   
  );
}

export default EmailExtract;
