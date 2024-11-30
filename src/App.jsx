import { useEffect, useState } from "react"
import * as React from 'react';
import Button from '@mui/material/Button';

export default function App() {
    //catsを使ってﾇｯｺを表示させてみる
    //画像の幅を統一させる
    const [img, setImg] = useState();
    const [clickedSt, isClickedSt] = useState(false);

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
                    <Button variant="contained">Contained</Button>
                    <p>neko</p>
                    {/* サイズ、object-fitで後で調整 */}
                    <img class="cats" src={img} alt="randomCats" />
                </main>
            </div>
            <footer>
                aaaaa
            </footer>

        </>
    )
}