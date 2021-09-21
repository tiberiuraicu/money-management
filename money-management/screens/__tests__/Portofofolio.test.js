import React from "react";

import { render, fireEvent, act } from "@testing-library/react-native";

import Portofolio from "./../Portofolio/Portofolio"

test("renders default element", () => {
    const { getByTestId } = render(<Portofolio></Portofolio>);
  
    getByTestId("sharesList")
  
//    fireEvent(getByTestId("delete"), new MouseEvent('click', {
//     bubbles: true,
//     cancelable: true,
//   }))
  });
  