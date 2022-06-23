import React from "react";
import Sensor from "./Sensor";

const Box = ({ categoryName, categoryDisc, categorySens }) => {
    return (
        <div className="mx-2">
            <div className="py-2">
                <h2 className="text-gray-600">
                    <strong>Category Name</strong> : {categoryName}
                </h2>
                <h2 className="text-gray-600">
                    <strong>Category Disc</strong> :{" "}
                    {categoryDisc ? categoryDisc : "_"}
                </h2>
            </div>
            <div className="grid grid-cols-1 space-y-3">
                <h3 className="text-2xl text-blue-600 capitalize">sensors</h3>
                {categorySens.map((item) => (
                    <Sensor
                        channel_name={item.channel_name}
                        value={item.value}
                        time={item.time}
                        uom={item.oum}
                        key={item.channel_name}
                    />
                ))}
            </div>
        </div>
    );
};

export default Box;
