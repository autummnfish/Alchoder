import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton,
  IonButtons,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  useIonViewWillEnter,
  useIonActionSheet,
  useIonAlert,
} from "@ionic/react";
import { useState } from "react";
import { trash, create, close } from "ionicons/icons";

const DrinkLog = () => {
  const title = "飲酒ログ";

  const [tasks, setTasks] = useState([
    { name: "ここに登録したお酒が表示されます" },
  ]);
  const [showActionSheet] = useIonActionSheet();
  const [showAlert] = useIonAlert();

  useIonViewWillEnter(() => {
    if (localStorage.getItem("tasks") != null) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  });

  const deleteTasks = (target) => {
    const targetIndex = tasks.findIndex((obj) => {
      return obj.name === target;
    });
    const newTasks = [...tasks];
    newTasks.splice(targetIndex, 1);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const renameTask = (target) => {
    showAlert({
      header: "変更後の名前",
      inputs: [
        {
          name: "name",
          placeholder: "酒名",
          value: target,
        },
      ],
      buttons: [
        { text: "閉じる" },
        {
          text: "保存",
          handler: (input) => {
            const targetIndex = tasks.findIndex((obj) => {
              return obj.name === target;
            });
            const newTasks = [...tasks];
            newTasks.splice(targetIndex, 1, input);
            setTasks(newTasks);
            localStorage.setItem("tasks", JSON.stringify(newTasks));
          },
        },
      ],
    });
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
        {/* Homeの記録を受け取り、ログを配列に格納する。ログには飲酒が終了した日時を記載し、タップすることでalertが表示され、そこで詳しくログが見れるようにする
        配列でいいのかはまた考える。 */}
        <IonList>
          {tasks.map((item) => {
              return (
            <IonItem
              onClick={() => {
                showActionSheet([
                  {
                    text: "削除",
                    role: "destructive",
                    icon: trash,
                    handler: () => {
                      deleteTasks(item.name);
                    },
                  },
                  {
                    text: "変更",
                    icon: create,
                    handler: () => {
                      console.log("Share clicked");
                      renameTask(item.name);
                    },
                  },
                  {
                    text: "閉じる",
                    icon: close,
                    role: "cancel",
                    handler: () => {
                      console.log("Cancel clicked");
                    },
                  },
                ]);
              }}
            >
              <IonLabel>{item.name}</IonLabel>
            </IonItem>
          )})}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DrinkLog;
