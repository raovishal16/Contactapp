import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import ViewContact from "./ViewContact";

const AddContact = () => {
  const [formData, setFormData] = useState([]);
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [fNameError, setFnameError] = useState("");
  const [LNameError, setLnameError] = useState("");
  const [nickNameErro, setNikeNameError] = useState("");
  let [editableContact, setEditableContact] = useState(null);
  let [searchData, setSearchData] = useState("");
  const data = {
    firstName: fName,
    lastName: lName,
    mobileNo: phone,
    email: email,
  };
  const nameRGX = /^[A-Z][a-zA-Z]+$/;
  const mobileRGX = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  const emailRGX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTc3NDY2NTQ5NTgtMjgwMzIzNjM4IiwiaWF0IjoxNzE3NzQ2NjU0LCJleHAiOjE3MTc5MTk0NTR9.rHijffVR8JYZ8WqsicfMBbni1Y8ZOkbYDl3FedqdFiI";
  useEffect(() => {
    axios
      .get("https://service.apikeeda.com/contact-book", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setFormData(response.data.data);
        console.log("Fetched data:", response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }, [token]);

  const tokenofPOst =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTc3NDY2NzczNDctMTQ2NTcyODg5IiwiaWF0IjoxNzE3NzQ2Njc3LCJleHAiOjE3MTc5MTk0Nzd9.74RNGLoT1lO9fWqPNT3dRM5I0R4TOWkMENH4ByLvn0w";
  const UpdatToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTc3NDY3MjE3MTEtODc0NDU2MzcwIiwiaWF0IjoxNzE3NzQ2NzIxLCJleHAiOjE3MTc5MTk1MjF9.U-vbNroJq8nD-7958yk-_fLqqfEi2pb0iOG2SL7wduk";
  const HandleSub = () => {
    let formValid = true;

    // Validation checks
    if (!mobileRGX.test(phone)) {
      setPhoneError("Enter a 10-digit phone number...");
      formValid = false;
    } else {
      setPhoneError("");
    }

    if (!emailRGX.test(email)) {
      setEmailError("Enter a valid email...");
      formValid = false;
    } else {
      setEmailError("");
    }

    if (!nameRGX.test(fName)) {
      setFnameError(
        "Enter a valid first name starting with a capital letter..."
      );
      formValid = false;
    } else {
      setFnameError("");
    }

    if (!nameRGX.test(lName)) {
      setLnameError(
        "Enter a valid last name starting with a capital letter..."
      );
      formValid = false;
    } else {
      setLnameError("");
    }

    if (!nameRGX.test(nickName)) {
      setNikeNameError(
        "Enter a valid nickname starting with a capital letter..."
      );
      formValid = false;
    } else {
      setNikeNameError("");
    }

    if (formValid) {
      const data = {
        firstName: fName,
        lastName: lName,
        mobileNo: phone,
        email: email,
        nickName: nickName,
      };

      if (editableContact) {
        axios
          .patch(
            `https://service.apikeeda.com/contact-book/${editableContact._id}`,
            data,
            {
              headers: {
                Authorization: `${UpdatToken}`,
              },
            }
          )
          .then((response) => {
            const updatedContacts = formData.map((contact) => {
              if (contact._id === editableContact._id) {
                return { ...contact, ...response.data.data };
              }
              return contact;
            });
            setFormData(updatedContacts);
            setEditableContact(null);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post("https://service.apikeeda.com/contact-book", data, {
            headers: {
              Authorization: `${tokenofPOst}`,
            },
          })
          .then(function (response) {
            console.log(response.data.data, "++++");
            setFormData([...formData, response.data.data]);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      setFname("");
      setLname("");
      setPhone("");
      setEmail("");
      setNickName("");
      setEditableContact(null);
    }
  };
  const handleEditContact = (contact) => {
    setFname(contact.firstName);
    setLname(contact.lastName);
    setPhone(contact.mobileNo);
    setEmail(contact.email);
    setNickName(contact.nickName || "");
    setEditableContact(contact);
  };

  const filteredContacts = searchData
    ? formData.filter((contact) =>
        contact.phone.toLowerCase().includes(searchData.toLowerCase())
      )
    : formData;

  return (
    <>
      <div className="container my-5">
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="row gx-3  w-100">
            <div className="col-md-6">
              <div className="card rounded-5 w-100 shadow-lg">
                <div className="card-header text-white">
                  <h3 className="card-title">Add Contact</h3>
                </div>
                <div className="card-body bg-light">
                  <div className="row w-100 align-items-center gy-4">
                    <div className="col-4">
                      <label htmlFor="">Enter FirstName</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className={`form-control ${
                          fNameError ? "is-invalid" : ""
                        }`}
                        placeholder="Enter First Name..."
                        value={fName}
                        onChange={(e) => {
                          setFname(e.target.value);
                          if (fNameError) setFnameError("");
                        }}
                      />
                      {fNameError && (
                        <p className="text-danger mb-0">{fNameError}</p>
                      )}
                    </div>
                    <div className="col-4">
                      <label htmlFor="">Enter LastName</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className={`form-control ${
                          LNameError ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Last Name..."
                        value={lName}
                        onChange={(e) => {
                          setLname(e.target.value);
                          if (LNameError) setLnameError("");
                        }}
                      />
                      {LNameError && (
                        <p className="text-danger mb-0">{LNameError}</p>
                      )}
                    </div>
                    <div className="col-4">
                      <label htmlFor="">Enter MobileNo</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className={`form-control ${
                          phoneError ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Phone number..."
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (phoneError) setPhoneError("");
                        }}
                        inputMode="numeric"
                      />
                      {phoneError && (
                        <p className="text-danger mb-0">{phoneError}</p>
                      )}
                    </div>
                    <div className="col-4">
                      <label htmlFor="">Enter E-mail</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="email"
                        className={`form-control ${
                          EmailError ? "is-invalid" : ""
                        }`}
                        placeholder="Enter e-mail..."
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (EmailError) setEmailError("");
                        }}
                      />
                      {EmailError && (
                        <p className="text-danger mb-0">{EmailError}</p>
                      )}
                    </div>
                    <div className="col-4">
                      <label htmlFor="">Enter NickName</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className={`form-control ${
                          nickNameErro ? "is-invalid" : ""
                        }`}
                        placeholder="Enter e-mail..."
                        value={nickName}
                        onChange={(e) => {
                          setNickName(e.target.value);
                          if (nickNameErro) setNikeNameError("");
                        }}
                      />
                      {nickNameErro && (
                        <p className="text-danger mb-0">{nickNameErro}</p>
                      )}
                    </div>
                    <div className="mt-5 d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={HandleSub}
                      >
                        {editableContact != null ? "Update" : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <div className="search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search contact..."
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                />
              </div>
              <ViewContact
                contact={filteredContacts}
                setContact={setFormData}
                onEditContact={handleEditContact}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddContact;
