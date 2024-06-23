function checkUserState(navigate) {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

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
    // 240620 연우: 출석 체크 API 아직 미완 -> 추후 수정하기
    // 240622 연우: 출석 체크 API 반영, 아직 테스트 안함. 어드민 페이지에서 세션 생성이 가능해지면 테스트하기
    const response = await client.get("session/isCheckAttend");
    setIsStart(response.isChecked || false);
  } catch (err) {
    console.log(err);
    setIsStart(false);
  }
}

export { checkUserState, checkAttendStart };
