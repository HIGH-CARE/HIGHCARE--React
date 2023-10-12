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
      <div className="apv-navibox">
        <div className="pm-de-top">
          <div className="pm-div-font">사원 등록</div>
        </div>
        <br />
        <form onSubmit={onSumbitHandler}>
          <div className="pm-section2">
            <div className="div4" >
              <div className="div5">
                <div className="pm-photobox"></div>
                <div>
                  <div className="pm-content">
                    <div className="pm-memberinfo-title">이름</div>
                    <input type="text" className="pm-input" name="empName" />
                  </div>
                  <div className="pm-flex">
                    <div className="pm-content">
                      <div className="pm-memberinfo-title">주민등록번호</div>
                      <input className="pm-input" name="residentNo" />
                    </div>
                  </div>
                  <div className="pm-flex">
                    <div className="pm-content">
                      <div className="pm-memberinfo-title">전화번호</div>
                      <input className="pm-input" name="phone" />
                    </div>
                  </div>
                  <div className="pm-flex">
                    <div className="pm-content">
                      <div className="pm-memberinfo-title">최종학력</div>
                      <input className="pm-input" name="education" />
                    </div>
                  </div>
                  <div className="pm-flex">
                    <div className="pm-content">
                      <div className="pm-memberinfo-title">주소</div>
                      <input className="pm-input" name="address" />
                    </div>
                  </div>
                  <div className="pm-flex">
                    <div className="pm-content-last2">
                      <div className="pm-memberinfo-title">이메일</div>
                      <input className="pm-input" name="empEmail" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="pm-contents2">
                    <div className="pm-titleboxs1">입사정보</div>
                    <table className="tables">
                      <thead>
                        <tr>
                          <th className="pm-test22">부서</th>
                          <th className="pm-test22">직급</th>
                          <th className="pm-test22">부서전화번호</th>
                          <th className="pm-test22">입사일</th>
                          <th className="pm-test43">퇴사일</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="pm-test8">     
                            <select name="deptCode" className="pmSelectBox">
                                <option value="5">기획팀</option>
                                <option value="6">인사총무팀</option>
                                <option value="7">보험 1팀</option>
                                <option value="8">보험 2팀</option>
                                <option value="9">보험 영업팀</option>
                                <option value="10">재무 회계팀</option>
                                <option value="11">시스템 운영팀</option>
                            </select>
                          </td>
                          <td className="pm-test8">
                          <select name="jobCode" className="pmSelectBox">
                                <option value="1">사원</option>
                                <option value="2">대리</option>
                                <option value="3">차장</option>
                                <option value="4">팀장</option>
                                <option value="5">부장</option>
                                <option value="6">사장</option>
                            </select>
                          </td>
                          <td className="pm-test8">
                          <select name="telephone" className="pmSelectBox">
                                <option value="02-8179-5040">기획팀</option>   
                                <option value="02-8179-5041">인사총무팀</option>
                                <option value="02-8179-5042">보험 1팀</option>
                                <option value="02-8179-5043">보험 2팀</option>
                                <option value="02-8179-5044">보험 영업팀</option>
                                <option value="02-8179-5045">재무 회계팀</option>
                                <option value="02-8179-5046">시스템 운영팀</option>
                            </select>
                          </td>
                          <td className="pm-test8">
                            <input className="pm-inputs" name="startDate" />
                            <input className="pm-inputs" type='date' name='startDate'/>
                          </td>
                          <td className="pm-test99">
                            <input className="pm-inputs" name="endDate" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="pm-contents">
                    <div className="pm-titleboxsm">병역사항</div>
                    <table className="tables">
                      <thead>
                        <tr>
                          <th className="pm-test2">입대일</th>
                          <th className="pm-test2">전역일</th>
                          <th className="pm-test2">병역상태</th>
                          <th className="pm-test4">공란</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[0, 1, 2].map((item) => {
                          return <tr key={item}>
                            <td className="pm-tests">
                              {" "}
                              <input className="pm-input" name={'military['+item+'].startDate'} />
                            </td>
                            <td className="pm-tests">
                              <input className="pm-input" name={'military['+item+'].endDate'} />
                            </td>
                            <td className="pm-tests">
                              <input className="pm-input" name={'military['+item+'].status'} />
                            </td>
                            <td className="pm-test9"></td>
                          </tr>;
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="pm-contents">
                    <div className="pm-titleboxs2">경력사항</div>
                    <table className="tables">
                      <thead>
                        <tr>
                          <th className="pm-test23">회사명</th>
                          <th className="pm-test23">직위</th>
                          <th className="pm-test23">근속년수</th>
                          <th className="pm-test23">입사일</th>
                          <th className="pm-test43">퇴사일</th>
                        </tr>
                      </thead>
                      <tbody>
                      {[0, 1, 2].map((item) => {
                        return <tr key={item}>
                          <td className="pm-tests">
                            <input className="pm-input" name={'career['+item+'].name'} />
                          </td>
                          <td className="pm-tests">
                            <input className="pm-input" name={'career['+item+'].job'} />
                          </td>
                          <td className="pm-tests">
                            <input className="pm-input" name={'career['+item+'].history'} />
                          </td>
                          <td className="pm-tests">
                            <input className="pm-input" name={'career['+item+'].startDate'} />
                          </td>
                          <td className="pm-test9">
                            <input className="pm-input" name={'career['+item+'].endDate'} />
                          </td>
                        </tr>
                      })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="pm-contents-last">
                    <div className="pm-titleboxs3">자격증</div>
                    <table>
                      <thead>
                        <tr>
                          <th className="pm-test23">자격증이름</th>
                          <th className="pm-test23">발급기관</th>
                          <th className="pm-test23">발급일</th>
                          <th className="pm-test23">만료일</th>
                          <th className="pm-test4">활용수준</th>
                        </tr>
                      </thead>
                      <tbody>
                      {[0, 1, 2].map((item) => {
                        return <tr key={item}>
                          <td className="pm-tests">
                            <input className="pm-input" name={'certification['+item+'].name'} />
                          </td>
                          <td className="pm-tests">
                            <input className="pm-input" name={'certification['+item+'].institution'}  />
                          </td>
                          <td className="pm-tests">
                            <input className="pm-input" name={'certification['+item+'].startDate'}   />
                          </td>
                          <td className="pm-tests">
                            <input className="pm-input" name={'certification['+item+'].endDate'} />
                          </td>
                          <td className="pm-test9">
                            <input className="pm-input" name={'certification['+item+'].status'}  />
                          </td>
                        </tr>
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <h6 className="pm-font">
                {" "}
                상기 내용은 사실과 다름없음을 확인합니다.
              </h6>
              <h6 className="pm-font">년 월 일</h6>
              <h6 className="pm-font2">작성자: (인)</h6>
            </div>
          </div>
          <button
          value="사원 등록 하기"
          className="pm-work-buttonn"
        >사원 등록 하기</button>
        </form>
        {/* <input
          onClick={pmSubmission}
          type="button"
          value="사원 등록 하기"
          className="pm-work-button"
        ></input>
        <input
          onClick={authSubmission}
          type="button"
          value="가입 신청"
          className="pm-work-button"
        ></input> */}
      </div>
      <br></br>
    </section>
    </div>
  );
}

export default PmMemberInsert;
