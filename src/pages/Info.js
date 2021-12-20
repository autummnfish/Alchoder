import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton,
  IonButtons,
  IonContent,
  IonLabel,
  IonList,
  IonItem,
} from "@ionic/react";

const Info = () => {
  const title = "ライセンス";
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
        <IonList>
          <IonItem>
            <IonLabel>
              このサイトは日本大学文理学部 情報科学科
              Webプログラミングの演習課題である。
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              This software includes the work that is distributed in the{" "}
              <a href="https://www.apache.org/licenses/LICENSE-2.0">
                Apache License 2.0.
              </a>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              Web Services by Yahoo! JAPAN
              （https://developer.yahoo.co.jp/sitemap/）
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Info;
