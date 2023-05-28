import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import Sidebar from "./Sidebar";

const Payments = () => {
  const [checkoutSummary, setCheckoutSummary] = useState(null);

  useEffect(() => {
    fetchCheckoutSummary();
    console.log(checkoutSummary);
  }, []);

  const fetchCheckoutSummary = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/payments"); // Replace with your API route
      setCheckoutSummary(response.data);
    } catch (errorr) {
      console.error(errorr);
    }
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex items-center justify-center w-full ">
        {checkoutSummary ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th className="font-mono">ITEMS</th>
                  <th className="font-mono">QTY</th>
                  <th className="font-mono">UNIT PRICE</th>
                  <th className="font-mono">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {checkoutSummary.items && checkoutSummary.items.length > 0 ? (
                  checkoutSummary.items.map((item) => (
                    <tr key={item.id}>
                      <td className="font-mono">{item.name}</td>
                      <td className="font-mono">{item.quantity}</td>
                      <td className="font-mono">{item.unitPrice}</td>
                      <td className="font-mono">{item.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No items available</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td className="font-mono" colSpan="3">
                    Total
                  </td>
                  <td className="font-mono">
                    {(checkoutSummary.totalAmount / 100).toFixed(2)} $
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p>Loading checkout summary...</p>
        )}
      </div>
    </div>
  );
};

export default Payments;
