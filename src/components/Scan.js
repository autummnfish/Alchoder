import { useIonAlert } from "@ionic/react";
// import { returnUpBack } from "ionicons/icons";
import Quagga from "@ericblade/quagga2";
import { useEffect } from "react";
import { fetchItemInfomation, fetchItemFormat } from "../api";

const Scan = (props) => {
  const [present] = useIonAlert();

  const addDrinkLog = (value) => {
    props.addLog(value);
  };

  const reloadItemName = (code) => {
    fetchItemInfomation(code).then((rawName) => {
      const rawNameDescription = rawName.hits[0].description
      if (rawNameDescription !== "" && rawNameDescription != null) {
        Quagga.stop();
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
        readers: ["ean_reader","ean_8_reader"],
        multiple: false,
      },

      //使用可能なWebワーカー数の指定
      numOfWorkers: navigator.hardwareConcurrency || 4,

      locate: true,
    };

    const onChangeQuaggaCamera = () => {
      Quagga.init(config, (err) => {
        if (err) {
          present({
            header: "カメラを許可してください",
            buttons: ["OK"],
          });
          return;
        }
        Quagga.start();
      });
    };
    Quagga.onDetected((result) => {
      if (result != null) {
        setTimeout(reloadItemName(result.codeResult.code), 5000);
      }
    });
    onChangeQuaggaCamera();
  }, []);

  return (
    <div>
      <div id="preview"></div>
    </div>
  );
};

export default Scan;
