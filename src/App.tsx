import { ToastContainer } from "react-toastify";
import Search from "./components/search";
import { SyntheticEvent, useState } from "react";

function App() {
  const [selection, setSelection] = useState({ value: "", key: "" });

  function onSelect(
    _e: SyntheticEvent,
    option: { value: string; key: string }
  ) {
    setSelection(option);
  }
  return (
    <>
      <Search onSelect={onSelect} />
      {selection && <h1>{JSON.stringify(selection)}</h1>}
      <ToastContainer />
    </>
  );
}

export default App;
