import React from "react";

const Filter: React.FC<any> = ({handleInputChange, carsFilterList}) => {
    
    return (
<>
<h3>Filter By Inputs</h3>
          <section>
            {carsFilterList?.map((item: any) => {
              return (
                <div key={item.id}>
                  <div>{item?.label}</div>
                  <div style={{ margin: "20px" }}>
                    {(item.type === "radio") && (
                      <>
                       
                        {item?.value.map((val: string) => (
                          <div style={{margin: "2px"}}>
                          
                            {item.type === "radio" && <input
                             id={val}
                              type={item.type}
                              name={item.filtername}
                              value={val}
                              onChange={() =>
                                handleInputChange(val, item.filtername)
                             
                              }
                            />}
                            <label style={{ cursor: "pointer"}} htmlFor={val}>{val}</label>
                          </div>
                        ))}
                      </>
                    )}
                    {item.type === "dropDown" && (
                      <select  onChange={(e) =>
                        handleInputChange(e.target.value, item.filtername)
                      }style={{padding: "10px",
                        width: "200px"}}>
                        <option value="">Select {item.label}</option>
                        {item?.value.map((val: string) => (
                          <option
                            value={val}
                          >
                            {val}
                          </option>
                        ))}
                      </select>
                    )}
                    {item.type === "button" && (
                      <>
                        {item?.value.map((val: any) => (
                          <div
                            style={{
                              minWidth: "100px",
                              display: "inline-block",
                              border: "1px solid #ccc",
                              borderRadius: "10px",
                              margin: "10px",
                              padding: "5px",
                            }}
                            onClick={() =>
                              handleInputChange(val.value, item.filtername)
                            }
                          >
                            {val.label}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </section>
</>
    )
};


export default Filter;