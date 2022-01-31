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
  IonModal,
  useIonViewWillEnter,
  useIonActionSheet,
  useIonAlert,
} from "@ionic/react";
import { useState } from "react";
import { trash, create, close } from "ionicons/icons";
import { drinkLogState } from "../drinkLogState";
import { useRecoilState } from "recoil";

const DrinkLog = () => {
  const title = "飲酒ログ";

  const [tasks, setTasks] = useState([
    { name: "ここに登録したお酒が表示されます" },
  ]);

  const [drinkLogs, setDrinkLogs] = useRecoilState(drinkLogState);

  const [showActionSheet] = useIonActionSheet();
  const [showAlert] = useIonAlert();

  useIonViewWillEnter(() => {
    if (localStorage.getItem("tasks") != null) {
      // setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  });

  const deleteTasks = (targetIndex) => {
    const newTasks = [...tasks];
    newTasks.splice(targetIndex, 1);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const renameTask = (target, targetIndex) => {
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
        {/* <IonList>
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
                        deleteTasks(index);
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
        </IonList> */}
        {drinkLogs.map((arr) => {
          return (
            <IonList>
              {arr.map((item) => {
                return <IonItem>{item.name}</IonItem>;
              })}
            </IonList>
          );
        })}
      </IonContent>
    </IonPage>
  );
};
// modalでdrinklogsの中身を表示にする
//そうすることで、tasksのusestate管理が楽になるはず

/*
{
  title: 登録例
  arr:["ビール","梅酒","ウォッカ"]
}
tasksはnullにし、nullであればdrinklogに追加せずアラートを出す
titleは通常yyyy/mm/ddの形式で表示

*/
const Modal = (logArr, logIndex) => {
  const [showActionSheet] = useIonActionSheet();
  const [drinkLogs, setDrinkLogs] = useRecoilState(drinkLogState);
  const [tasks, setTasks] = useState(...drinkLogs[logIndex]);
  const [showAlert] = useIonAlert();

  const deleteTasks = (targetIndex) => {
    const newTasks = [...tasks];
    setTasks(newTasks);
    newTasks.splice(targetIndex, 1);
    const newArr = [...logArr];
    newArr.splice(logIndex, 1, newTasks);
    setDrinkLogs(newArr);
    localStorage.setItem("logs", JSON.stringify(newArr));
  };

  const renameTask = (target, targetIndex) => {
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
            const newTasks = [...tasks];
            newTasks.splice(targetIndex, 1, input);
            setTasks(newTasks);
            const newArr = [...logArr];
            newArr.splice(logIndex, 1, newTasks);
            setDrinkLogs(newArr);
            localStorage.setItem("logs", JSON.stringify(newArr));
          },
        },
      ],
    });
  };
  return (
    <IonList>
      {logArr.map((item, index) => {
        return (
          <IonItem
            onClick={() => {
              showActionSheet([
                {
                  text: "削除",
                  role: "destructive",
                  icon: trash,
                  handler: () => {
                    deleteTasks(index);
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
  );
};

export default DrinkLog;
