async function loadTimelineData() {
  const response = await fetch("./data/data.json");
  const rawData = await response.json();

  const years = [];

  rawData.forEach(item => {
    const year = Object.keys(item)[0];

    years.push(year);
  });

  const chart = echarts.init(document.getElementById('main'));

  const option = {
    baseOption: {
      timeline: {
        axisType: 'category',
        data: years,
        bottom: '0%',
        label: {
          color: '#333',
          formatter: '{value}'
        }
      },
      tooltip: {},
      series: []
    }
  };

  chart.setOption(option);

  chart.on('timelinechanged', function (params){
    const selectedYear = years[params.currentIndex];
    window.location.href = `year.html?year=${selectedYear}`;
  });
}

loadTimelineData();
