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
import { useRecoilState } from "recoil";
import Quagga from "@ericblade/quagga2";
import { drinkLogState } from "../drinkLogState";

const Home = () => {
  const title = "お酒を登録する";
  const [tasks, setTasks] = useState([
    { name: "ここに登録したお酒が表示されます" },
    { name: "ここに登録したお酒が表示されます" },
  ]);

  const [drinkLogs,setDrinkLogs] = useRecoilState(drinkLogState);

  const savedrinkLog = (log)=>{
    const newDrinkLogs = drinkLogs != null ? [...drinkLogs,log] : [log];
    setDrinkLogs(newDrinkLogs);
  }

  const updateTasks = (value) => {
    const newTasks = [...tasks, { name: value }];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  useIonViewWillEnter(() => {
    if (localStorage.getItem("tasks") != null) {
      // setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  });

  const [showModal, setShowModal] = useState(false);
  const closeModal = (bool) => {
    setShowModal(bool);
    Quagga.stop();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => savedrinkLog(tasks)}>保存</IonButton>
          </IonButtons>
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
