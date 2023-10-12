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
      <form onSubmit={onSumbitHandler}>
      <div className="resistflex">
      <h1>사원 등록</h1>
          <div className="resistdiv">
              <div className="resistflexTwo">
                <div className="resistTotalBack">
                <div className="resisdtDivBack">
                <div className="topmargin"></div>
                      <h3 className="insertweiter">인적사항</h3>
                    <div className="pmdisplay2">
                      <div className="resistflex">
                  <label className="labelMargin">이름</label>
                  <div className="weiterdiv"></div>                  
                  <label className="labelMargin">주민등록번호</label>
                  <div className="weiterdiv"></div>  
                  <label className="labelMargin">전화번호</label>
                  <div className="weiterdiv"></div>  
                  <label className="labelMargin">최종학력</label>
                  <div className="weiterdiv"></div>  
                  <label className="labelMargin">주소</label>
                  <div className="weiterdiv"></div>  
                  <label className="labelMargin">이메일</label>
                      </div>
                      <div className="pminfo">
                      </div>
                      <div className="resistflex">
                  <input type="text" className="newinput" name="empName"></input>
                  <br></br>
                  <input type="text" className="newinput" name="residentNo"></input>
                  <br></br>
                  <input type="text" className="newinput" name="phone"></input>
                  <br></br>
                  <input type="text" className="newinput" name="education"></input>
                  <br></br>
                  <input type="text" className="newinput" name="address"></input>
                  <br></br>
                  <input type="text" className="newinput" name="empEmail"></input>
                      </div>
                    </div>
                    </div>
                    <div className="pmborderline"></div>
                      
              {/* </div>
          </div> */}

          <div className="carrermargin">
    <div className="carrerdivback">  
          <h3>부서정보</h3>
                        <div className="carrerdiv">
                  <label className="carrerLabelMargin">부서</label>
                  <div className="weiterdiv"></div>                  
                  <label className="carrerLabelMargin2">직급</label>
                  <div className="weiterdiv"></div>  
                  <label className="carrerLabelMargin3">부서전화번호</label>
                  <div className="weiterdiv"></div>  
                  <label className="carrerLabelMargin">입사일</label>
                  <div className="weiterdiv"></div>  
                  <label className="carrerLabelMargin">퇴사일</label>
                      </div>
  
        <div className="pmdisplay">
                      <div className="resistflex">
                        <table>
                      <tbody>
                      {[0].map((item) => {
                          return <tr key={item}>
                            <td >
                              {" "}
                              <select name="deptCode" className="carrerInput">
                                <option value="5">기획팀</option>
                                <option value="6">인사총무팀</option>
                                <option value="7">보험 1팀</option>
                                <option value="8">보험 2팀</option>
                                <option value="9">보험 영업팀</option>
                                <option value="10">재무 회계팀</option>
                                <option value="11">시스템 운영팀</option>
                            </select>
                            </td>
                            <td>
                              <select name="jobCode" className="carrerInput">
                                <option value="1">사원</option>
                                <option value="2">대리</option>
                                <option value="3">차장</option>
                                <option value="4">팀장</option>
                                <option value="5">부장</option>
                                <option value="6">사장</option>
                            </select>
                            </td>
                            <td >
                              <select name="telephone" className="carrerInput">
                                <option value="02-8179-5040">기획팀</option>   
                                <option value="02-8179-5041">인사총무팀</option>
                                <option value="02-8179-5042">보험 1팀</option>
                                <option value="02-8179-5043">보험 2팀</option>
                                <option value="02-8179-5044">보험 영업팀</option>
                                <option value="02-8179-5045">재무 회계팀</option>
                                <option value="02-8179-5046">시스템 운영팀</option>
                            </select>
                            </td>
                            <td>
                            <input className="carrerInput" type='date' name='startDate'/>
                            </td>
                            <td>
                            <input className="carrerInput" type='date' name='endDate'/>
                              </td>
                          </tr>;
                        })}
                      </tbody>
                      </table>
                      </div>
                    </div>
                    </div>
                    </div>

                    <div className="pmborderline"></div>
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
                        <table>
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
                              <select name={'military['+item+'].status'} className="carrerInput">
                                <option value="Y">Y</option>   
                                <option value="N">N</option>
                            </select>
                            </td>
                            <td>
                              <select name={'military['+item+'].status'} className="carrerInput">
                                <option value="육군">육군</option>   
                                <option value="해군">해군</option>
                                <option value="공군">공군</option>
                                <option value="공익">공익</option>
                            </select>
                              </td>
                          </tr>;
                        })}
                      </tbody>
                      </table>
                      </div>
                    </div>
                    </div>
                    </div>

  <div className="pmborderline"></div>
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
                        <table>
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
                      </table>
                      </div>
                    </div>
                    </div>
                    </div>
                      <button value="사원 등록 하기" className="insertButton">등록하기</button>
                    
                  </div>
                  </div>

                  </div>
                  </div>
                  </form>
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