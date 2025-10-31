async function loadYearTree() {
    const urlParams = new URLSearchParams(window.location.search);
    const targetYear = urlParams.get('year');
    const response = await fetch("./data/data.json");
    const rawData = await response.json();

    let treeData = null;

    rawData.forEach(item => {
        const year = Object.keys(item)[0];
        if (year === targetYear) {
            const lang = item[year];
            const langNotes = lang.map(langObj => {
                const language = Object.keys(langObj)[0];
                const words = langObj[language];

                const wordNodes = words.map(wordObj => {
                    const word = Object.keys(wordObj)[0];
                    const phrases = wordObj[word];

                    return {
                        name: word,
                        children: phrases.map(phrase => ({ name: phrase}))
                    };
                });

                return {
                    name: language,
                    children: wordNodes
                };
            });

            treeData = {
                name: year,
                children: langNotes
            };
        }
    });

    if (!treeData) {
        console.error(`Год ${targetYear} не найден`);
        return;
    }

    const chart = echarts.init(document.getElementById('main'));

    const option = {
        title: {
            text: `Устойчивые фразы ${targetYear} года`,
            left: 'center'
        },
        series: [
            {
                type: 'tree',
                data: [treeData],
                top: '10%',
                left: '15%',
                bottom: '10%',
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
    };

    chart.setOption(option);

    chart.on('click', function (params){
        if (params.data.name == targetYear){
            window.location.href = 'visualisation.html';
        }
    });
}

// Вызов для конкретного года
loadYearTree();
