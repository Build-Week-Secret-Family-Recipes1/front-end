import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import App from "../App";
import { testList } from './TestData';

test('App renders without crashing', ()=>{
  expect(render(<App />));
});
