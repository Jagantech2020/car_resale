import { useContext, useEffect, useState } from "react";
import { CompayListContext } from "../../common/appContext";
import { CompanyListType } from "../../@types/global";
import "./Home.css";
import ModelInput from "../../common/components/ModelInputs";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultResults } from "../../store/actions/carsDetil";

const Home: React.FC = (props) => {
  const companyList: CompanyListType | null =
    useContext<CompanyListType | null>(CompayListContext);
  const { carsDetails } = useSelector((state: any) => {
    return state?.carDetailsReducer;
  });
  const [selectedBrand, setSelectedBrand] = useState<any>({})
  const [id, setId] = useState("")
  const toggleModelForm = (obj: { name: string; imageName: string }) => {
    console.log(obj);
    const id = `ids_${carsDetails.length + 1}`;
    setId(id)
    setSelectedBrand({...obj})
  };
  const dispatch = useDispatch();
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

  
  return (
    <>
      <section className="home_wrapper">
        <section className="d-flex gap-40 flex-wrap">
          {companyList?.map((item) => {
            const logo = require(`../../assets/${item?.imageName}`);
            return (
              <div
                key={item.name}
                onClick={() => toggleModelForm(item)}
                className="company_list_item flex-1"
              >
                <img
                  width="150px"
                  height="120px"
                  src={logo}
                  alt={item.imageName}
                />
                <p className="name">{item.name}</p>
              </div>
            );
          })}
        </section>
        <br />
        <br />
        {selectedBrand?.name && <ModelInput brandName={selectedBrand?.name}/>}
        <br />
        <br />
       { carsDetails?.length > 0 && <section>
          {JSON.stringify(carsDetails, null, 2)}
          </section>}
      </section>
    </>
  );
};

export default Home;
