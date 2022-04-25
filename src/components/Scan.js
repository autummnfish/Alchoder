import { useIonAlert } from '@ionic/react';
import Quagga from '@ericblade/quagga2';
import { useLayoutEffect } from 'react';
import { fetchItemInfomation, fetchItemFormat } from '../api';
import { AdmitCameraState } from '../recoilstates/AdmitCameraState';
import { useRecoilState } from 'recoil';

const Scan = ({ addLog }) => {
  const [admitCamera, setAdmitCamera] = useRecoilState(AdmitCameraState);
  const [registerJanCode] = useIonAlert();
  const [AlertCameraAdmitSheet] = useIonAlert();

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
      numOfWorkers: 4,
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
    const reloadItemName = (code) => {
      fetchItemInfomation(code).then((rawName) => {
        const rawNameDescription = rawName.hits[0].description;
        if (rawNameDescription != null && rawNameDescription.length !== 0) {
          registerJanCode({
            header: 'このバーコードを登録しますか？',
            message: `${code}`,
            buttons: [
              'Cancel',
              {
                text: 'Ok',
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
    };

    onChangeQuaggaCamera();

    Quagga.onDetected((result) => {
      if (result != null) {
        setTimeout(reloadItemName(result.codeResult.code), 1000);
      }
    });
    return () => {
      Quagga.stop();
    };
  }, [AlertCameraAdmitSheet, setAdmitCamera, addLog, registerJanCode, admitCamera]);

  return (
    <div>
      <div id="preview"></div>
    </div>
  );
};

export default Scan;
