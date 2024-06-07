import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
const ViewContact = ({ contact, setContact, onEditContact }) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTc3NDY3NDIyNzYtMjc5NjYxMTE0IiwiaWF0IjoxNzE3NzQ2NzQyLCJleHAiOjE3MTc5MTk1NDJ9.T3D2lYoq4Zd1u2JbQKwdojecJezpgAKbcrNfHbcCZ9Y";

  const HandleDelete = (_id) => {
    axios
      .delete(`https://service.apikeeda.com/contact-book/${_id}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log("Delete successful:", response.data);

        const updatedContacts = contact.filter((item) => {
          return item._id !== _id;
        });
        // console.log(updatedContacts, "*-*-*-*-");
        setContact(updatedContacts);
      })
      .catch((error) => {
        console.error("Failed to delete contact:", error);
      });
  };

  const onEditData = (item) => {
    if (onEditContact) {
      onEditContact(item);
    }
  };

  return (
    <div className="container viewContact  mt-4">
      <div className="row gy-4 justify-content-center">
        {contact.map((item, index) => (
          <div key={item._id} className="col-12">
            <div className="card w-100 shadow-lg">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">
                  {item.firstName} {item.lastName}
                </h5>
              </div>
              <div className="card-body bg-light">
                <p>
                  <strong>Phone:</strong> {item.mobileNo}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
              </div>
              <div className="card-footer  d-flex gap-3 ">
                <button
                  className="btn btn-primary"
                  onClick={() => onEditData(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => HandleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewContact;
