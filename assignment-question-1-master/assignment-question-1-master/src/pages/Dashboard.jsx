import React, { useState } from "react";
import mockData from "../assets/data.json";
import timestamp from "../assets/timeStamps.json";
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const newData = mockData.results.map((data) => {
    return {
      ...data,
      orderSubmitted: timestamp.results.map((item) => {
        if (item["&id"] === data["&id"]) {
          return item.timestamps.orderSubmitted;
        }
      }),
    };
  });

  const handleListItemclick = (e) => {
    const selectedOrderId = e.target.innerText;
    const selectedData = mockData.results.find(
      (item) => item["&id"] === selectedOrderId
    );

    setSelectedOrderDetails({
      buySellIndicator: selectedData.executionDetails.buySellIndicator,
      orderStatus: selectedData.executionDetails.orderStatus,
      orderType: selectedData.executionDetails.orderType,
    });

    const selectedTimestampData = timestamp.results.find(
      (item) => item["&id"] === selectedOrderId
    );
    setSelectedOrderTimeStamps(selectedTimestampData.timestamps);
  };

  const filteredData = newData.filter((data) =>
    data["&id"].toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={`${mockData.results.length} Orders`}
        />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card cardData={selectedOrderDetails} title="Selected Order Details" />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>

        <List rows={filteredData} currency={currency} handleListClick={handleListItemclick} />
      </div>
    </div>
  );
};

export default Dashboard;
