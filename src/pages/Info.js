import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton,
  IonButtons,
  IonContent,
  IonNote,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
} from '@ionic/react';

const Info = () => {
  const title = 'Info';
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
          <IonListHeader>
            <h3>アプリの使い方</h3>
          </IonListHeader>
          <IonItem>
            このアプリでは、お酒の缶などについているバーコードを読み取り、商品名を記録することができます。
          </IonItem>
          <IonItem>
            <IonNote>
              お酒の名前を登録することを想定していますが、他の商品でも問題ありません。
            </IonNote>
          </IonItem>
          <IonItem>ホームメニュー右下のボタンをタップし、カメラを起動することで、バーコードを読み取ることができます。</IonItem>
          <IonItem>商品名の取得にはYahoo！ショッピング APIを使用しているため、Yahoo！ショッピング上に存在しない商品は認識することができません。</IonItem>
          <IonItem>また、現在はリロードを挟まずに2回目以降のバーコード認識を行う場合、複数回バーコード登録の確認が表示されることがあります。</IonItem>
          <IonItem>そのような場合、初回のみOKを選択し、それ以降はすべてCancelを選択していただくと正常に登録できることが多いです。</IonItem>
        </IonList>
        <IonList>
          <IonListHeader>
            <h3>ライセンス</h3>
          </IonListHeader>
          <IonItem>
            <IonLabel>
              <a href="https://developer.yahoo.co.jp/sitemap/">Web Services by Yahoo! JAPAN</a>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Info;
