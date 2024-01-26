import React, { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { carDetails } from "../../data/carDetailsModel";
import { CarDetailsType, CompanyListType } from "../../@types/global";
import { useDispatch, useSelector } from "react-redux";
import { setCarsDetails } from "../../store/actions/carsDetil";

const ModelInput: React.FC<{ brandName: string, }> = ({ brandName, }) => {

  const { carsDetails } = useSelector((state: any) => {
    return state?.carDetailsReducer;
  });

  const [modelInputs, setModelInputs] = useState<CarDetailsType>({
    ...carDetails
  });
  const inputList = useMemo(() => Object.keys(modelInputs), []);

  const dispatch = useDispatch();

  const clear = () => {
   
    setModelInputs(() => {
      const id = `ids_${carsDetails.length + 1}`;
      return { ...carDetails, brand_name: brandName, id }
    });
  };
  const isValid = () =>
    inputList?.every((item) =>
      modelInputs[item as keyof typeof modelInputs]?.trim()
    );
  const handleCarDetailSubmit = () => {
    if (!isValid()) {
      alert("All fields are mandatory");
      return;
    }
    const id = `ids_${carsDetails.length + 1}`;
    dispatch(setCarsDetails({...modelInputs, id}));
    clear();
  };

  const handleOnchange = (event: any, item: string) => {
    console.log(event);
    setModelInputs({ ...modelInputs, [item]: event.target.value });
  };

  useEffect( () => {
    setModelInputs(() => {
      const id = `ids_${carsDetails.length + 1}`;
      return { ...carDetails, brand_name: brandName, id }
    });
  }, [carsDetails?.length])

  return (
    <>
      <section className="modal_input">
        <section
          className="d-flex-center gap-30 flex-column flex-wrap"
          style={{
            maxHeight: "400px",
            overflow: "auto",
            borderBottom: "3px solid aquamarine",
            paddingBottom: "30px",
          }}
        >
          {inputList?.map((item) => {
            let val = modelInputs[item as keyof typeof modelInputs];
            if (item === "brand_name") {
              val = brandName;
            }
            return (
              <div key={item} className="d-flex justify-space-between gap-10">
                <label>{item.toUpperCase()}: </label>
                {item === "photo" ? (
                  <input
                    accept="image/*"
                    type="file"
                    value={val}
                    onChange={(e) => handleOnchange(e, item)}
                  />
                ) : (
                  <input
                    accept="image/*"
                    type="text"
                    readOnly={item === "brand_name"}
                    value={val}
                    onChange={(e) => handleOnchange(e, item)}
                  />
                )}
              </div>
            );
          })}
        </section>
        <br />
        <div className="d-flex-center">
          <button onClick={() => clear()} className="submit_button">
            Clear
          </button>
          <button
            disabled={!isValid()}
            onClick={() => handleCarDetailSubmit()}
            className="submit_button"
          >
            Submit
          </button>
        </div>
      </section>
    </>
  );
};

export default ModelInput;
