import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton,
    IonButtons,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon
} from "@ionic/react";

import{
    cameraOutline
}from 'ionicons/icons';



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
                加えて、飲酒をやめるというボタンを用意し、ボタンが押されたら飲酒ログへログを追加し、ここに記載されている記録をクリアにする。
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton>
                        <IonIcon icon={cameraOutline} />
                    </IonFabButton>
                </IonFab>
            </IonContent>

        </IonPage>
    )
}

export default Home;