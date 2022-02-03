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

  const [drinkLogs, setDrinkLogs] = useRecoilState(drinkLogState);
  const [selectedIndex,setSelectedIndex] = useState(-1);

  useIonViewWillEnter(() => {
    if (localStorage.getItem("logs") != null) {
      setDrinkLogs(JSON.parse(localStorage.getItem("logs")));
    }
  });

  const openModal = (index) =>{
    setSelectedIndex(index);
  }

  const closeModal = ()=>{
    setSelectedIndex(-1);
  }

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
          {drinkLogs.map((obj, index) => {
            // console.log(obj);
            return (
              <div>
                <IonItem onClick={() => openModal(index)} >{obj.title}</IonItem>
                <IonModal isOpen={index === selectedIndex} onDidDismiss={ () => closeModal}>
                <Modal logObj={obj} index={index} />
                </IonModal>
              </div>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

/*
drinkLogs = [
{
  title: 登録例
  array:["ビール","梅酒","ウォッカ"]
},
...
]
tasksはnullにし、nullであればdrinklogに追加せずアラートを出す
titleは通常yyyy/mm/ddの形式で表示

*/
const Modal = (props) => {
  const logArr = props.logObj.array;
  const logIndex = props.index;
  const [showActionSheet] = useIonActionSheet();
  const [drinkLogs, setDrinkLogs] = useRecoilState(drinkLogState);
  const [tasks, setTasks] = useState([...drinkLogs[logIndex].array]);
  const [showAlert] = useIonAlert();

  const deleteTasks = (targetIndex) => {
    const newTasks = [...tasks];
    newTasks.splice(targetIndex, 1);
    setTasks(newTasks);
    const newDrinkLogs = [...drinkLogs];
    newDrinkLogs.splice(logIndex, 1, {
      title: props.logObj.title,
      array: newTasks,
    });
    setDrinkLogs(newDrinkLogs);
    localStorage.setItem("logs", JSON.stringify(newDrinkLogs));
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
            const newDrinkLogs = [...drinkLogs];
            newDrinkLogs.splice(logIndex, 1, {
              title: props.logObj.title,
              array: newTasks,
            });
            setDrinkLogs(newDrinkLogs);
            localStorage.setItem("logs", JSON.stringify(newDrinkLogs));
          },
        },
      ],
    });
  };

  return (
    <IonList slot="content">
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
