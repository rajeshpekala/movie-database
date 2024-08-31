import React from "react";
import { mount } from "enzyme";
import Login from "../components/Login";
import { Provider } from "react-redux";
import { store } from "../components/redux/store";


describe("Login Component", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        
          <Login />
      </Provider>
    );
  });

  it("renders email and password inputs and submits the form", () => {
   
    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="password"]');

  
    expect(emailInput.exists()).toBe(true);
    expect(passwordInput.exists()).toBe(true);

    
    emailInput.simulate("change", {
      target: { name: "email", value: "rajesh.pekala@berrybytes.com" },
    });
    passwordInput.simulate("change", {
      target: { name: "password", value: "9133955392" },
    });

    wrapper.find("form").simulate("submit");

  });
});
