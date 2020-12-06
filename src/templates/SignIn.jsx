import React, { useState, useCallback } from "react";
import { TextInput, PrimaryButton } from "../Components/UIkit/index"
import { signIn } from "../reducks/users/operations"
import { useDispatch } from "react-redux";
import { push } from "connected-react-router"

const SignIn = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    }, [setEmail]);

    const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [setPassword]);




    return (
        <div className="c-section-container">
            <div className="module-spacer--medium" />
            <div className="module-spacer--medium" />
            <h2 className="u-text__headline u-text-center">サインイン</h2>


            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード（半角英数字で6文字以上）"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />

            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"Sign In"}
                    onClick={() => dispatch(signIn(email, password))}
                />
            </div>
            <button onClick={() => dispatch(push("/signup"))}>アカウント登録はこちら</button>
            <div className="module-spacer--extra-extra-small" />
            <button onClick={() => dispatch(push("/signin/reset"))} > パスワードを忘れた方はこちら</button>

        </div>
    )
}

export default SignIn