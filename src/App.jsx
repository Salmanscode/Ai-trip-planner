import { useState } from "react";
import { Button } from "./components/ui/button";
import Hero from "./components/ui/custom/Hero";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Hero />
    </>
  );
}

export default App;
