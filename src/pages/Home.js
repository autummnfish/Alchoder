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
  IonIcon,
  IonModal,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  useIonViewWillEnter,
} from "@ionic/react";
import Scan from "../components/Scan";
import { cameraOutline } from "ionicons/icons";
import { useState } from "react";

const Home = () => {
  const title = "お酒を登録する";
  const [tasks, setTasks] = useState([
    { name: "ここに登録したお酒が表示されます" },
  ]);

  const updateTasks = (value) => {
    const newTasks = [...tasks, { name: value }];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  useIonViewWillEnter(() => {
    if (localStorage.getItem("tasks") != null) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  });

  const [showModal, setShowModal] = useState(false);
  const closeModal = (bool) => {
    setShowModal(bool);
    // Quagga.stop();
  };
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
        <IonModal isOpen={showModal} onDidDismiss={() => closeModal(false)}>
          <IonHeader translucent>
            <IonToolbar>
              <IonTitle>バーコードを読み取る</IonTitle>
              <IonButtons slot="end">
                <IonButton onclick={() => closeModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <Scan addLog={updateTasks} />
        </IonModal>
        {/* ここにQuaggajsのやつを使うのと、現在の飲酒情報を書く
        <br />
        加えて、飲酒をやめるというボタンを用意し、ボタンが押されたら飲酒ログへログを追加し、ここに記載されている記録をクリアにする。Fabボタンで右上が望ましい？
        <br />
        現在の飲酒情報をShareできるようにしても良い。
        <br />
        カメラボタンは右下に配置するようにするのと、Ionlistで酒を表示する
        <br />
        さらに、ボタンを押すとモーダルが表示され、カメラが起動する。closeボタン(バツも可能)はモーダル左上に表示するようにする。
        <br />
        モーダル下部でバーコードを読み込むボタンを置くとし、そこでPOSTをsendできるようにしたい、もしくはapiからとってきたjsonが空文字列じゃなければ遷移(Alertで表示)でもいいかも
        <br />
        その後、IonLoadingでローディングさせ、Listに追加する
        <br />
        カメラの許可がされなかった場合、Alertを表示する。
        <br /> */}
        <IonList>
          {tasks.map((item) => {
            return (
              <IonItem>
                <IonLabel>{item.name}</IonLabel>
              </IonItem>
            );
          })}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={cameraOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
