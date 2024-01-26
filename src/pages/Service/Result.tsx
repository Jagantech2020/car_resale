import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { carDetails } from "../../data/carDetailsModel";
import { CarDetailsType } from "../../@types/global";
import { setDefaultResults } from "../../store/actions/carsDetil";

const Result: React.FC<any> = ({ filteredData }) => {
  const { carsDetails } = useSelector((state: any) => {
    return state?.carDetailsReducer;
  });
  const dispatch = useDispatch();
  const [modelInputs, setModelInputs] = useState<CarDetailsType>({
    ...carDetails,
  });

  useEffect(() => {
    const loadCarDefaultResults = async () => {
      try {
        const response = await fetch("cars_dummy_results.json", {
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
          dispatch(setDefaultResults([...carsDetails, ...data]));
        }
      } catch (err) {
        throw new Error("Something went wrong, Please Try again");
      }
    };
    if(carsDetails?.length > 0) return;
    loadCarDefaultResults();
  }, []);


  const getfilteredValue = (car: any) => {
    debugger;
    if(!filteredData?.value){
        return car;
    }
    if(filteredData?.value && filteredData.filtername === "price" &&  Number(car[filteredData?.filtername]) <= filteredData?.value){
       return car;
    } else if(filteredData?.value && filteredData.filtername == "number_of_owers" && filteredData?.value.includes(car[filteredData?.filtername])){
        return car;
    }else if(filteredData?.value && filteredData.filtername != "price" && car[filteredData?.filtername]?.toLowerCase().includes(filteredData?.value?.toLowerCase())){
        return car;
    }
  }

  const theaderData = useMemo(() => Object.keys(modelInputs), []);
 
  return (
    <>
      <section style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              {theaderData?.map((item: any) => (
                <th>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {carsDetails?.filter(getfilteredValue).map((item: any) => (
              <tr>
                {theaderData?.map((item2: any) => (
                  <td>{item[item2 as keyof typeof item]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Result;
