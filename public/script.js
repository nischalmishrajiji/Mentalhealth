  const ws = new WebSocket('ws://'+window.location.hostname+':3000'); 

  ws.onopen = () => {
    console.log('WebSocket connection established');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'userCount') {
      document.getElementById('userCount').textContent = `User Count for Today: ${data.count}`;
      console.log('WebSocket msg received',data);
    }
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
