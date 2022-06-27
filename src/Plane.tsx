import { useRef, useState } from "react";

function Plane(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      onClick={(event) => {
        props.event(event);
      }}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[10, 0.1, 10]} />
      <meshStandardMaterial color={active ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default Plane;
