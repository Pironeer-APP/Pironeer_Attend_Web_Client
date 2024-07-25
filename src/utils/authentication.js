import { api } from "./api";
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


async function checkAttendStart(setIsStart) {
  const eventSource = api.sse("/session/isCheckAttend");

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
async function handleSessionExpired(response) {
  if (response.status === 403) {
    // JWT 만료시 세션 정보 삭제 후 로그인 페이지로 이동
    sessionStorage.clear();
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    window.location.href = '/login';
    return;
  }
}


export { checkUserState, checkAttendStart, checkAdminState, handleSessionExpired };
