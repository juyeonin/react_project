import React from "react";
import MainHeaderContainer from "../containers/common/MainHeaderContainer";
import MenuBarContainer from "../containers/common/MenuBarContainer";
import Footer from "../components/common/Footer";
interface Props {
  children: JSX.Element | JSX.Element[];
}

function MainLayout({ children }: Props) {
  return (
    <div>
      <MainHeaderContainer />
      <MenuBarContainer />
      <div style={{ minHeight: "600px", marginBottom: "150px" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
