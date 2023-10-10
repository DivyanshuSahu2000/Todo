import React, { useEffect, useState } from "react";
import "./Styletodo.css";

// !!!!!=================Get LocacalData back=================!!!!!
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolistt");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputdata] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("")
  const [toggleButton, setToggleButton] = useState(false);
  
  // !!==========add the items function==========!!
  const addItem = () => {
    if (!inputdata) {
      alert("please write something 😊!!!");
    }
     else if (inputdata && toggleButton){
      setItems(
        items.map((curEl) => {
          if(curEl.id===isEditItem){
            return { ...curEl, name:inputdata}
          }
          return curEl;
        })
      );
      setInputdata ('');
setIsEditItem(null);
setToggleButton(false);
     }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputdata("");
    }
  };

  // !!!!!!==================Edit Items=====================!!!!!!
const editItem =(index) => {
const item_todo_edited = items.find((curEl) => {
  return curEl.id === index;
});
setInputdata (item_todo_edited.name);
setIsEditItem(index);
setToggleButton(true);
}


  // !!!!!====================How to Delete Item======================!!!!!

  const deleteItem = (index) => {
    const updatedItem = items.filter((curEl) => {
      return curEl.id !== index;
    });
    setItems(updatedItem);
  };

  // !!!!!!=====================Remove all Items======================!!!!!!
  const removeAll = () => {
    setItems([]);
  };

  // !!!!!!======================Adding localStorage=====================!!!!!!
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src=" ./images/todo.svg" alt="vvn" />
            <figcaption> Add Your List Here ...✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type=" text "
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputdata(event.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i> 
              ) : (
                <i className="fa fa-plus add-btn" onClick={addItem}></i>

              )
            }
          </div>
          {/* !!!============Show our Items============!!! */}
          <div className="showItems">
            {items.map((curEl) => {
              return (
                <div className="eachItem" key={curEl.id}>
                  <h3>{curEl.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() =>editItem(curEl.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curEl.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* !!!============Remove All button============!!! */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
