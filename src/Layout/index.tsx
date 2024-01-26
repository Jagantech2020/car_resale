import React, {useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { CompayListContext } from "../common/appContext";
import { CompanyListType } from "../@types/global";
import { Provider } from "react-redux";
import { store } from "../store";

const Layout: React.FC = () => {
  const CompanyListProvider = CompayListContext.Provider;
  const [companyList, setCompanyList] = useState<CompanyListType>([]);

  useEffect(() => {
    const loadCarCompanies = async () => {
      try {
        const response = await fetch("car_company_list.json", {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        });
        if (!response.ok) {
          throw new Error("Something went wrong, Please Try again");
        }
        const data: CompanyListType = await response.json();
        if (data?.length > 0) {
          setCompanyList([...data]);
        }
      } catch (err) {
        throw new Error("Something went wrong, Please Try again")
      }

    }
    loadCarCompanies()
  }, []);
  return (
    <Provider store={store}>
    <CompanyListProvider value={companyList} >
      <section className="layout_container">
        <Header />
        <section>
          <Outlet />
        </section>
        <footer>@Copy rights received - 2024-2025</footer>
      </section>
    </CompanyListProvider>
    </Provider>
  );
};

export default Layout;