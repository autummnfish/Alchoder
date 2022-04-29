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
import { drinkLogState } from "../recoilstates/drinkLogState";

function Home() {
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
			setTasks(JSON.parse(localStorage.getItem("tasks")));
		}
	});

	const formateDate = () => {
		const date = new Date();
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	};

	const saveDrinkLog = (log) => {
		//TODO:保存時に警告を表示する
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
		setTasks(newTasks);
		localStorage.setItem("tasks", JSON.stringify(newTasks));
		localStorage.setItem("logs", JSON.stringify(newDrinkLogs));
	};

	const updateTasks = (value) => {
		const newTasks = [...tasks, { name: value }];
		localStorage.setItem("tasks", JSON.stringify(newTasks));
		setTasks(newTasks);
		setShowModal(false);
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

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{title}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => saveDrinkLog(tasks)}>
							保存
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonModal
					isOpen={showModal}
					onDidDismiss={() => setShowModal(false)}
				>
					<IonHeader translucent>
						<IonToolbar>
							<IonTitle>バーコードを読み取る</IonTitle>
							<IonButtons slot="start">
							</IonButtons>
							<IonButtons slot="end">
								<IonButton onclick={() => setShowModal(false)}>
									閉じる
								</IonButton>
							</IonButtons>
						</IonToolbar>
					</IonHeader>
					<Scan addLog={updateTasks} />
				</IonModal>
				<IonList>
					{/* TODO:スワイプでも削除ができるようにする、これは警告いらない */}
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
												showAlert({
													header: "この商品を削除しますか？",
													buttons: [
														"Cancel",
														{
															text: "OK",
															handler: () => {
																deleteTask(
																	index,
																);
															},
														},
													],
												});
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
											handler: () => {},
										},
									]);
								}}
								key={`index is ${index}`}
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
}

export default Home;
