import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton,
    IonButtons,
    IonContent,
} from "@ionic/react";
import Scan from "../components/Scan";




const Home = () => {
    const title = "お酒を登録する"
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                ここにQuaggajsのやつを使うのと、現在の飲酒情報を書く<br />
                加えて、飲酒をやめるというボタンを用意し、ボタンが押されたら飲酒ログへログを追加し、ここに記載されている記録をクリアにする。Fabボタンで右上が望ましい？<br />
                現在の飲酒情報をShareできるようにしても良い。<br />
                カメラボタンは右下に配置するようにするのと、Ionlistで酒を表示する<br />
                さらに、ボタンを押すとモーダルが表示され、カメラが起動する。closeボタン(バツも可能)はモーダル左上に表示するようにする。<br />
                モーダル下部でバーコードを読み込むボタンを置くとし、そこでPOSTをsendできるようにしたい、もしくはapiからとってきたjsonが空文字列じゃなければ遷移(Alertで表示)でもいいかも<br />
                その後、IonLoadingでローディングさせ、Listに追加する<br />
                カメラの許可がされなかった場合、Alertを表示する。<br />
                <Scan />

            </IonContent>

        </IonPage>
    )
}

export default Home;