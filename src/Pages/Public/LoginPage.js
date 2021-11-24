import React from "react";
import LoginForm from "../../components/Public/Auth/LoginForm";

import Navbar from "../../components/Public/Navbar";
import Footer from "../../components/Public/Footer";

function LoginPage() {
  return (
    <>
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  );
}

export default LoginPage;
