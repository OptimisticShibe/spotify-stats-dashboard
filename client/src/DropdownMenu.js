import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCrown, faCompactDisc, faChevronLeft, faChevronRight, faCoffee, faClock, faCalendarAlt, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

export default function DropdownMenu() {
  // TODO: use mobileSelection to filter what displays
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState("auto");
  const [mobileSelection, setMobileSelection] = useState("artists");
  const menuNodeRef = useRef(null);
  const secondaryMenuNodeRef = useRef(null);

  function calcHeight() {
    const menuNode = activeMenu === "main" ? menuNodeRef : secondaryMenuNodeRef;
    const height = menuNode.current.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <Container>
      <div className="dropdown" style={{ height: menuHeight }}>
        <CSSTransition in={activeMenu === "main"} timeout={500} classNames="menu-primary" unmountOnExit onEnter={calcHeight} nodeRef={menuNodeRef}>
          <div className="menu" ref={menuNodeRef}>
            <DropdownItem
              leftIcon={<FontAwesomeIcon icon={faCrown} size="lg" onClick={() => setMobileSelection("artists")} />}
              rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
              goToMenu="timeframe"
            >
              <span className="menu-item-text">Top Artists</span>
            </DropdownItem>
            <DropdownItem
              leftIcon={<FontAwesomeIcon icon={faCompactDisc} size="lg" />}
              rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
              goToMenu="timeframe"
              onClick={() => setMobileSelection("tracks")}
            >
              <span className="menu-item-text">Top Tracks</span>
            </DropdownItem>
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "timeframe"}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}
          nodeRef={secondaryMenuNodeRef}
        >
          <div className="menu" ref={secondaryMenuNodeRef}>
            <DropdownItem goToMenu="main" leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}>
              Back
            </DropdownItem>
            <DropdownItem leftIcon={<FontAwesomeIcon icon={faClock} size="lg" />}>
              <span className="menu-item-text">4 Weeks</span>
            </DropdownItem>
            <DropdownItem leftIcon={<FontAwesomeIcon icon={faCalendarAlt} size="lg" />}>
              <span className="menu-item-text">6 Months</span>
            </DropdownItem>
            <DropdownItem leftIcon={<FontAwesomeIcon icon={faCalendar} size="lg" />}>
              <span className="menu-item-text">All Time</span>
            </DropdownItem>
          </div>
        </CSSTransition>
      </div>
    </Container>
  );
}
