import { useReducer, useState } from "react";
import "./Members.css";
import { MdDeleteForever } from "react-icons/md";

let simulatedUserDatabase = [
  { userID: 1, userName: "Petr" },
  { userID: 2, userName: "Matěj" },
];

const initialState = simulatedUserDatabase;

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((oneUser) => oneUser.userID !== action.payload);
    default:
      return state;
  }
};
const Members = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = useState("");

  const submitFormHandler = (event) => {
    event.preventDefault();
    const newUserID = state.length + 1;
    if (value) {
      dispatch({
        type: "ADD_USER",
        payload: { userID: newUserID, userName: value },
      });
    }
    setValue("");
  };

  const clickHandler = (userID) => {
    dispatch({ type: "DELETE", payload: userID });
  };

  return (
    <div className="all">
      <h1>Members</h1>
      <section className="members-detail">
        {state.map((oneUser) => {
          const { userName, userID } = oneUser;
          return (
            <div className="one-user">
              <p key={userID}>{userName}</p>
              <MdDeleteForever
                onClick={() => clickHandler(userID)}
                className="delete-button"
              />
            </div>
          );
        })}
        <form onSubmit={submitFormHandler} className="add-user">
          <input
            className="add-user-input"
            type="text"
            placeholder="Add user..."
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <input type="submit" value="Add" />
        </form>
      </section>
    </div>
  );
};

export default Members;
