import axios from "axios";
import React from "react";
import { NavItem } from "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <>
      <MyComponent />
    </>
  );
}

function MyComponent() {
  const [studentName, setStudentName] = useState("Amol Chaudhari");
  const [studentID, setStudentID] = useState("210940320019");
  const [message, setMessage] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [list, setList] = useState([]);

  const handlemessageChange = (e) => {
    setMessage(e.target.value);
  };

  const addMessage = async () => {
    if ((message = "")) {
      alert("Vlidation fails");
      return;
    }

    const url = "http://localhost:4000/add-messages";
    const data = {
      message: message,
    };
    // AJAX using AXIOS to connect with backend
    await axios.post(url, data);

    const newList = [data, ...list];
    setList(newList);

    setMessage("");
  };

  const getMessage = async () => {
    const url = "http://localhost:4000/messages";
    const result = await fetch(url);
    const list = await result.json();

    const newList = [...list];
    setList(newList);
  };

  // LIke Constructor
  useEffect(() => getMessage(), []);

  return (
    <div>
      <h2 className="bg-dark text-light p-3">
        MyChatApp {studentName} {studentID}
      </h2>
      <div>
        <input
          className="form-control form-control-lg mb-1"
          type="text"
          name=""
          id=""
          value={message}
          onChange={handlemessageChange}
          placeholder="Lets chat here..."
        />
      </div>

      <div>
        <input
          className="btn btn-secondary w-100"
          type="button"
          name=""
          value="Send"
          onClick={getMessage}
        />
      </div>

      <h3 className="bg-dark text-light mt-1 p-3"></h3>

      {list.map((item, index) => (
        <div key={index} className="alert alert-secondary fs-4">
          {item.message}
        </div>
      ))}
    </div>
  );
}
