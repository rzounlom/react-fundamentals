// src/components/Example3PropsDemo.tsx
import { CSSProperties, FC, useState } from "react";

import { Button } from "react-bootstrap";

interface CondinalRenderingProps {
  name: string;
}

const Props: FC<CondinalRenderingProps> = ({ name }) => {
  const [show, setShow] = useState<boolean>(true);
  const [show2, setShow2] = useState<boolean>(true);

  return (
    <div style={styles}>
      <h2>Props Example</h2>
      <p>Hello, {name}! Welcome to React!</p>

      {/* condtional rendering using AND operator */}
      {show && (
        <div>
          <img
            height={200}
            width={200}
            src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png"
            alt="icon"
          />
          <p>Click the button to hide me!</p>
        </div>
      )}

      {/* condtional rendering using ternary expression */}
      {show2 ? (
        <div>
          <img
            height={200}
            width={200}
            src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png"
            alt="icon"
          />
          <p>Click the button to hide me too!</p>
        </div>
      ) : null}
      <div>
        <Button onClick={() => setShow(!show)}>
          {show ? "Hide Example1" : "Show Example1"}
        </Button>
        <Button onClick={() => setShow2(!show2)} style={{ marginLeft: "5px" }}>
          {show2 ? "Hide Example2" : "Show Example2"}
        </Button>
      </div>
    </div>
  );
};

// styles for the component
const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
};

export default Props;
