import { useEffect, useState } from "react";
import "./App.css";
import { FaSave } from "react-icons/fa";
import axios from "axios";

function App() {
  const initialVal = {
    bankName: "",
    cType: "",
    cName: "",
    date: "",
    bCode: "",
  };
  const [userList, setUserList] = useState([]);
  const [value, setValue] = useState(initialVal);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  const [toggle, setToggle] = useState(false);

  const addData = async () => {
    try {
      console.log(value);
      const res = await axios.post("http://localhost:4000/api/data/add", {
        bankname: value.bankName,
        ctype: value.cType,
        cname: value.cName,
        date: value.date,
        bcode: value.bCode,
      });
      alert(res.data.msg);
      setToggle(!toggle);
      setValue(initialVal);
    } catch (error) {
      console.log(error);
      alert("Internal Server Error !!");
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/data/delete/${id}`
      );
      alert(res.data.msg);
      setToggle(!toggle);
    } catch (error) {
      console.log(error);
      alert("Internal Server Error");
    }
  };

  const updateData = async () => {
    try {
      const res = await axios.put("http://localhost:4000/api/data/update", {
        data: {
          id: id,
          value: value,
        },
      });
      alert(res.data.msg);
      setToggle(!toggle);
      setValue(initialVal);
      setEdit(false);
    } catch (error) {
      console.log(error);
      alert("Internal sever Error");
    }
  };

  const updateDetails = (item) => {
    setValue(item);
    setEdit(true);
    setId(item._id);
  };

  const deleteAll = async () => {
    const res = await axios.delete("http://localhost:4000/api/data/delete_all");
    alert(res.data.msg);
    setToggle(!toggle);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/data/getData");
        setUserList(res.data);
      } catch (error) {
        console.log(error);
        alert("Internal Server Error !!");
      }
    };
    getData();
  }, [toggle]);

  return (
    <div className="app">
      <h2>Bank Charges</h2>

      <div className="row">
        <div id="bankname">Bank Name : </div>
        <select
          value={value.bankName}
          id="bankname"
          onChange={(event) =>
            setValue((prev) => ({ ...prev, bankName: event.target.value }))
          }
        >
          <option value="" disabled selected>
            --Select Bank Name--
          </option>
          <option value="State Bank Of India">State Bank Of India</option>
          <option value="Axis Bank">Axis Bank</option>
          <option value="Punjab National Bank">Punjab National Bank</option>
        </select>

        <div id="chargestype">Charges Type : </div>
        <select
          id="chargestype"
          value={value.cType}
          onChange={(event) =>
            setValue((prev) => ({ ...prev, cType: event.target.value }))
          }
        >
          <option value="" disabled selected>
            --Select Bank Charges Type--
          </option>
          <option value="Option-1">Option-1</option>
          <option value="Option-2">Option-2</option>
          <option value="Option-3">Option-3</option>
        </select>
      </div>

      <div className="row">
        <div id="cname">Charges Name : </div>
        <select
          id="cname"
          value={value.cName}
          onChange={(event) =>
            setValue((prev) => ({ ...prev, cName: event.target.value }))
          }
        >
          <option value="" disabled selected>
            --Select Bank Charges Name--
          </option>
          <option value="Name-1">Name-1</option>
          <option value="Name-2">Name-2</option>
          <option value="Name-3">Name-3</option>
        </select>

        <div id="date">Date : </div>
        <input
          type="date"
          id="date"
          value={value.date}
          onChange={(event) =>
            setValue((prev) => ({ ...prev, date: event.target.value }))
          }
        />
      </div>

      <div className="row">
      <div id="bookcode">Book Code : </div>
      <input
        type="text"
        id="bookcode"
        value={value.bCode}
        onChange={(event) =>
          setValue((prev) => ({ ...prev, bCode: event.target.value }))
        }
      />

      {edit ? (
        <button onClick={updateData}>
          <FaSave style={{ marginRight: "5px" }} size={13} />
          Save Changes
        </button>
      ) : (
        <button onClick={addData}>
          <FaSave style={{ marginRight: "5px" }} size={13} />
          Save
        </button>
      )}
      <button onClick={deleteAll}>Clear All</button>
      </div>

      <div className="lower-part">
        <table className="table">
          <thead>
            <tr>
              <th>Bank Name</th>
              <th>Charges Type</th>
              <th>Charges Name</th>
              <th>Date</th>
              <th>Book Code</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((item) => (
              <tr key={item._id}>
                <td>{item.bankName}</td>
                <td>{item.cType}</td>
                <td>{item.cName}</td>
                <td>{item.date}</td>
                <td>{item.bCode}</td>
                <td>
                  <button onClick={() => updateDetails(item)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => deleteUser(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
