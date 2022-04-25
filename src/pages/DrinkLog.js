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
  IonButton,
  useIonViewWillEnter,
  useIonActionSheet,
  useIonAlert,
} from '@ionic/react';
import { useState } from 'react';
import { trash, create, close, open } from 'ionicons/icons';
import { drinkLogState } from '../recoilstates/drinkLogState';
import { useRecoilState } from 'recoil';

const DrinkLog = () => {
  const title = '飲酒ログ';

  const [drinkLogs, setDrinkLogs] = useRecoilState(drinkLogState);
  const [showActionSheet] = useIonActionSheet();
  const [showAlert] = useIonAlert();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useIonViewWillEnter(() => {
    if (localStorage.getItem('logs') != null) {
      setDrinkLogs(JSON.parse(localStorage.getItem('logs')));
    }
  });

  function openModal(index) {
    setSelectedIndex(index);
  }

  function closeModal() {
    setSelectedIndex(-1);
  }

  function deleteDrinkLog(targetIndex) {
    const newDrinkLogs = [...drinkLogs];
    newDrinkLogs.splice(targetIndex, 1);
    setDrinkLogs(newDrinkLogs);
    localStorage.setItem('logs', JSON.stringify(newDrinkLogs));
  }

  function renameDrinkLog(name, targetIndex) {
    showAlert({
      header: '変更後の名前',
      inputs: [
        {
          name: 'name',
          placeholder: 'タイトル',
          value: name,
        },
      ],
      buttons: [
        { text: '閉じる' },
        {
          text: '保存',
          handler: (input) => {
            const newDrinkLogs = [...drinkLogs];
            const newLog = {
              title: input,
              array: newDrinkLogs[targetIndex].array,
            };
            newDrinkLogs.splice(targetIndex, 1, newLog);
            setDrinkLogs(newDrinkLogs);
            localStorage.setItem('logs', JSON.stringify(newDrinkLogs));
          },
        },
      ],
    });
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
            return (
              <div>
                <IonItem
                  onClick={() => {
                    showActionSheet([
                      {
                        text: '表示',
                        icon: open,
                        handler: () => {
                          openModal(index);
                        },
                      },
                      {
                        text: '削除',
                        role: 'destructive',
                        icon: trash,
                        handler: () => {
                          showAlert({
                            header: 'この記録を削除しますか？',
                            buttons: [
                              'Cancel',
                              {
                                text: 'OK',
                                handler: () => {
                                  deleteDrinkLog(index);
                                },
                              },
                            ],
                          });
                        },
                      },
                      {
                        text: '変更',
                        icon: create,
                        handler: () => {
                          renameDrinkLog(obj.title, index);
                        },
                      },
                      {
                        text: '閉じる',
                        icon: close,
                        role: 'cancel',
                        handler: () => {},
                      },
                    ]);
                  }}
                >
                  <IonLabel>{obj.title}</IonLabel>
                </IonItem>
                <IonModal isOpen={index === selectedIndex} onDidDismiss={() => closeModal()}>
                  <IonHeader translucent>
                    <IonToolbar>
                      <IonTitle>{obj.title}</IonTitle>
                      <IonButtons slot="end">
                        <IonButton onClick={() => closeModal()}>閉じる</IonButton>
                      </IonButtons>
                    </IonToolbar>
                  </IonHeader>
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

const Modal = (props) => {
  const logArr = props.logObj.array;
  const logIndex = props.index;
  const [showActionSheet] = useIonActionSheet();
  const [drinkLogs, setDrinkLogs] = useRecoilState(drinkLogState);
  const [tasks, setTasks] = useState([...drinkLogs[logIndex].array]);
  const [showAlert] = useIonAlert();

  function deleteTask(targetIndex) {
    const newTasks = [...tasks];
    newTasks.splice(targetIndex, 1);
    setTasks(newTasks);
    const newDrinkLogs = [...drinkLogs];
    newDrinkLogs.splice(logIndex, 1, {
      title: props.logObj.title,
      array: newTasks,
    });
    setDrinkLogs(newDrinkLogs);
    localStorage.setItem('logs', JSON.stringify(newDrinkLogs));
  }

  function renameTask(target, targetIndex) {
    showAlert({
      header: '変更後の名前',
      inputs: [
        {
          name: 'name',
          placeholder: '酒名',
          value: target,
        },
      ],
      buttons: [
        { text: '閉じる' },
        {
          text: '保存',
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
            localStorage.setItem('logs', JSON.stringify(newDrinkLogs));
          },
        },
      ],
    });
  }

  return (
    <IonList slot="content">
      {logArr.map((item, index) => {
        return (
          <IonItem
            onClick={() => {
              showActionSheet([
                {
                  text: '削除',
                  role: 'destructive',
                  icon: trash,
                  handler: () => {
                    showAlert({
                      header: 'この商品を削除しますか？',
                      buttons: [
                        'Cancel',
                        {
                          text: 'OK',
                          handler: () => {
                            deleteTask(index);
                          },
                        },
                      ],
                    });
                  },
                },
                {
                  text: '変更',
                  icon: create,
                  handler: () => {
                    renameTask(item.name, index);
                  },
                },
                {
                  text: '閉じる',
                  icon: close,
                  role: 'cancel',
                  handler: () => {},
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
