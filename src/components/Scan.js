import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton,
    IonButton,
    IonContent,
    IonModal,
    IonFab,
    IonFabButton,
    IonIcon
} from "@ionic/react";
import Quagga from 'quagga';
import { useState, useEffect } from "react";
import { cameraOutline } from "ionicons/icons";

const Scan = () => {
    // const handleSubmit = (value, event) => {
    //     event.preventDefault();
    //     const janCode = value;
    //     props.onFormSubmit(janCode);
    // }
    // const [barcode, setBarcode] = useState("4901411086798");
    // const [rawItemName, setRawItemName] = useState("");

    // const reloadItemName = (code) => {
    //     fetchItemInfomation(code).then((name) => {
    //         setRawItemName(name);
    //     });
    // }

    // useEffect(() => {
    //     Quagga.onDetected((result) => {
    //         //誤認識を防ぐために複数回バーコードが一致する場合としてもよさそう
    //         if (result !== undefined) {
    //             setTimeout(reloadItemName(result.codeResult.code), 1000);
    //             setBarcode(result.codeResult.code);
    //         }
    //     });
    // }, []);

    // useEffect(() => {
    //     fetchItemInfomation("").then((name) => {
    //         setRawItemName(name);
    //     });
    // }, []);

    // const stopCamera = (event) => {
    //     console.log(window.innerWidth);
    //     event.preventDefault();
    //     Quagga.stop();
    // }

    // const startCamera = (event) => {
    //     event.preventDefault();
    //     const cameraSize = Math.min(window.innerHeight, window.innerWidth);
    //     const config = {
    //         //カメラ設定
    //         inputStream: {
    //             name: "Live",
    //             type: "LiveStream",
    //             //描画するidを指定
    //             target: "#preview",
    //             //サイズ指定、詳細な設定ならconstraintsを作成する
    //             constraints: {
    //                 width: cameraSize,
    //                 height: cameraSize,
    //                 facingMode: "environment",
    //             },
    //             singleChannel: false,
    //         },
    //         locator: {
    //             patchSize: "medium",
    //             halfSample: true,
    //         },
    //         //読み取るバーコードの種類
    //         decoder: {
    //             readers: ["ean_reader"],
    //             multiple: false,
    //         },
    //         //TODO: areaを指定し、カメラがバーコードを読み取れる領域を指定する。できれば線で囲いたい(cannbass要素？)

    //         //使用可能なWebワーカー数の指定
    //         numOfWorkers: navigator.hardwareConcurrency || 4,

    //         locate: true,
    //     };

    //     onChangeQuaggaCamera(config);
    // }

    // const envCamera = (event) => {
    //     const config = {
    //         //カメラ設定
    //         inputStream: {
    //             name: "Live",
    //             type: "LiveStream",
    //             //描画するidを指定
    //             target: "#preview",
    //             //サイズ指定、詳細な設定ならconstraintsを作成する
    //             constraints: {
    //                 width: window.innerWidth,
    //                 height: window.innerHeight,
    //                 facingMode: "environment",
    //             },
    //             singleChannel: false,
    //         },
    //         locator: {
    //             patchSize: "medium",
    //             halfSample: true,
    //         },
    //         //読み取るバーコードの種類
    //         decoder: {
    //             readers: ["ean_reader"],
    //             multiple: false,
    //         },
    //         //TODO: areaを指定し、カメラがバーコードを読み取れる領域を指定する。できれば線で囲いたい(cannbass要素？)

    //         //使用可能なWebワーカー数の指定
    //         numOfWorkers: navigator.hardwareConcurrency || 4,

    //         locate: true,
    //     };
    //     event.preventDefault();
    //     onChangeQuaggaCamera(config);
    // }

    // const onChangeQuaggaCamera = (config) => {
    //     Quagga.init(config, (err) => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         Quagga.start();
    //     });
    // }
    const [showModal, setShowModal] = useState(false);
    return (
        // <div>
        //     <hr />
        //     <div>
        //         {barcode !== ""
        //             ? `バーコード : ${barcode}`
        //             : "バーコードを読み取っています..."}
        //     </div>
        //     <form onSubmit={(e) => handleSubmit(rawItemName, e)}>
        //         <button type="submit">get yahoo api</button>
        //     </form>
        //     <form onSubmit={(e) => stopCamera(e)}>
        //         <button>camera stop</button>
        //     </form>
        //     <form onSubmit={(e) => startCamera(e)}>
        //         <button>camera on</button>
        //     </form>
        //     <form onSubmit={(e) => envCamera(e)}>
        //         <button>enviroment camera on</button>
        //     </form>
        //     <hr />
        //     <div id="preview"></div>
        // </div>
        <IonContent>
            <IonModal isOpen={showModal}>
                <p>This is modal content</p>
                <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
                {/* ここにカメラを用意する 、というかモーダル内部で表示する方法が公式のチュートリアルでありそう*/}
            </IonModal>
            <IonFab vertical="center" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => setShowModal(true)}>
                    <IonIcon icon={cameraOutline} />
                </IonFabButton>
            </IonFab>
        </IonContent>
    );
}

export default Scan;