import "./List.css";
import { useState, useReducer } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

let simulatedDatabase = [
  {
    listName: "Můj seznam",
    items: [
      { name: "banány", amount: 2, resolved: false },
      { name: "cibule", amount: 1, resolved: true },
    ],
    ownerID: 1,
    memberID: 2,
  },
];

const initialState = {
  items: [...simulatedDatabase[0].items],
  unresolvedOnly: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (state.items.some((item) => item.name === action.payload.name)) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.name === action.payload.name
              ? { ...item, amount: item.amount + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [
            ...state.items,
            { name: action.payload.name, amount: 1, resolved: false },
          ],
        };
      }

    case "ITEM_RESOLVED":
      return {
        ...state,
        items: state.items.map((item) =>
          item.name === action.payload.name
            ? { ...item, resolved: !item.resolved }
            : item
        ),
      };

    case "DELETE":
      return {
        ...state,
        items: state.items.filter((item) => item.name !== action.payload.name),
      };

    case "UNRESOLVED_ONLY":
      return {
        ...state,
        unresolvedOnly: !state.unresolvedOnly,
      };

    default:
      return state;
  }
};

const List = () => {
  const [value, setValue] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (value.trim() === "") return;
    dispatch({
      type: "ADD_ITEM",
      payload: { name: value.toLowerCase() },
    });
    setValue("");
  };

  const deleteHandler = (name) => {
    dispatch({ type: "DELETE", payload: { name } });
  };

  const submitCheckboxHandler = (name) => {
    dispatch({ type: "ITEM_RESOLVED", payload: { name } });
  };

  const toggleUnresolvedOnlyHandler = () => {
    dispatch({ type: "UNRESOLVED_ONLY" });
  };

  const archiveHandler = () => {
    // try {
    //   const response = await fetch(`XXX`, {
    //     method: "Patch",
    //   });
    navigate("/");
  };
  const listDeletHandler = () => {
    // try {
    //   const response = await fetch(`XXX`, {
    //     method: "DELETE",
    //   });
    navigate("/");
  };

  const displayedItems = state.unresolvedOnly
    ? state.items.filter((item) => !item.resolved)
    : state.items;

  return (
    <div className="all">
      <h1>{simulatedDatabase[0].listName}</h1>
      <section className="list-detail">
        {displayedItems.map((oneItem) => {
          const { name, amount, resolved } = oneItem;
          return (
            <div key={name} className="one-item">
              <p>
                {name} - {amount}
              </p>
              <MdDeleteForever
                onClick={() => deleteHandler(name)}
                className="delete-button"
              />
              <form>
                <input
                  type="checkbox"
                  checked={resolved || false}
                  onChange={() => submitCheckboxHandler(name)}
                />
              </form>
            </div>
          );
        })}
        <form onSubmit={submitFormHandler} className="add-item">
          <input
            className="add-item-input"
            type="text"
            placeholder="Add item..."
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <input type="submit" value="Add" />
        </form>
        <form>
          Show Unresolved
          <input
            type="checkbox"
            checked={state.unresolvedOnly}
            onChange={toggleUnresolvedOnlyHandler}
          />
        </form>
        <div>
          <button onClick={() => archiveHandler()}>Archive</button>
          <button onClick={() => listDeletHandler()}> Delete</button>
        </div>
      </section>
    </div>
  );
};

export default List;
