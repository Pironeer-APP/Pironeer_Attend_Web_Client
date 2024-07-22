import { client } from "./client";
import useUserStore from '../store/userStore';

function checkUserState(navigate) {
  const token = sessionStorage.getItem("token");
  const isAdmin = sessionStorage.getItem("isAdmin");
  const { user } = useUserStore();

  // 인증 정보가 없을 경우 로그인 페이지로 이동
  if (!token || !isAdmin) {
    navigate("/login");
  }

  // 운영진이라면 어드민 페이지로 이동
  if (isAdmin == "true") {
    navigate("/admin");
  }
}

function checkAdminState(navigate) {
  const token = sessionStorage.getItem("token");
  const isAdmin = sessionStorage.getItem("isAdmin");

  // 인증 정보가 없을 경우 로그인 페이지로 이동
  if (!token || !isAdmin) {
    navigate("/login");
  }

  // 일반 유저라면 메인 페이지로 이동
  if (isAdmin == "false") {
    navigate("/");
  }
}

// async function checkAttendStart(setIsStart) {
//   try {
//     const response = await client.get("/session/isCheckAttend");
//     console.log("Response object: ", response);
//     if (response.status === 200) {
//       setIsStart(true);
//       console.log("출석 시작");
//     }
//   } catch (err) {
//     if (err.includes("Error 404")) {
//       setIsStart(false);
//     } else {
//       setIsStart(false);
//     }
//   }
// }
async function checkAttendStart(setIsStart) {
  const eventSource = client.sse("/session/isCheckAttend", user.token);

  eventSource.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log("SSE data received:", data);
    if (data.message === "출석체크 진행중") {
      setIsStart(true);
    } else {
      setIsStart(false);
    }
  };

  eventSource.onerror = function(err) {
    console.error("EventSource failed:", err);
    eventSource.close();
  };

  return () => {
    eventSource.close();
  };
}

export { checkUserState, checkAttendStart, checkAdminState };
