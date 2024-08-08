// mockApi.js
export const fetchUserDeposits = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            _id: '1',
            name: '김연우',
            deposit: 30000,
            shieldCount: 2,
          },
          {
            _id: '2',
            name: '웨이',
            deposit: 25000,
            shieldCount: 1,
          },
          {
            _id: '3',
            name: '오기택',
            deposit: 50000,
            shieldCount: 3,
          },
        ]);
      }, 100); 
    });
  };
  
export const fetchUserDepositDetails = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: '김연우',
        balance: 80000,
        shieldCount: 2,
        transactions: [
          { date: '9.30', description: '보증금 납입', amount: 80000 },
          { date: '9.30', description: '결석', amount: -20000 },
          { date: '9.30', description: '보증금 납입', amount: 80000 },
          { date: '9.30', description: '보증금 납입', amount: 80000 },
          { date: '9.30', description: '보증금 납입', amount: 80000 },
          { date: '9.30', description: '보증금 납입', amount: 80000 },
          { date: '9.30', description: '보증금 납입', amount: 80000 },
          { date: '9.30', description: '보증금 납입', amount: 80000 },
        ],
      });
    }, 100); 
  });
};
