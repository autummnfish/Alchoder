import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton,
    IonButtons,
    IonContent
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
                {/* このサイトは日本大学文理学部 情報科学科 Webプログラミングの演習課題である。 <- 授業用のデプロイするときはこれを表示する */}
                Web Services by Yahoo! JAPAN （https://developer.yahoo.co.jp/sitemap/）
            </IonContent>
        </IonPage>
    )
}

export default Info;