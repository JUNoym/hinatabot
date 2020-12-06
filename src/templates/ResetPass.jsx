import React, { useState, useCallback } from "react";
import { TextInput, PrimaryButton } from "../Components/UIkit/index"
import { Reset } from "../reducks/users/operations"
import { useDispatch } from "react-redux";
import { push } from "connected-react-router"

const ResetPass = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")


    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    }, [setEmail]);





    return (
        <div className="c-section-container">
            <div className="module-spacer--medium" />
            <div className="module-spacer--medium" />
            <h2 className="u-text__headline u-text-center">パスワードリセット</h2>


            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />


            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"パスワードをリセットする"}
                    onClick={() => dispatch(Reset(email))}
                />
            </div>
            <button onClick={() => dispatch(push("/signin"))}>ログイン画面にもどる</button>


        </div>
    )
}

export default ResetPass