import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from "react"
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const theme = createTheme({
    typography: {
        htmlFontSize: "10px", // html { font-size: 10px; } の代わり
        fontFamily: '"Yusei Magic", sans-serif', // フォントファミリー
    },
    palette: {
        background: {
            default: "white", // 背景色
        },
    },
});

export default function App() {
    const [catImg, setCatImg] = useState();
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [distanceX, setDistanceX] = useState(0);
    const [goodCats, setGoodCats] = useState([]);
    const [notGoodCats, setNotGoodCats] = useState([]);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("https://api.thecatapi.com/v1/images/search");
                if (!response.ok) { // ステータスコードが200番台でなければエラーをスロー
                    throw new Error(`HTTPエラー: ${response.status}`);
                }
                const data = await response.json();
                // console.log(data[0]?.url);
                setCatImg(data[0]?.url);
                //?.オプショナルチェーン、
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [goodCats, notGoodCats]);
    // 第 2 引数には、その副作用が依存する値のリストを配列で渡します。この配列のいずれかの値が、前に副作用を起こした時の値から変わっていたら、再度副作用を起こします。
    //空の配列を渡した場合は、最初にコンポーネントがレンダリングされた時の 1 回だけ副作用が起こされます

    // マウスダウンでドラッグ開始
    const handleMouseDown = (e) => {
        e.preventDefault();//ブラウザのデフォルトの動きをなくす
        setIsDragging(true);
        setStartX(e.clientX); //クリックされたときのx座標を記録
    };

    // マウスムーブでスライド距離を更新
    const handleMouseMove = (e) => {
        e.preventDefault();
        if (!isDragging) return;

        const currentX = e.clientX;
        const distance = currentX - startX;
        setDistanceX(distance);

        if (distance > 30) {  // 30px以上右にスライドしたら
            handleSlideRight();
        }
        if (distance < -30) {  // 30px以上左にスライドしたら
            handleSlideLeft();
        }
    };

    // マウスアップでドラッグ終了
    const handleMouseUp = () => {
        setIsDragging(false);
        setDistanceX(0); // スライド距離をリセット
    };

    // スライド右に反応したときの処理
    const handleSlideRight = () => {
        // alert("画像が右にスライドされました！");
        setGoodCats(prevImg => [...prevImg, catImg]);
        // console.log("good", goodCats);
        setDistanceX(0);
        setIsDragging(false);
    };
    // スライド左に反応したときの処理
    const handleSlideLeft = () => {
        // alert("左にスライドされた")
        setNotGoodCats(prevImg => [...prevImg, catImg]);
        // console.log("notGood", notGoodCats);
        setDistanceX(0);
        setIsDragging(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <>
                <header
                    style={{
                        margin: 0,
                        textAlign: "center",
                        padding: "10px 0 0",
                        color: "rgb(94, 94, 93)",
                    }}
                >
                    <h1>Meet Cats</h1>
                </header>
                <div>
                    <main style={{textAlign: "center",}}>
                        <Grid container
                            spacing={2}
                            direction="column"
                            alignItems="center"
                        >
                            <Grid item>
                                遊び方
                            </Grid>
                            <Grid item>
                                猫の写真を左右にスライドして、お気に入りの子を見つけよう！<br/>
                                満足いくまで選定したら「結果をみる」をクリック！
                            </Grid>
                            <Grid item>
                                ←まあまあ　好き→
                            </Grid>
                            <Grid item>
                                <Box
                                    // conponent = "section"はページの構造や意味を明確にする場合は必要、見た目を整えるだけなら不要
                                    sx={{
                                        width: "400px",
                                        height: "300px",
                                        overflow: "hidden",
                                        border: "2px solid black",
                                        position: "relative",
                                        textAlign: "center",
                                    }}

                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}  // マウスが外に出た時にもドラッグ終了
                                >
                                    <img
                                        class="cats"
                                        src={catImg}
                                        alt="randomCats"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            transition: "transform 0.2s ease-out",
                                            transform: `translateX(${distanceX}px)`, // スライド位置を反映
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={()=>{setShowResult(true)}}>結果をみる</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={()=>{setGoodCats([]), setNotGoodCats([])}}>やりなおし</Button>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={2}>
                                    {showResult && goodCats.map((img, index) => {
                                        // console.log(img, index)
                                        return (
                                            <Grid item xs={3}>
                                                <img
                                                    key={index}
                                                    src={img}
                                                    alt={img}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        </Grid>
                    </main>
                </div >
                <footer
                    style={{
                        textAlign: "center",
                        padding: "8px",
                    }}
                >
                    日本大学文理学部情報科学科 Webプログラミングの演習課題<br/>
                    5423041 長谷川絢南
                </footer>
            </>
        </ThemeProvider>
    )
}