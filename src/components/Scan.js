import { useIonAlert } from "@ionic/react";
// import { returnUpBack } from "ionicons/icons";
import Quagga from "@ericblade/quagga2";
import { useState, useEffect } from "react";
import { fetchItemInfomation, fetchItemFormat } from "../api";

const Scan = (props) => {
  const [barcode, setBarcode] = useState("4901411086798"); //このjanコードはダミーデータのようなもの
  const [present] = useIonAlert();

  const addDrinkLog = (value) => {
    props.addLog(value);
  };

  const reloadItemName = (code) => {
    fetchItemInfomation(code).then((rawName) => {
      setBarcode(code);
      if (rawName !== "" && rawName != null) {
        present({
          header: "このバーコードを登録しますか？",
          message: `${code}`,
          buttons: [
            "Cancel",
            {
              text: "Ok",
              handler: () => {
                fetchItemFormat(rawName).then((formatName) => {
                  addDrinkLog(formatName);
                });
              },
            },
          ],
        });
      }
    });
  };

  useEffect(() => {
    const cameraSize = Math.min(window.innerHeight, window.innerWidth);
    const webWorker = Math.min(navigator.hardwareConcurrency, 4);
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

    const onChangeQuaggaCamera = () => {
      Quagga.init(config, (err) => {
        if (err) {
          // present({
          //   header: "カメラを許可してください",
          //   buttons: ["OK"],
          // });
          return;
        }
        Quagga.start();
      });
    };
    Quagga.onDetected((result) => {
      window.alert(result.codeResult.code);
      //誤認識を防ぐために複数回バーコードが一致する場合としてもよさそう
      if (result != null) {
        // setTimeout(reloadItemName(result.codeResult.code), 1000);
      }
    });
    onChangeQuaggaCamera();
  }, []);

  return (
    <div>
      {/* <div>読み込んでいるやつ : {barcode}</div> */}
      <div id="preview"></div>
    </div>
  );
};

export default Scan;
