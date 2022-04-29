import { useIonAlert } from '@ionic/react';
import Quagga from '@ericblade/quagga2';
import { useCallback, useLayoutEffect } from 'react';
import { fetchItemInfomation, fetchItemFormat } from '../api';
import { AdmitCameraState } from '../recoilstates/AdmitCameraState';
import { useRecoilState } from 'recoil';

const Scanner = ({ addLog }) => {
  const [admitCamera, setAdmitCamera] = useRecoilState(AdmitCameraState);
  const [registerJanCode] = useIonAlert();
  const [AlertCameraAdmitSheet] = useIonAlert();


  const reloadItemName = useCallback((jancode) => {
    fetchItemInfomation(jancode).then((rawName) => {
      const rawNameDescription = rawName.hits[0]?.description;
      if (rawNameDescription != null && rawNameDescription.length !== 0) {
        registerJanCode({
          header: 'このバーコードを登録しますか？',
          message: `${jancode}`,
          buttons: [
            'Cancel',
            {
              text: 'OK',
              handler: () => {
                fetchItemFormat(rawName).then((formatName) => {
                  addLog(formatName);
                });
              },
            },
          ],
        });
      }
    });
  },[addLog,registerJanCode]);

  useLayoutEffect(() => {
    const cameraSize = Math.min(window.innerHeight, window.innerWidth);
    const config = {
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: '#preview',
        constraints: {
          width: cameraSize,
          height: cameraSize,
          facingMode: 'environment',
        },
        singleChannel: false,
      },
      locator: {
        patchSize: 'medium',
        halfSample: true,
      },
      decoder: {
        readers: ['ean_reader', 'ean_8_reader'],
        multiple: false,
      },
      numOfWorkers: 0,
      locate: true,
    };

    const onChangeQuaggaCamera = () => {
      Quagga.init(config, (err) => {
        if (err && !admitCamera) {
          AlertCameraAdmitSheet({
            header: 'カメラを許可してください',
            buttons: ['OK'],
          });
          return;
        }
        setAdmitCamera(true);
        Quagga.start();
      });
    };

    const checkJanCodeDegit = (jancode) => {
      const n = jancode.length;
      if (n === 0) return false;
      let odd = 0;
      let even = 0;
      for(let i = 0; i < n-1; i++){
        if(i % 2 === 0){
          odd += +jancode[i];
        } else {
          even += +jancode[i];
        }
      }
      even *= 3;
      const sum = odd + even;
      const checkDigit = 10 - (sum % 10);
      return checkDigit === +jancode[n - 1];
    }

    onChangeQuaggaCamera();

    Quagga.onDetected((result) => {
      if (result != null && checkJanCodeDegit(result.codeResult.code)) {
				//FIXME:複数回警告が表示される
        setTimeout(reloadItemName(result.codeResult.code), 1000);
      }
    });
    return () => {
      Quagga.stop();
    };
  }, [AlertCameraAdmitSheet, setAdmitCamera, admitCamera,reloadItemName]);


  return (
    <div>
      <div id="preview"></div>
    </div>
  );
};

export default Scanner;
