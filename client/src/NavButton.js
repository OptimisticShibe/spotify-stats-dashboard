import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function NavButton(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="d-none d-lg-block">
      <a href="#" onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faBars} size="4x" id="mobile-menu" data-toggle="dropdown" />
      </a>
      {open && props.children}
    </div>
  );
}
