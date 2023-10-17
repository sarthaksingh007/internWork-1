import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import axios from "axios";
import { APIURL } from "../../../Redux/APIURL";
import { updateCheckbox1,updateCheckbox2,updateCheckbox3,updateCheckbox4 } from "../../../Redux/actions/subuserActions";
const UserProfiles = ({}) => {
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const upplan = useSelector((state) => state.userPermissionUpdate);
  const { userInfo } = userLogin;
  const [data, setData] = useState([]);
  const CreateMagazin = () => {
    history.push("/hub/AddUserProfile");
  };

  const getData = async () => {
    try {
      const response = await axios.get(`${APIURL}/api/subUsers/`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const clickHandler = (id) => {
    // console.log(id); onClick={() => clickHandler(item._id)}
    history.push(`/hub/AddUserProfile/${id}`);
  };
  const deleteHandler = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      if (window.confirm("Are you sure?")) {
        await axios.delete(`${APIURL}/api/subUsers/${id}`, config);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const printthepage = () => {
    window.print();
  };
  const dispatch = useDispatch();
  const handleChange = (e, id, i) => {
    const dummy = data;
    if (e.target.name === "checkbox1") {
      dummy[i].applicationAccess1 = !data[i].applicationAccess1;
      setData([...dummy]);
      dispatch(updateCheckbox1(data[i], id, getData));
    } else if (e.target.name === "checkbox2") {
      dummy[i].applicationAccess2 = !data[i].applicationAccess2;
      setData([...dummy]);
      dispatch(updateCheckbox2(data[i], id, getData));
    } else if (e.target.name === "checkbox3") {
      dummy[i].applicationAccess3 = !data[i].applicationAccess3;
      setData([...dummy]);
      dispatch(updateCheckbox3(data[i], id, getData));
    } else {
      dummy[i].applicationAccess4 = !data[i].applicationAccess4;
      setData([...dummy]);
      dispatch(updateCheckbox4(data[i], id, getData));
    }
  };
  return (
    <div>
      <form action="">
        <div class="">
          <h3 className="fs-15">
            <i class="bi bi-geo-alt-fill"></i>
            <span> Home / Manage User Profile / User Profile /</span>View User
            Profile
          </h3>
          <div className="mt-5 d-flex justify-content-between">
            <div className="gap-2 d-flex justify-content-between">
              <button
                type="button"
                onClick={CreateMagazin}
                style={{ backgroundColor: "#000081", color: "#fff" }}
                class="btn p-2"
              >
                Add
              </button>
              <button type="button" class="btn btn-outline-secondary p-2">
                View
              </button>
            </div>
            <div className="gap-3 d-flex flex-row-reverse d-flex align-items-center">
              <div className="ShowEntries d-flex align-items-center">
                {data.length > 0 ? (
                  <p className="Entries">
                    {" "}
                    All Results:
                    <span className="text-primary">{data.length}</span>{" "}
                  </p>
                ) : (
                  <p className="Entries"> All Results: 0</p>
                )}
              </div>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id="button-tooltip-2" className="p-1">
                    <span className="p-2">Reload</span>
                  </Tooltip>
                }
              >
                <button
                  onClick={refreshPage}
                  type="button"
                  style={{
                    borderRadius: "5px",
                    width: "50px",
                    height: "40px",
                    backgroundColor: "",
                    color: "#000",
                  }}
                  class="btn btn-secondary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <i class="bi bi-arrow-clockwise"></i>
                </button>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id="button-tooltip-2" className="p-1">
                    <span className="p-2"> Delete</span>
                  </Tooltip>
                }
              >
                <button
                  type="button"
                  style={{
                    borderRadius: "5px",
                    width: "50px",
                    height: "40px",
                    backgroundColor: "",
                    color: "#000",
                  }}
                  class="btn btn-secondary"
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id="button-tooltip-2" className="p-1">
                    <span className="p-2"> Print This Page</span>
                  </Tooltip>
                }
              >
                <button
                  onClick={printthepage}
                  type="button"
                  style={{
                    borderRadius: "5px",
                    width: "50px",
                    height: "40px",
                    backgroundColor: "",
                    color: "#000",
                  }}
                  class="btn btn-secondary"
                >
                  <i class="bi bi-printer-fill"></i>
                </button>
              </OverlayTrigger>
            </div>
          </div>
          <div className="" style={{ backgroundColor: "#fcfae1" }}>
            <div className="border border-2 d-flex   p-2">
              <input
                type="text"
                placeholder="Name"
                className="maga_name"
              ></input>
              <button type="button" class="btn btn-success p-1 mx-2">
                Show
              </button>
            </div>
          </div>

          <div class="text-center coupon-data mobileresponsive mt-2">
            <Table bordered hover responsive className="border rounded ">
              <thead>
                <tr
                  class="text-center"
                  style={{
                    backgroundColor: "#eaebed",
                    fontWeight: "bold",
                    fontSize: "15px",
                    color: "#000",
                  }}
                >
                  <th scope="col">SL. No.</th>
                  <th scope="col">User Name </th>
                  <th scope="col">Mobile No</th>
                  <th scope="col">Privilage</th>
                  <th scope="col">Status</th>
                  <th scope="col">Price</th>
                  <th scope="col">Suscription Day</th>
                  <th scope="col">Application Access</th>
                  <th scope="col">Created on</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((item, i) => (
                    <tr key={item._id}>
                      <th className="p-2" scope="row">
                        {i + 1}
                      </th>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.mobile_no} </td>
                      <td className="p-2">{item.privilege}</td>
                      <td className="p-1">
                        {item.status === "active" ? (
                          <button type="button" class="btn btn-danger p-1">
                            Active
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-outline-danger p-1"
                          >
                            Inactive
                          </button>
                        )}
                      </td>
                      <td className="p-2">{item.Price}</td>
                      <td className="p-2">
                        {item.SubcriptionDay}
                      </td>
                      <td className="p-2">
                        <input
                          class="form-check-input p-1 m-1"
                          type="checkbox"
                          id="flexCheckDefault"
                          name="checkbox1"
                          style={{ border: "solid 1px #000" }}
                          value={item.applicationAccess1}
                          checked={item.applicationAccess1}
                          onChange={(e) => handleChange(e, item._id, i)}
                        />
                        1,
                        <input
                          class="form-check-input p-1 m-1"
                          type="checkbox"
                          id="flexCheckDefault"
                          name="checkbox2"
                          style={{ border: "solid 1px #000" }}
                          value={item.applicationAccess2}
                          checked={item.applicationAccess2}
                          onChange={(e) => handleChange(e, item._id,i)}
                        />
                        2,
                        <input
                          class="form-check-input p-1 m-1"
                          type="checkbox"
                          id="flexCheckDefault"
                          name="checkbox3"
                          style={{ border: "solid 1px #000" }}
                          value={item.applicationAccess3}
                          checked={item.applicationAccess3}
                          onChange={(e, t) => handleChange(e, item._id,i)}
                        />
                        3,{" "}
                        <input
                          class="form-check-input p-1 m-1"
                          type="checkbox"
                          id="flexCheckDefault"
                          name="checkbox4"
                          style={{ border: "solid 1px #000" }}
                          value={item.applicationAccess4}
                          checked={item.applicationAccess4}
                          onChange={(e) => handleChange(e, item._id,i)}
                        />
                        4,
                      </td>

                      <td className="p-2">{item.createdAt.substring(0, 10)}</td>
                      <td
                        className="p-1 text-center"
                        onClick={() => clickHandler(item._id)}
                      >
                        <i class="bi bi-pencil-square"></i>{" "}
                      </td>
                      <td
                        className="p-1 text-center"
                        onClick={() => deleteHandler(item._id)}
                      >
                        <i class="bi bi-trash"></i>{" "}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          {/* <div className="coupon-data">
            <table className="coupon-table">
              <tr className="coupon-tr">
                <th className="pd-10">Journal Name</th>
                <th>Author</th>
                <th>Status</th>
                <th>No Of Volume</th>
                <th>Type</th>
              </tr>

              <tr className="coupon-tr">
                <td></td>

                <td className="coupon_td">No Record</td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div> */}

          <button type="button" class="btn btn-success p-1 mt-2">
            Update Link Number
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfiles;
