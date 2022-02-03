import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton,
    IonButtons,
    IonContent,
    IonNote,
} from "@ionic/react";

const Info = () => {
    const title = "ライセンス"
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
                <IonNote>Web Services by Yahoo! JAPAN （https://developer.yahoo.co.jp/sitemap/）</IonNote>
            </IonContent>
        </IonPage>
    )
}

export default Info;