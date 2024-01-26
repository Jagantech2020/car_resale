import React, { useContext, useEffect, useMemo, useState } from "react";
import ModelInput from "../../common/components/ModelInputs";
import { CompanyListType, CompanyType } from "../../@types/global";
import { CompayListContext } from "../../common/appContext";
import Result from "./Result";
import Filter from "./Filter";
import { carDetails } from "../../data/carDetailsModel";

const Service: React.FC = () => {
  const [carsFilterList, setCarFilterList] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>();
  const [companyList, setCompanyList] = useState<any>([])
  const companyLst: CompanyListType | null =
    useContext<CompanyListType | null>(CompayListContext);


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
    if(!companyLst?.length ) {
      loadCarCompanies();
    } else {
      setCompanyList([...companyLst]);
    }
  }, []);


  useEffect( () => {

    const loadCarFilterData = async () => {
      try {
        const response = await fetch("car_filter_list.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Something went wrong, Please Try again");
        }
        const data = await response.json();
        if (data?.length > 0) {
          let finalData = data.map((item: any) => {
            const finalResult = { ...item };
            if (item.filtername === "brand_name") {
              finalResult["value"] = companyList?.map((company: CompanyType) => company.name)
            }
            return finalResult;
          });
          setCarFilterList([...finalData]);
        }
      } catch (err) {
        throw new Error("Something went wrong, Please Try again");
      }
    };
    if(!companyList.length) return;
    loadCarFilterData();
  }, [companyList])

  const handleInputChange = (val: string, filtername: string) => {
 
    setFilteredData({ value: val, filtername });
  };
  return (
    <>
      <h1>Buy Cars</h1>
      <section
        className="d-flex justify-space-between gap-30"
        style={{
          padding: "20px",
          margin: "20px 10px",
          border: "3px solid aquamarine",
        }}
      >
        <div className="filter_section" style={{ width: "20%" }}>
          {carsFilterList?.length > 0 && (
            <Filter
              handleInputChange={handleInputChange}
              carsFilterList={carsFilterList}
            />
          )}
        </div>
        <div className="result_section" style={{ maxWidth: "70%" }}>
          <h3>Results</h3>
          <Result carsFilterList={carsFilterList} filteredData={filteredData} />
        </div>
      </section>
    </>
  );
};
export default Service;
