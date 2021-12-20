import { useIonAlert } from "@ionic/react";
import { useState, useEffect } from "react";
import { fetchItemInfomation, fetchItemFormat } from "../api";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";

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

  //setTimeout(reloadItemName(result.codeResult.code), 1000);

  useEffect(() => {
      const config = {};
      const cameraSize = Math.min(window.innerHeight, window.innerWidth);
      Html5Qrcode.getCameras()
        .then((devices) => {
          console.log(devices);
          if (devices && devices.length) {
            config.cameraId = devices[0].id;
          }
        })
        .catch((err) => {
          present({
            header: "カメラを許可してください",
            buttons: ["OK"],
          });
        });
      const html5QrCode = new Html5Qrcode("reader");
      console.log(html5QrCode);
      html5QrCode
        .start(config.cameraId, {
          fps: 10,
          qrbox: cameraSize,
        })
        .catch((err) => {});

    // const  onScanSuccess = (decodedText,decodedResult) =>{
    //   window.alert(`Code scanned = ${decodedText}`, decodedResult);
    // }

    // const html5QrcodeScanner = new Html5QrcodeScanner(
    //   "reader",
    //   {fps : 10,
    //     qrbox: cameraSize
    //   }
    // );
    // html5QrcodeScanner.render(onScanSuccess);
  }, []);

  return (
    <div>
      <div>読み込んでいるやつ : {barcode}</div>
      <div id="reader"></div>
    </div>
  );
};

export default Scan;
