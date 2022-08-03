import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import AuthLayout from "./pages/AuthLayout";
import Signin from "./components/Signin";
import Home from "./components/Home";
import Signup from "./components/Signup";
export default class App extends React.Component{
    render(){
        return (
         <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                </Route>
                <Route path="/auth" element={<AuthLayout />} >
                    <Route index element={<Signin />}/>
                    <Route path="register" element={<Signup />}/>
                </Route>
            </Routes>
         </BrowserRouter>
        )
    }
}
