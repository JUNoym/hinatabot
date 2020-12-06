import React, { useState, useCallback, useEffect } from "react"
import '../assets/styles/style.css'
import { db } from '../firebase/index'
import { AnswersList, Chats, Loading } from '../Components/index'
import Form from "../Components/Forms/Form";
import { useDispatch, useSelector } from 'react-redux';
import { getUserId, getUsername } from "../reducks/users/selectors"
import { signOut } from "../reducks/users/operations";


const Home = () => {
    const [answers, setAnswers] = useState([]);
    const [chats, setChats] = useState([]);
    const [currentId, setCurrentId] = useState('init');
    const [dataset, setDataset] = useState({});
    const [open, setOpen] = useState(false);

    // 問い合わせフォーム用モーダルを開くCallback関数
    const handleOpen = useCallback(() => {
        setOpen(true)
    }, [setOpen]);

    // 問い合わせフォーム用モーダルを閉じるCallback関数
    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen]);

    // 新しいチャットを追加するCallback関数
    const addChats = useCallback((chat) => {
        setChats(prevChats => {
            return [...prevChats, chat]
        })
    }, [setChats]);

    // 次の質問をチャットエリアに表示する関数
    const displayNextQuestion = (nextQuestionId, nextDataset) => {
        // 選択された回答と次の質問をチャットに追加
        addChats({
            text: nextDataset.question,
            type: 'question'
        });

        // 次の回答一覧をセット
        setAnswers(nextDataset.answers)

        // 現在の質問IDをセット
        setCurrentId(nextQuestionId)
    }

    // 回答が選択された時に呼ばれる関数
    const selectAnswer = useCallback((selectedAnswer, nextQuestionId) => {
        switch (true) {
            // お問い合わせが選択された場合
            case (nextQuestionId === 'contact'):
                handleOpen();
                break;

            // リンクが選択された時
            case /^https:*/.test(nextQuestionId):
                const a = document.createElement('a');
                a.href = nextQuestionId;
                a.target = '_blank';
                a.click();
                break;

            // 選択された回答をchatsに追加
            default:
                // 現在のチャット一覧を取得
                addChats({
                    text: selectedAnswer,
                    type: 'answer'
                })

                setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 750)
                break;
        }
    }, [answers]);

    // 最初の質問をチャットエリアに表示する
    useEffect(() => {
        (async () => {
            const initDataset = {};

            // Fetch questions dataset from Firestore
            await db.collection('questions').get().then(snapshots => {
                snapshots.forEach(doc => {
                    initDataset[doc.id] = doc.data()
                })
            });

            // Firestoreから取得したデータセットを反映
            setDataset(initDataset);

            // 最初の質問を表示
            displayNextQuestion(currentId, initDataset[currentId])
        })();
    }, []);

    // 最新のチャットが見えるように、スクロール位置の頂点をスクロール領域の最下部に設定する
    useEffect(() => {
        const scrollArea = document.getElementById('scroll-area');
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight;
        }
    });

    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const uid = getUserId(selector)
    const username = getUsername(selector)



    return (

        <section className="main">
            <button onClick={() => dispatch(signOut())}>サインアウト</button>
            <p>ユーザーId: {uid}</p>
            <p>ユーザー名: {username}</p>
            <div className="main-box">

                {(Object.keys(dataset).length === 0) ? (
                    <Loading />
                ) : (
                        <>
                            <Chats chats={chats} />
                            <AnswersList answers={answers} select={selectAnswer} />
                        </>
                    )}
                <Form open={open} handleOpen={handleOpen} handleClose={handleClose} />
            </div>
        </section >
    )
}


export default Home