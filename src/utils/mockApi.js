// src/services/mockApi.js
export const checkAttendance = async (userid) => {
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Mock session data
    const sessions = [
      {
        "_id": "6677729d698e6fa31e070d81",
        "name": "session2",
        "date": "2024-06-23T00:32:20.220Z",
        "checksNum": 3,
        "__v": 0
      },
      {
        "_id": "66777440698e6fa31e070e69",
        "name": "session3",
        "date": "2024-06-24T00:32:20.220Z",
        "checksNum": 3,
        "__v": 0
      },
      {
        "_id": "667774ae698e6fa31e070f97",
        "name": "session4",
        "date": "2024-06-25T00:32:20.220Z",
        "checksNum": 3,
        "__v": 0
      },
      {
        "_id": "667774fb698e6fa31e071057",
        "name": "session5",
        "date": "2024-06-26T00:32:20.220Z",
        "checksNum": 3,
        "__v": 0
      },
        {
            "_id": "6677729d698e6fa31e070d94",
            "name": "session6",
            "date": "2024-06-27T00:32:20.220Z",
            "checksNum": 0,
            "__v": 0
        }
    ];
  
    // Mock attendance data
    const mockResponse = {
      data: {
        message: "출석 정보가 확인되었습니다.",
        attend: [
          {
            _id: "6677729d698e6fa31e070d94",
            user: "66776e6e698e6fa31e070d17",
            session: sessions[0],
            attendList: [
              { attendIdx: 0, status: true, _id: "66777364698e6fa31e070dce" },
              { attendIdx: 1, status: true, _id: "667773cf698e6fa31e070e08" },
              { attendIdx: 2, status: true, _id: "667773ec698e6fa31e070e64" }
            ],
            __v: 0
          },
          {
            _id: "66777440698e6fa31e070e7c",
            user: "66776e6e698e6fa31e070d17",
            session: sessions[1],
            attendList: [
              { attendIdx: 0, status: true, _id: "66777458698e6fa31e070ec7" },
              { attendIdx: 1, status: false, _id: "6677746f698e6fa31e070f01" },
              { attendIdx: 2, status: true, _id: "66777479698e6fa31e070f5c" }
            ],
            __v: 0
          },
          {
            _id: "667774ae698e6fa31e070faa",
            user: "66776e6e698e6fa31e070d17",
            session: sessions[2],
            attendList: [
              { attendIdx: 0, status: false, _id: "667774b7698e6fa31e070fbf" },
              { attendIdx: 1, status: false, _id: "667774c1698e6fa31e070ff8" },
              { attendIdx: 2, status: true, _id: "667774da698e6fa31e071053" }
            ],
            __v: 0
          },
          {
            _id: "667774fb698e6fa31e07106a",
            user: "66776e6e698e6fa31e070d17",
            session: sessions[3],
            attendList: [
              { attendIdx: 0, status: false, _id: "6677750a698e6fa31e0710b5" },
              { attendIdx: 1, status: false, _id: "66777517698e6fa31e0710ee" },
              { attendIdx: 2, status: false, _id: "66777520698e6fa31e071149" }
            ],
            __v: 0
          },
          {
            _id: "6677729d698e6fa31e070d94",
            user: "66776e6e698e6fa31e070d17",
            session: sessions[4],
            attendList: [
            ],
            __v: 0
          },
        ],
        absent: 0
      }
    };
  
    return mockResponse;
  };
  