"use client";

import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import TransactionIcon from "@/components/Icons/transaction.icon";

export default function TrackChart({ data }: { data: any }) {
  const [selection, setSelection] = useState("one_year");
  const [series] = useState([{ data: data }]);
  const [options] = useState({
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      width: "100%",
      toolbar: {
        show: false,
      },
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: "hollow",
    },
    xaxis: {
      type: "datetime",
      min: new Date("01 Mar 2012").getTime(),
      tickAmount: 4,
    },
    yaxis: {
      tickAmount: 3,
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  });

  const updateData = (timeline: any) => {
    setSelection(timeline);

    const zoomDates = {
      one_month: [
        new Date("28 Jan 2013").getTime(),
        new Date("27 Feb 2013").getTime(),
      ],
      six_months: [
        new Date("27 Sep 2012").getTime(),
        new Date("27 Feb 2013").getTime(),
      ],
      one_year: [
        new Date("27 Feb 2012").getTime(),
        new Date("27 Feb 2013").getTime(),
      ],
      ytd: [
        new Date("01 Jan 2013").getTime(),
        new Date("27 Feb 2013").getTime(),
      ],
      all: [
        new Date("23 Jan 2012").getTime(),
        new Date("27 Feb 2013").getTime(),
      ],
    };

    if (timeline in zoomDates && zoomDates[timeline]) {
      ApexCharts.exec("area-datetime", "zoomX", ...zoomDates[timeline]);
    }
  };

  return (
    <div className="card w-full h-full">
      <div id="chart w-full">
        <div className="flex justify-between">
          <div className="flex-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-olive-green-100 flex-center">
              <TransactionIcon className="w-6 h-6 text-olive-green-900" />
            </div>
            <h2 className="">Transaction activity</h2>
          </div>
          <div className="toolbar flex gap-4">
            {["one_month", "six_months", "one_year", "ytd", "all"].map(
              (timeframe) => (
                <button
                  key={timeframe}
                  id={timeframe}
                  onClick={() => updateData(timeframe)}
                  className={selection === timeframe ? "active" : ""}
                >
                  {timeframe === "one_month"
                    ? "1M"
                    : timeframe === "six_months"
                    ? "6M"
                    : timeframe === "one_year"
                    ? "1Y"
                    : timeframe === "ytd"
                    ? "YTD"
                    : "ALL"}
                </button>
              )
            )}
          </div>
        </div>

        <div id="chart-timeline w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={220}
          />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
