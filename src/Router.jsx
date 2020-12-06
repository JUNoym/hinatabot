import React from "react";
import { Switch, Route } from "react-router";
import { Login, Home, SignUp, SignIn, ResetPass } from "./templates"
import Auth from "./Auth"


const Router = () => {
    return (
        <Switch>
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/signin/reset"} component={ResetPass} />

            <Auth>
                <Route exact path={"/"} component={Home} />
            </Auth>
        </Switch>
    )
}

export default Router