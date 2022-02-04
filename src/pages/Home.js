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
  useIonActionSheet,
  useIonAlert,
} from "@ionic/react";
import Scan from "../components/Scan";
import { cameraOutline, trash, create, close } from "ionicons/icons";
import { useState } from "react";
import { useRecoilState } from "recoil";
import Quagga from "@ericblade/quagga2";
import { drinkLogState } from "../drinkLogState";

const Home = () => {
  const title = "お酒を登録する";
  const [tasks, setTasks] = useState([
    { name: "ここに登録したお酒が表示されます" },
  ]);

  const [drinkLogs, setDrinkLogs] = useRecoilState(drinkLogState);
  const [showModal, setShowModal] = useState(false);
  const [showAlert] = useIonAlert();
  const [showActionSheet] = useIonActionSheet();

  useIonViewWillEnter(() => {
    if (localStorage.getItem("tasks") != null) {
      // setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  });

  const formateDate = () => {
    const now = new Date();
    const ISO8601time = now.toISOString();
    return ISO8601time.slice(0, 10);
  };

  const savedrinkLog = (log) => {
    if (log.length === 0) {
      showAlert({
        header: "何も登録されていません",
        message: "お酒を登録してみましょう",
        buttons: ["OK"],
      });
      return;
    }
    const newLog = {
      title: formateDate(),
      array: log,
    };
    const newDrinkLogs = [...drinkLogs, newLog];
    setDrinkLogs(newDrinkLogs);
    const newTasks = [];
    // const newTasks = [{ name: "ここに登録したお酒が表示されます" }];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    localStorage.setItem("logs", JSON.stringify(newDrinkLogs));
  };

  const updateTasks = (value) => {
    setShowModal(false);
    const newTasks = [...tasks, { name: value }];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const deleteTask = (targetIndex) => {
    const newTasks = [...tasks];
    newTasks.splice(targetIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const renameTask = (name, targetIndex) => {
    showAlert({
      header: "変更後の名前",
      inputs: [
        {
          name: "name",
          placeholder: "酒名",
          value: name,
        },
      ],
      buttons: [
        { text: "閉じる" },
        {
          text: "保存",
          handler: (input) => {
            const newTasks = [...tasks];
            newTasks.splice(targetIndex, 1, input);
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            setTasks(newTasks);
          },
        },
      ],
    });
  };
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
                <IonButton onclick={() => closeModal(false)}>閉じる</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <Scan addLog={updateTasks} />
        </IonModal>
        <IonList>
          {tasks.map((item, index) => {
            return (
              <IonItem
                onClick={() => {
                  showActionSheet([
                    {
                      text: "削除",
                      role: "destructive",
                      icon: trash,
                      handler: () => {
                        deleteTask(index);
                      },
                    },
                    {
                      text: "変更",
                      icon: create,
                      handler: () => {
                        renameTask(item.name, index);
                      },
                    },
                    {
                      text: "閉じる",
                      icon: close,
                      role: "cancel",
                      handler: () => {
                        // console.log("Cancel clicked");
                      },
                    },
                  ]);
                }}
              >
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
