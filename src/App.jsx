import React, { useEffect, useState } from "react";
import axios from "axios";
import FormData from "form-data";
import Box from "./components/Box";

const App = () => {
    const [imageData, setImageData] = useState();
    const [stationData, setStationData] = useState([
        {
            category_name: "cat_analog 2",
            category_description: "",
            category_sensors: [
                {
                    channel_name: "id9000_WindSpeed",
                    alias: "id9000_WindSpeed",
                    value: [78.09],
                    uom: ["%"],
                    time: [1655594040272],
                },
                {
                    channel_name: "id9000_Temprature",
                    alias: "id9000_Temprature",
                    value: [78.09],
                    uom: ["%"],
                    time: [1655594040272],
                },
                {
                    channel_name: "id9000_Humidity",
                    alias: "id9000_Humidity",
                    value: [68.72],
                    uom: ["%"],
                    time: [1655594040272],
                },
                {
                    channel_name: "id9000_RainSum",
                    alias: "id9000_RainSum",
                    value: [0.0],
                    uom: ["%"],
                    time: [1655594040272],
                },
                {
                    channel_name: "id9000_rampInstant",
                    alias: "id9000_rampInstant",
                    value: [-14.89],
                    uom: ["%"],
                    time: [1655594040272],
                },
                {
                    channel_name: "id9000_rampSum",
                    alias: "id9000_rampSum",
                    value: [0.04],
                    uom: ["%"],
                    time: [1655594040272],
                },
            ],
        },
    ]);

    const baseUrl = "http://pardalin.ir:8080";
    const HeadReq = async () => {
        const sendingData = new FormData();
        sendingData.append("command", "noLoginStationLogo");
        const { data } = await axios({
            url: baseUrl,
            method: "post",
            data: sendingData,
            headers: { "Content-Type": "multipart/form-data" },
        });
        setImageData(data);
    };

    const BodyReq = async () => {
        const sendingData = new FormData();
        sendingData.append("command", "reportNoLogin");
        sendingData.append("val", {});
        const { data } = await axios({
            url: baseUrl,
            method: "post",
            data: {
                command: "reportNoLogin",
                val: {},
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
        const newData = stationData.map((item) => {
            const shouldReplace = data.find(
                (r) => r.categoryName === item.category_name
            );
            if (!shouldReplace) return item;
            return {
                ...shouldReplace,
                category_sensors: item.category_sensor.map((sen) => {
                    return {
                        channel_name: sen.channel_name,
                        alias: sen.alias,
                        value: [
                            ...sen.value,
                            shouldReplace.category_sensors.value,
                        ],
                        uom: [...sen.uom, shouldReplace.category_sensors.uom],
                        time: [
                            ...sen.time,
                            shouldReplace.category_sensors.time,
                        ],
                    };
                }),
            };
        });
        setStationData(newData);
    };
    useEffect(() => {
        HeadReq();
        setInterval(BodyReq, 10000);
    }, []);

    console.log(stationData);

    return (
        <div className="min-h-screen bg-zinc-200 flex flex-col items-center justify-center">
            <div className="container mx-auto max-w-[600px]">
                <div className=" w-full py-5 bg-zinc-50 flex items-center justify-between px-5 rounded-sm mt-5">
                    <p className="text-xl capitalize text-gray-400">
                        station name
                    </p>
                    {imageData && (
                        <img
                            className="w-20 h-20 p-2 rounded-md bg-zinc-200 hover:shadow-none cursor-pointer transition shadow-xl"
                            src={`data:image/jpeg;base64,${imageData}`}
                            alt="logo"
                        />
                    )}
                </div>
                <div className="min-h-[500px] w-full bg-zinc-50 flex flex-col my-1">
                    {stationData.map((item) => (
                        <Box
                            categoryName={item.category_name}
                            categoryDisc={item.category_description}
                            categorySens={item.category_sensors}
                            key={item.category_name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
