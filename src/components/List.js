import "./List.css";
import { useState, useReducer } from "react";
import { MdDeleteForever } from "react-icons/md";

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (state.some((item) => item.name === action.payload.name)) {
        return state.map((item) =>
          item.name === action.payload.name
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      } else {
        return [...state, { name: action.payload.name, amount: 1 }];
      }

    case "ITEM_RESOLVED":
      return state.map((item) =>
        item.name === action.payload.name
          ? { ...item, resolved: !item.resolved }
          : item
      );

    case "DELETE":
      return state.filter((item) => item.name !== action.payload.name);

    default:
      return state;
  }
};

const List = () => {
  const [value, setValue] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

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

  return (
    <div className="all">
      <h1>List Detail</h1>
      <section>
        {state.map((oneItem) => {
          const { name, amount, resolved } = oneItem;
          return (
            <div key={name} style={{ display: "flex", alignItems: "center" }}>
              <p>
                {name} - {amount}
              </p>
              <MdDeleteForever
                onClick={() => deleteHandler(name)}
                style={{ cursor: "pointer", marginLeft: "8px" }}
              />
              <form action="">
                <input
                  type="checkbox"
                  checked={resolved || false}
                  onChange={() => submitCheckboxHandler(name)}
                />
              </form>
            </div>
          );
        })}
        <form onSubmit={submitFormHandler}>
          <input
            type="text"
            placeholder="Add item..."
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <input type="submit" value="Add" />
        </form>
      </section>
    </div>
  );
};

export default List;
