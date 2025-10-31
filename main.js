async function loadTimelineData() {
  const response = await fetch("./data/data.json");
  const rawData = await response.json();

  // Convert data into usable structure
  const years = [];
  const options = [];

  rawData.forEach(item => {
    const year = Object.keys(item)[0];
    const phrases = item[year][0];
    const word = Object.keys(phrases)[0];
    const messages = phrases[word];

    years.push(year);

    // Create a tree-like structure for this year
    const data = {
      name: year,
      children: [
        {
          name: word,
          children: messages.map(m => ({ name: m }))
        }
      ]
    };

    options.push({
      title: {
        text: `Events in ${year}`,
        left: 'center'
      },
      series: [
        {
          type: 'tree',
          data: [data],
          top: '5%',
          left: '15%',
          bottom: '5%',
          right: '15%',
          symbolSize: 12,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 14
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          expandAndCollapse: true,
          animationDuration: 750
        }
      ]
    });
  });

  const chart = echarts.init(document.getElementById('main'));

  const option = {
    baseOption: {
      timeline: {
        axisType: 'category',
        data: years,
        label: {
          color: '#333'
        }
      },
      tooltip: {},
      series: []
    },
    options: options
  };

  chart.setOption(option);
}

loadTimelineData();
