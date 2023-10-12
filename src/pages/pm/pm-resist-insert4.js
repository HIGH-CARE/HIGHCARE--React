import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callPmInsertAPI } from "../../apis/PmAPICalls";
import "./pm-member.css";
import PmNav from "./pmNav";

function PmMemberInsert() {
  const authes = useSelector((state) => state.authes);
  const empNo = authes.empNo;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [type, setType] = useState("");

  const [tableData, setTableData] = useState([]);


  const deleteFormData = (formData) => {
    for (let [key, value] of formData) {
      if (!value) {
        formData.delete(key);
        deleteFormData(formData)
      }
    }
  }

  const onSumbitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    deleteFormData(formData)

    for (let [key, value] of formData) {
      console.log(key, value);
    }
    const response = await dispatch(callPmInsertAPI({ formData }));
    if(response.data === '사원 등록 성공'){

      window.alert("사원 등록을 성공하였습니다.");
  
  } else {
      window.alert("다시 시도해 주세요");
      
  }
    console.log(response);
  }
  const authSubmission = async () => {};


  
  return (
    <div className="marginbox">
    <section>
      <PmNav />
      <div className="resistflex">
      <h1>사원 등록</h1>
          <div className="resistdiv">
              <div className="resistflex">
                <div className="topmargin"></div>
                        <h3>병역사항</h3>
                    <div className="pmdisplay">
                    <div className="pmdisplay">
                      <div className="resistflex">
                  <label className="labelMargin">입대일</label>
                  <div className="weiterdiv2"></div>             
                  <label className="labelMargin">전역일</label>
                  <div className="weiterdiv2"></div>  
                  <label className="labelMargin">병역여부</label>
                  <div className="weiterdiv2"></div>  
                  <label className="labelMargin">병역상태</label>
                      </div>
                      <div className="resistflex">
                            <input className="pm-inputs" type='date' name='endDate'/>
                            <div className="weiterdiv3"></div>
                            <input className="pm-inputs" type='date' name='endDate'/>
                            <div className="weiterdiv3"></div>
                  <select name="telephone" className="pmSelectBox2">
                                <option value="Y">Y</option>   
                                <option value="N">N</option>
                            </select>
                            <div className="weiterdiv"></div>
                            <select name="telephone" className="pmSelectBox2">
                                <option value="육군">육군</option>   
                                <option value="해군">해군</option>
                                <option value="공군">공군</option>
                                <option value="공익">공익</option>
                            </select>
                      </div>
                    </div>
                    
                      
              </div>
          </div>
          <div className="carrermargin">
    <div className="carrerdivback">  
          <h3>병역사항</h3>
                        <div className="carrerdiv">
                  <label className="carrerLabelMargin">입대일</label>
                  <div className="weiterdiv"></div>                  
                  <label className="carrerLabelMargin2">전역일</label>
                  <div className="weiterdiv"></div>  
                  <label className="carrerLabelMargin3">병역여부</label>
                  <div className="weiterdiv"></div>  
                  <label className="carrerLabelMargin">병역상태</label>
                      </div>
  
        <div className="pmdisplay">
                      <div className="resistflex">
                      <tbody>
                      {[0].map((item) => {
                          return <tr key={item}>
                            <td >
                              {" "}
                              <input type="date" className="carrerInput" name={'military['+item+'].startDate'} />
                            </td>
                            <td>
                              <input type="date" className="carrerInput" name={'military['+item+'].endDate'} />
                            </td>
                            <td >
                              <input className="carrerInput" name={'military['+item+'].status'} />
                            </td>
                            <td>
                              <input className="carrerInput" name={'military['+item+'].status'} />
                              </td>
                          </tr>;
                        })}
                      </tbody>
                      </div>
                    </div>
                    </div>
                    </div>
    <div className="carrermargin">
    <div className="carrerdivback">  
          <h3>경력사항</h3>
                        <div className="carrerdiv">
                  <label className="carrerLabelMargin">회사명</label>
                  <div className="weiterdiv"></div>                  
                  <label className="carrerLabelMargin2">직위</label>
                  <div className="weiterdiv"></div>  
                  <label className="carrerLabelMargin3">근속년수</label>
                  <div className="weiterdiv"></div>  
                  <label className="carrerLabelMargin">입사일</label>
                  <div className="weiterdiv"></div>  
                  <label className="carrerLabelMargin2">퇴사일</label>
                      </div>
  
        <div className="pmdisplay">
                      <div className="resistflex">
                      <tbody>
                      {[0, 1, 2].map((item) => {
                        return <tr key={item}>
                          <td >
                            <input className="carrerInput" name={'career['+item+'].name'} />
                          </td>
                          <td >
                            <input className="carrerInput" name={'career['+item+'].job'} />
                          </td>
                          <td>
                            <input className="carrerInput" name={'career['+item+'].history'} />
                          </td>
                          <td >
                            <input type="date" className="carrerInput" name={'career['+item+'].startDate'} />
                          </td>
                          <td >
                            <input type="date" className="carrerInput" name={'career['+item+'].endDate'} />
                          </td>
                        </tr>
                      })}
                      </tbody>
                      </div>
                    </div>
                    </div>
                    </div>
                    
                  </div>
                </div>

      
    </section>
    </div>
  );
}

export default PmMemberInsert;
{/* <section>
<PmNav />
<div className="resistflex">
<h1>사원 등록</h1>
    <div className="resistdiv">
        <div className="resistflex">
          <div className="topmargin"></div>
              <div className="pmdisplay">
            <label className="labelMargin">이름</label>
            <input type="text" className="newinput"></input>
              </div>
              <br></br>
              <div className="pmdisplay">
            <label className="labelMargin">주민등록번호</label>
            <input type="text" className="newinput"></input>
              </div>
              <br></br>
              <div className="pmdisplay">
            <label className="labelMargin">전화번호</label>
            <input type="text" className="newinput"></input>
              </div>
              <br></br>
              <div className="pmdisplay">
            <label className="labelMargin">최종학력</label>
            <input type="text" className="newinput"></input>
              </div>
              <br></br>
              <div className="pmdisplay">
            <label className="labelMargin">주소</label>
            <input type="text" className="newinput"></input>
              </div>
               <br></br>
              <div className="pmdisplay">
            <label className="labelMargin">이메일</label>
            <input type="text" className="newinput"></input>
              </div>
              
        </div>
    </div>
  </div>
</section> */}