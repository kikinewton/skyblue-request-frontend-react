import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Spinner = ({ color = "#30994b", indicator }) => {
  let antIcon;
  if (indicator) antIcon = indicator;
  else antIcon = <LoadingOutlined type="loading" style={{ fontSize: 24 }} spin />;

  return <Spin indicator={antIcon} style={{ color }} />;
};

export default Spinner;

export const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%",
      }}
    >
      <Spin
        size="large"
        tip="Please wait..."
        style={{ color: "#30994b" }}
        data-testid="global-loading-spinner"
      />
    </div>
  );
};
