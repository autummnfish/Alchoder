import { useIonAlert } from "@ionic/react";
// import { returnUpBack } from "ionicons/icons";
import Quagga from "@ericblade/quagga2";
import { useEffect,useState } from "react";
import { fetchItemInfomation, fetchItemFormat } from "../api";

const Scan = (props) => {
  const [present] = useIonAlert();
  const [admitCamera,setAdmitCamera] = useState(false);

  const addDrinkLog = (value) => {
    props.addLog(value);
  };

  const detectBarcode = (result)=>{
    if(result != null){
      setTimeout(reloadItemName(result.codeResult.code), 1000);
    }
  }

  const reloadItemName = (code) => {
    fetchItemInfomation(code).then((rawName) => {
      const rawNameDescription = rawName != null ? rawName.hits[0].description : null
      if (rawNameDescription !== "" && rawNameDescription != null) {
        present({
          header: "このバーコードを登録しますか？",
          message: `${code}`,
          buttons: [
            "Cancel",
            {
              text: "OK",
              handler: () => {
                fetchItemFormat(rawName).then((formatName) => {
                  addDrinkLog(formatName);
                });
              },
            },
          ],
        });
      } else{
        Quagga.start();
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
        if (err && !admitCamera) {
          present({
            header: "カメラを許可してください",
            buttons: ["OK"],
          });
          return;
        }
        setAdmitCamera(true);
        Quagga.start();
      });
    };
    Quagga.onDetected((result) => {
      Quagga.offProcessed(detectBarcode);
      Quagga.offDetected(detectBarcode);
      detectBarcode(result);
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
