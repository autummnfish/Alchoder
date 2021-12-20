import { useIonAlert, IonButton } from "@ionic/react";
import Quagga from "quagga";
import { useState, useEffect } from "react";
import { fetchItemInfomation,fetchItemFormat } from "../api";

const Scan = (props) => {

  // const [barcode, setBarcode] = useState("4901411086798"); //このjanコードはダミーデータのようなもの
  const [present] = useIonAlert();

  const addDrinkLog = (value) => {
    props.addLog(value);
  }

  const reloadItemName = (code) => {
    fetchItemInfomation(code).then((rawName) => {
      if (rawName !== "" && rawName != null) {
        present({
          header: "このバーコードを登録しますか？",
          message: `${code}`,
          buttons: [
            "Cancel",
            { text: "Ok", handler: () => {
              fetchItemFormat(rawName).then((formatName) => {
                addDrinkLog(formatName);
              })
            } },
          ],
        });
      }
    });
  };
  const cameraSize = Math.min(window.innerHeight, window.innerWidth);
  const webWorker = Math.min(navigator.hardwareConcurrency , 4)
  const config = {
    //カメラ設定
    inputStream: {
      name: "Live",
      type: "LiveStream",
      //描画するidを指定
      target: "#preview",
      //サイズ指定、詳細な設定ならconstraintsを作成する
      constraints: {
        width: cameraSize,
        height: cameraSize,
        facingMode: "environment",
      },
      singleChannel: false,
    },
    locator: {
      patchSize: "medium",
      halfSample: true,
    },
    //読み取るバーコードの種類
    decoder: {
      readers: ["ean_reader"],
      multiple: false,
    },

    //使用可能なWebワーカー数の指定
    numOfWorkers: webWorker,

    locate: true,
  };

  useEffect(() => {
    onChangeQuaggaCamera();
    Quagga.onDetected((result) => {
      //誤認識を防ぐために複数回バーコードが一致する場合としてもよさそう
      if (result != null) {
        setTimeout(reloadItemName(result.codeResult.code), 1000);
        // setBarcode(result.codeResult.code);
      }
    });
  }, []);

  const startCamera = (event) => {
    event.preventDefault();
    onChangeQuaggaCamera();
  };
  const onChangeQuaggaCamera = () => {
    Quagga.init(config, (err) => {
      if (err) {
        present({
          header: "カメラを許可してください",
          buttons: [
            "OK",
          ],
        })
        return;
      }
      Quagga.start();
    });
  };

  const stopCamera = (event) =>{
    event.preventDefault();
    Quagga.stop();
  }

  return (
    <div>
      {/* <form onSubmit={(e) => startCamera(e)}>
        <button>camera on</button>
      </form>
      <form onSubmit={(e) => stopCamera(e)}>
        <button>camera stop</button>
      </form>
      <IonButton
        onClick={() =>
          present({
            header: "カメラを許可してください",
            buttons: [
              "OK",
            ],
          })
        }
      >
        show alert
      </IonButton> */}
      <div id="preview"></div>
    </div>
  );
};

export default Scan;
