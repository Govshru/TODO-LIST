
import './App.css';
import React, { useEffect, useState } from 'react';
import List from './Component/List';
import Alert from './Component/Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please enter a value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Value updated");
    } else {
      showAlert(true, "success", "Item has been added");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  }

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  }

  const removeItem = (id) => {
    setList(list.filter(item => item.id !== id));
  }

  const editItem = (id) => {
    const specificItem = list.find(item => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  const clearList = () => {
    setList([]);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <>
      <div>
        <section>
          <form onSubmit={handelSubmit}>
            {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
            <h1>Todo List</h1>
            <div>
              <input
                type="text"
                placeholder="Enter your task"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button  type="submit">
                {isEditing ? "Edit" : "Submit"}
              </button>
            </div>
          </form>
          <br />

          {list.length > 0 && (
            <div>
              <List items={list} removeItem={removeItem} editItem={editItem} />
              <button  className="Button" SonClick={clearList}>Clear All</button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
