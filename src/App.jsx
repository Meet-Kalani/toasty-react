import Toast from "./Components/Toast";
import UserInput from "./Components/UserInput";
import { useReducer, useCallback } from "react";

function reducer(state, action) {
  if (action.type === "add-message") {
    return [
      ...state,
      {
        id: crypto.randomUUID(),
        toastType: action.toastType,
        message: action.message,
      },
    ];
  } else if (action.type === "remove-message") {
    return state.filter((message) => message.id !== action.id);
  }
}

function App() {
  const [messages, dispatch] = useReducer(reducer, []);

  const handleNewMessage = useCallback((message, toastType) => {
    dispatch({ type: "add-message", message, toastType });
  }, []);

  const handleMessageRemove = useCallback((id) => {
    dispatch({ type: "remove-message", id });
  }, []);

  return (
    <main className="main-container">
      <UserInput handleNewMessage={handleNewMessage} />
      <div className="toast-container">
        {messages.map((message) => {
          return (
            <Toast
              key={message.id}
              message={message}
              handleMessageRemove={handleMessageRemove}
            />
          );
        })}
      </div>
    </main>
  );
}

export default App;
