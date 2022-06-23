import React from "react";
import Chart from "react-apexcharts";
import moment from "moment";

const Sensor = ({ channel_name, value, uom, time }) => {
    const toes = time.map((t) => moment(t).fromNow());
    const gg = {
        options: {
            xaxis: {
                categories: [...toes],
            },
            chart: {
                foreColor: "#fff",
            },
        },

        series: [
            {
                name: "series-1",
                data: [...value, 1],
            },
        ],
    };

    return (
        <div className="bg-zinc-500 h-[250px] px-2">
            <p className="text-white py-2">
                <strong>SensorName</strong> : {channel_name}
            </p>
            <Chart
                series={gg.series}
                type="line"
                options={gg.options}
                height={180}
            />
        </div>
    );
};

export default Sensor;
