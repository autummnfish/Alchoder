import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton,
    IonButtons,
    IonContent
} from "@ionic/react";

const DrinkLog = () => {
    const title = "飲酒ログ"
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
                Homeの記録を受け取り、ログを配列に格納する。ログには飲酒が終了した日時を記載し、タップすることでalertが表示され、そこで詳しくログが見れるようにする
                <br/>配列でいいのかはまた考える。
            </IonContent>

        </IonPage>
    )
}

export default DrinkLog;