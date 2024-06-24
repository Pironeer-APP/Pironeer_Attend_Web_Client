import { client } from "./client";
function checkUserState(navigate) {
  const token = sessionStorage.getItem("token");
  const isAdmin = sessionStorage.getItem("isAdmin");

  // 인증 정보가 없을 경우 로그인 페이지로 이동
  if (!token || !isAdmin) {
    navigate("/login");
  }

  // 운영진이라면 어드민 페이지로 이동
  if (isAdmin == "true") {
    navigate("/admin");
  }
}

async function checkAttendStart(setIsStart) {
  try {
    const response = await client.get("/session/isCheckAttend");
    console.log("Response object: ", response);
    if (response.status === 200) {
      setIsStart(true);
      console.log("출석 시작");
    }
  } catch (err) {
    if (err.includes('Error 404')) {
      setIsStart(false);
    } else {
      console.error("출석 확인 중 오류가 발생했습니다", err);
      setIsStart(false);
    }
  }
}

export { checkUserState, checkAttendStart };
