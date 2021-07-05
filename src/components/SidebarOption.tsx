import React, { ReactElement } from "react";
import "./SidebarOption.css";
import { useHistory } from "react-router-dom";

type Props = {
  text: string;
  Icon: ReactElement;
  active?: boolean;
  path?: string;
};

const SidebarOption = ({ text, Icon, active, path }: Props) => {
  const history = useHistory();

  return (
    <div
      className={`sidebarOption  ${active && "sidebarOption--active"}`}
      onClick={() => {
        path && history.push(path);
      }}
    >
      {Icon}
      <h4>{text}</h4>
    </div>
  );
};

export default SidebarOption;
