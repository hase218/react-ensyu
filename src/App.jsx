import { useEffect, useState } from "react"

export default function App() {
    //randomdogを使ってわんこを表示させてみる
    const [img, setImg] = useState();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("https://random.dog/woof.json");
                if (!response.ok) { // ステータスコードが200番台でなければエラーをスロー
                    throw new Error(`HTTPエラー: ${response.status}`);
                }
                const data = await response.json();
                console.log(data.url);
                setImg(data.url);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);
    //空の配列を渡した場合は、最初にコンポーネントがレンダリングされた時の 1 回だけ副作用が起こされます
    return (
        <>
            <header>
                <h1>Dogs</h1>
            </header>
            <div>
                <main>
                    <p>inu</p>
                    <img src={img} alt="randomDogs" />
                </main>
            </div>
            <footer>
                aaaaa
            </footer>

        </>
    )
}