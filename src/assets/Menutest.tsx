import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { store } from "../redux/store";
import axios from "axios";
import Menu from "../Pages/Menu";


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockProjects = [
  {
    id: "1",
    name: "Project 1",
    user: { first_name: "Rajesh", last_name: "Pekala", email: "rajesh@example.com" },
    subscription: { name: "Basic" },
  },
  {
    id: "2",
    name: "Project 2",
    user: { first_name: "prem", last_name: "kumar", email: "prem@gmail.com" },
    subscription: { name: "Premium" },
  },
];

describe("Menu Component", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/menu"]}>
          <Routes>
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  it("renders loading state initially", () => {
    expect(wrapper.find("svg").exists()).toBe(true); 
  });

  it("renders project details after data is fetched", async () => {
    mockedAxios.get.mockResolvedValue({ data: { data: mockProjects } });

    
    await Promise.resolve(); 
    wrapper.update();

 
    expect(wrapper.find("h6").at(0).text()).toContain(mockProjects[0].name);
    expect(wrapper.find("h6").at(1).text()).toContain(mockProjects[1].name);

    mockProjects.forEach((project) => {
      expect(wrapper.text()).toContain(project.user.first_name);
      expect(wrapper.text()).toContain(project.user.last_name);
      expect(wrapper.text()).toContain(project.user.email);
      expect(wrapper.text()).toContain(project.subscription.name);
    });
  });

  it("renders 'No projects available' if no projects data is present", async () => {
    mockedAxios.get.mockResolvedValue({ data: { data: [] } });


    await Promise.resolve(); 
    wrapper.update(); 

   
    expect(wrapper.text()).toContain("No projects available");
  });

  it("handles API errors ", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));

    
    await Promise.resolve(); 
    wrapper.update(); 

    
    expect(wrapper.text()).toContain("No projects available");
  });
});
