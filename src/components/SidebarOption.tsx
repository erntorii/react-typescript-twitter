import React, { ReactElement } from "react";
import "./SidebarOption.css";
import { useHistory } from "react-router-dom";

type Props = {
  text: string;
  Icon: ReactElement;
  active?: boolean;
  home?: boolean;
};

const SidebarOption = ({ text, Icon, active, home }: Props) => {
  const history = useHistory();

  return (
    <div
      className={`sidebarOption  ${active && "sidebarOption--active"}`}
      onClick={() => {
        home && history.push("/");
      }}
    >
      {Icon}
      <h2>{text}</h2>
    </div>
  );
};

export default SidebarOption;
