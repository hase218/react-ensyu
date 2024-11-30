import { useEffect, useState } from "react"
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export default function App() {
    const [img, setImg] = useState();
    const [isClicked, setIsClicked] = useState(false);


    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("https://api.thecatapi.com/v1/images/search");
                if (!response.ok) { // ステータスコードが200番台でなければエラーをスロー
                    throw new Error(`HTTPエラー: ${response.status}`);
                }
                const data = await response.json();
                console.log(data[0]?.url);
                setImg(data[0]?.url);
                //?.オプショナルチェーン、
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);
    //空の配列を渡した場合は、最初にコンポーネントがレンダリングされた時の 1 回だけ副作用が起こされます
    return (
        <>
            <header>
                <h1>Cats</h1>
            </header>
            <div>
                <main>
                    <Box
                        sx={{
                            width: "450px",
                            margin: "0 auto",
                            border: "2px solid black",
                            justifyContent: "center",
                            alignItems: "center", 
                            textAlign: "center",
                        }}>
                        <p>neko</p>
                        <Box
                            // conponent = "section"はページの構造や意味を明確にする場合は必要、見た目を整えるだけなら不要
                            sx={{
                                width: "400px",
                                height: "300px",
                                overflow: "hidden",
                                border: "2px solid black",
                                position: "relative",
                                display: 'flex',
                                justifyContent: 'center',  // 横方向の中央揃え
                                alignItems: 'center',      // 縦方向の中央揃え
                                textAlign: "center",
                            }}>

                            <img
                                class="cats"
                                src={img}
                                alt="randomCats"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                }
                                }

                                
                            />

                        </Box>

                    </Box>





                    <Button variant="contained">Contained</Button>
                </main>
            </div >
            <footer>
                aaaaa
            </footer>

        </>
    )
}