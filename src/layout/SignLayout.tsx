import React from "react";
import HomeHeader from "../components/common/HomeHeader";
import Footer from "../components/common/Footer";

interface Props {
  children: JSX.Element | JSX.Element[];
}

function SignLayout({ children }: Props) {
  return (
    <div>
      <HomeHeader />
      <div style={{ minHeight: "500px", marginBottom: "150px" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default SignLayout;
