import React from "react";

import { render, fireEvent, act } from "@testing-library/react-native";
import AddNewTransaction from "../AddNewTransaction/AddNewTransaction";

test("renders default element", () => {
  const { getByTestId } = render(<AddNewTransaction></AddNewTransaction>);

  expect(getByTestId("buySellSwitch")).toBeTruthy();

  expect(getByTestId("searchTerm")).toBeTruthy();

  expect(getByTestId("price")).toBeTruthy();

  expect(getByTestId("amount")).toBeTruthy();

  expect(getByTestId("addTransactionButton")).toBeTruthy();
});

// test("toggleSwitch function should be called on switch change (toggle label should be changed to 'SELL' on the first switch and if switched back label should be changed to 'BUY' again)", () => {
//   const { getByTestId, getByText } = render(
//     <AddNewTransaction></AddNewTransaction>
//   );
//   expect(getByText("BUY")).toBeTruthy();

//   fireEvent(getByTestId("buySellSwitch"), "valueChange", true || false);

//   expect(getByText("SELL")).toBeTruthy();

//   fireEvent(getByTestId("buySellSwitch"), "valueChange", true || false);

//   expect(getByText("BUY")).toBeTruthy();
// });

// test("should change the error message of the symbol InputText based on the input written", async () => {
//   const { getByTestId, getByText } = render(<AddNewTransaction />);
//   fireEvent.changeText(getByTestId("searchTerm"), "asdf");
//   fireEvent.changeText(getByTestId("searchTerm"), "");
//   expect(getByText("This field cannot be empty")).toBeTruthy();
// });

// test("should change the error message of the price InputText based on the input written", () => {
//   const { getByTestId, getByText } = render(<AddNewTransaction />);

//   fireEvent.changeText(getByTestId("price"), "asdf");
//   expect(getByText("Only numbers accepted")).toBeTruthy();

//   fireEvent.changeText(getByTestId("price"), "asdf");
//   fireEvent.changeText(getByTestId("price"), "");
//   expect(getByText("This field cannot be empty")).toBeTruthy();
// });

// test("should change the error message of the amount InputText based on the input written", async () => {
//   const { getByTestId, getByText } = render(<AddNewTransaction />);

//   fireEvent.changeText(getByTestId("amount"), "asdf");

//   expect(getByText("Only numbers accepted")).toBeTruthy();

//   fireEvent.changeText(getByTestId("amount"), "asdf");
//   fireEvent.changeText(getByTestId("amount"), "");

//   expect(getByText("This field cannot be empty")).toBeTruthy();
// });

// //---TODO
// test("selecting from the shares list(after an user typed something in search bar) should work", async () => {
//   const { getByTestId, getByText } = render(<AddNewTransaction />);

//   fireEvent.changeText(getByTestId("searchTerm"), "MSFT");

//   expect(getByText("Only numbers accepted")).toBeTruthy();

//   fireEvent.changeText(getByTestId("amount"), "asdf");
//   fireEvent.changeText(getByTestId("amount"), "");

//   expect(getByText("This field cannot be empty")).toBeTruthy();
// });

// test("should not alow to add transaction if the inputs are not written in the correct format", async () => {
//   const { getByTestId, getByText } = render(<AddNewTransaction />);

//   fireEvent.changeText(getByTestId("amount"), "asdf");

//   expect(getByText("Only numbers accepted")).toBeTruthy();

//   fireEvent.changeText(getByTestId("amount"), "asdf");
//   fireEvent.changeText(getByTestId("amount"), "");

//   expect(getByText("This field cannot be empty")).toBeTruthy();
// });
