import { useIonAlert } from "@ionic/react";
import Quagga from "@ericblade/quagga2";
import { useState, useLayoutEffect, useCallback,useEffect } from "react";
import { fetchItemInfomation, fetchItemFormat } from "../api";

function getMedian(arr) {
	arr.sort((a, b) => a - b);
	const half = Math.floor(arr.length / 2);
	if (arr.length % 2 === 1) return arr[half];
	return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes) {
	const errors = decodedCodes
		.filter((x) => x.error != null)
		.map((x) => x.error);
	const medianOfErrors = getMedian(errors);
	return medianOfErrors;
}

const cameraSize = Math.min(window.innerHeight, window.innerWidth);

const Scan = (props) => {
	const [admitCamera, setAdmitCamera] = useState(false);
	const [present] = useIonAlert();

	const checkError = useCallback(
		(result) => {
			const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
			if (err < 0.25) {
				fetchItemInfomation(result.codeResult.code).then((rawName) => {
					present({
						header: "このバーコードを登録しますか？",
						message: `${result.codeResult.code}`,
						buttons: [
							"Cancel",
							{
								text: "OK",
								handler: () => {
									fetchItemFormat(rawName).then(
										(formatName) => {
											props.addLog(formatName);
										},
									);
								},
							},
						],
					});
				});
			}
		},
		[props, present],
	);

	const handleProcessed = (result) => {
		const drawingCtx = Quagga.canvas.ctx.overlay;
		const drawingCanvas = Quagga.canvas.dom.overlay;
		drawingCtx.font = "24px Arial"; //変更の可能性あり、実験段階
		drawingCanvas.fillStyle = "green";

		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(
					0,
					0,
					parseInt(drawingCanvas.getAttreibute("width")),
					parseInt(drawingCanvas.getAttribute("height")),
				);
				result.boxes
					.filter((box) => box !== result.box)
					.forEach((box) => {
						Quagga.ImageDebug.drawPath(
							box,
							{ x: 0, y: 1 },
							drawingCtx,
							{ color: "purple", lineWidth: 2 },
						);
					});
			}
			if (result.box) {
				Quagga.ImageDebug.drawPath(
					result.box,
					{ x: 0, y: 1 },
					drawingCtx,
					{ color: "blue", lineWidth: 2 },
				);
			}
			if(result.codeResult && result.codeResult.code){
				drawingCtx.font = "24px Arial"
				drawingCtx.fillText(result.codeResult.code,10,20);
			}
		}
	};

	useLayoutEffect(() => {
		const config = {
			inputStream: {
				name: "Live",
				type: "LiveStream",
				target: "#preview",
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
			decoder: {
				readers: ["ean_reader", "ean_8_reader"],
				multiple: false,
			},
			numOfWorkers: navigator.hardwareConcurrency || 4,
			locate: true,
		};

		Quagga.init(config, (err) => {
			Quagga.onProcessed(handleProcessed);
			if(err && !admitCamera) {
				present({
					header: "カメラを許可してください",
					buttons: ["OK"],
				});
			} else {
				setAdmitCamera(true)
				Quagga.start();
			}
			Quagga.onDetected(checkError);
			return () => {
				Quagga.offDetected(checkError)
				Quagga.offProcessed(handleProcessed)
				Quagga.stop();
			}
		})

		// const onChangeQuaggaCamera = () => {
		// 	Quagga.init(config, (err) => {
		// 		if (err && !admitCamera) {
		// 			present({
		// 				header: "カメラを許可してください",
		// 				buttons: ["OK"],
		// 			});
		// 			return;
		// 		}
		// 		setAdmitCamera(true);
		// 		Quagga.start();
		// 	});
		// };
		// // Quagga.onDetected((result) => {
		// //   detectBarcode(result);
		// // });
		// onChangeQuaggaCamera();
		console.log(123);
	}, [admitCamera, present,checkError]);

	return (
		<div>
			<div id="preview"></div>
		</div>
	);
};

export default Scan;
